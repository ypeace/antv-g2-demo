import React, {Component} from 'react';
import createG2 from 'g2-react';
import {Frame} from 'g2';

import {
  SelectField,
  MenuItem,
  DatePicker
} from 'material-ui';

import {fetchRegions} from '../../../services/operation/region';
import {fetchRefundAbout} from '../../../services/finance/returnDeposit'

export default class RefundAboutChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chart: null,
      regions: [],
      query: {
        date: {
          $gte: '7 days'.before('today'.beginning),
          $lte: '0 day'.before('today'.beginning)
        },
        region: undefined
      }
    };
  }

  componentWillMount() {
    (async _ => {
      const regions = await fetchRegions();
      regions.push({
        _id: '',
        name: '未知大区',
      });

      this.setState({regions});
      setTimeout((regions) => {
        this.fetchData()
      })
    })();
  }

  fetchData() {
    const {query} = this.state;
    (async _ => {
      const data = await fetchRefundAbout({query}).catch(err => {
        window.iziToast.error({
          title: err
        });
        return false
      });
      const regionInDate = {};
      const regions = [];
      data.items.forEach(item => {
        regionInDate[item.date] = regionInDate[item.date] || {
          date: new Date(item.date).format('yyyy/MM/dd')
        };
        if (!item.region) item.region = {name: '未知大区'};

        if (!regions.includes(item.region.name)) regions.push(item.region.name);
        regionInDate[item.date][item.region.name] = item.totalCount;
      });

      const result = Object.keys(regionInDate).map(date => regionInDate[date]);
      let frame = new Frame(result);
      frame = Frame.combinColumns(frame, regions, '退押金用户数', '城市', 'date');
      this.renderChart(frame);
    })()
  }

  renderChart(frame) {
    const Chart = createG2(chart => {
      chart.col('date', {
        type: 'timeCat',
        nice: false,
        mask: 'mm/dd',
        tickCount: 10,
        alias: '时间'
      });//横轴
      chart.axis('date', {//Y轴
        labels: {
          autoRotate: false
        }
      });
      chart.on('tooltipchange', function (ev) {
        const items = ev.items;
        let totalNumber = 0;
        items.forEach(item => {
          totalNumber += Number(item.value)
        });
        items.forEach(item => {
          item.value = item.value + ' /  ' + ((parseInt(item.value) ) / totalNumber * 100).toFixed(1) + '%';
        })
      });
      chart.line().position('date * 退押金用户数').color('城市').size(1);
      chart.render();
      chart.changeData(frame);
    });
    this.setState({
      chart: <Chart
        data={[]}
        forceFit
        height={400}
        width={1000}
      />
    });
  }

  changeStartTime(e, dateTime) {
    this.setState({
      query: {
        ...this.state.query,
        date: {
          ...this.state.query.date,
          $gte: dateTime
        }
      }
    }, _ => {
      this.fetchData()
    })
  }

  changeEndTime(e, dateTime) {
    this.setState({
      query: {
        ...this.state.query,
        date: {
          ...this.state.query.date,
          $lte: dateTime
        }
      }
    }, _ => {
      this.fetchData()
    })

  }

  renderFilterStartTime(date) {
    return (
      <div className="search-row">
        <span className="search-row-label">开始时间</span>
        <DatePicker
          hintText="请选择日期"
          value={date && date.$gte && new Date(date.$gte)}
          onChange={this.changeStartTime.bind(this)}
        />
      </div>
    );
  }

  renderFilterEndTime(date) {
    return (
      <div className="search-row">
        <span className="search-row-label">截止时间</span>
        <DatePicker
          hintText="请选择日期"
          value={date && date.$lte && new Date(date.$lte)}
          onChange={this.changeEndTime.bind(this)}
        />
      </div>
    );
  }

  renderFilterRegion(query) {
    const {regions} = this.state;
    const onQueryRegion = values => {
      this.setState({
        query: {
          ...this.state.query,
          region: values.length > 0 ? {$in: values} : undefined
        }
      }, _ => {
        this.fetchData()
      });
    };
    return (
      <div className="search-row">
        <span className="search-row-label">大区：</span>
        <SelectField
          multiple
          value={query.region && query.region.$in}
          hintText="所有"
          onChange={(e, index, values) => onQueryRegion(values)}
        >
          <MenuItem value={null} primaryText="未分配"/>
          {
            regions ? regions.map((region, index) => (
              <MenuItem
                key={index}
                value={region._id}
                primaryText={region && region.name}
              />
            )) : null
          }
        </SelectField>
      </div>
    );
  }

  render() {
    const {chart, query} = this.state;
    return (
      <div>
        <h2>退押金用户城市分布</h2>
        <div>
          <div>
            <div className="search-row-group">
              {this.renderFilterRegion(query)}
            </div>
            <div className="search-row-group">
              {this.renderFilterStartTime(query.date)}
              {this.renderFilterEndTime(query.date)}
            </div>
          </div>
          <div style={{zoom: '133.3%'}}>{chart}</div>
        </div>
      </div>
    )
  }
}