import React, { Component } from "react";
import createG2 from 'g2-react';
import { Frame , Stat} from 'g2';

export default class AntvG2 extends Component {

  constructor (props) {
    super(props);
    this.state = {
  };
  }

  componentWillMount () {
    this.fetchData();
    console.log(Stat)
  }

  fetchData () {
    (async _ => {
      // const result = await fetchLoginLiveness({query});
      const result = [
        {
          "date": '2018-01-23T16:00:00.000',
          "_id": 1212121212,
          "orderNum": 3333,
          "depositNum": 212,
          "reservationNum": 190,
          "orderPercent": 0.3,
          "depositPercent": 0.04,
          "reservationPercent": 0.5,
          "totalCount": 435,
          freshInterval: {
            1:0.1,
            2:0.09,
          },
        }, {
          "date": '2018-01-23T16:00:00.000',
          "_id": 3232434535,
          "orderNum": 3434,
          "depositNum": 192,
          "reservationNum": 130,
          "orderPercent": 0.73,
          "depositPercent": 0.14,
          "reservationPercent": 0.85,
          "totalCount": 524,
        }, {
          "date": '2018-01-24T16:00:00.000',
          "_id": 1212121212,
          "orderNum": 2456,
          "depositNum": 212,
          "reservationNum": 190,
          "orderPercent": 0.3,
          "depositPercent": 0.04,
          "reservationPercent": 0.9,
          "totalCount": 235,
        }, {
          "date": '2018-01-25T16:00:00.000',
          "_id": 1212121212,
          "orderNum": 2456,
          "depositNum": 212,
          "reservationNum": 190,
          "orderPercent": 0.33,
          "depositPercent": 0.04,
          "reservationPercent": 0.5,
          "totalCount": 856,
        }, {
          "date": '2018-01-26T16:00:00.000',
          "_id": 3232434535,
          "orderNum": 2222,
          "depositNum": 192,
          "reservationNum": 388,
          "orderPercent": 0.27,
          "depositPercent": 0.56,
          "reservationPercent": 0.42,
          "totalCount": 357,
        },{
          "date": '2018-01-27T16:00:00.000',
          "_id": 1212121212,
          "orderNum": 3333,
          "depositNum": 212,
          "reservationNum": 190,
          "orderPercent": 0.3,
          "depositPercent": 0.04,
          "reservationPercent": 0.5,
          "totalCount": 903,
          freshInterval: {
            1:0.1,
            2:0.09,
          },
        }, {
          "date": '2018-01-28T16:00:00.000',
          "_id": 3232434535,
          "orderNum": 3434,
          "depositNum": 192,
          "reservationNum": 130,
          "orderPercent": 0.73,
          "depositPercent": 0.14,
          "reservationPercent": 0.85,
          "totalCount": 555,
        }, {
          "date": '2018-01-29T16:00:00.000',
          "_id": 1212121212,
          "orderNum": 2456,
          "depositNum": 212,
          "reservationNum": 190,
          "orderPercent": 0.3,
          "depositPercent": 0.04,
          "reservationPercent": 0.9,
          "totalCount": 787,
        }, {
          "date": '2018-01-30T16:00:00.000',
          "_id": 1212121212,
          "orderNum": 2456,
          "depositNum": 212,
          "reservationNum": 190,
          "orderPercent": 0.33,
          "depositPercent": 0.04,
          "reservationPercent": 0.5,
          "totalCount": 122,
        }, {
          "date": '2018-01-31T16:00:00.000',
          "_id": 3232434535,
          "orderNum": 2222,
          "depositNum": 192,
          "reservationNum": 388,
          "orderPercent": 0.27,
          "depositPercent": 0.56,
          "reservationPercent": 0.42,
          "totalCount": 300,
        },];
      this.renderChart(result);
    })()
  }


  renderChart (result) {
//当日活跃总人数
    const dataArr1 = [];

    result.forEach((item) => {
      dataArr1.push({
        date: new Date(item.date).format('MM/dd'),
        count: item.totalCount,
      });

    });
    const Chart1 = createG2(chart => {
      chart.col('date', {
        tickInterval: 1 * 24 * 60 * 60 * 1000,
        alias: '时间'
      });
      chart.axis('date', {
        title: null,
      });
      // chart.axis('count', {
      //   position:'right'
      // });
      chart.col('count', {
        alias: '当日活跃账户数',
      });
      chart.intervalDodge().position('date*count').color('count','lightness');
      chart.render();
    });

    const charts = [
      {
        chart: <Chart1
          data={dataArr1}
          forceFit
          plotCfg={{
            margin: [20, 100, 60, 90],
            // border:{
            //   fill:'#999',
            //   radius:20,
            // }//整个画布的背景
          }}
          width={800}
          height={400}
        />,
        title: '活跃账户数'
      }];
    this.setState({
      charts,
    })
  }

  render () {
    const { charts=[], table } = this.state;
    return <div>
      <br/>
      {
        charts.length > 0 ?
          <div >
            {charts.map((item, index) => {
              return <div key={index}>
                <h5>{item.title}</h5>
                {item.chart}
              </div>
            })}
          </div> : null
      }
      {table}
    </div>
  }
}
