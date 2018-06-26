import React, { Component } from "react";
import { BrowserRoute as Router, Route, Link } from "react-router-dom";
import createG2 from "g2-react";
import { Stat } from "g2";

export default class AntvG2 extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillMount () {
    this.fetchData();
    console.log(Stat)
  }

  fetchData () {
    (async _ => {
      const result = [
        {
          "date": '2018-01-23T16:00:00.000',
          "_id": 1212121212,
          "orderNum": 1111,
          "depositNum": 212,
          "reservationNum": 190,
          "orderPercent": 0.3,
          "depositPercent": 0.04,
          "reservationPercent": 0.5,
          "totalCount": 434,
          freshInterval: {
            1: 0.1,
            2: 0.09,
          },
        }, {
          "date": '2018-01-22T16:00:00.000',
          "_id": 3232434535,
          "orderNum": 3434,
          "depositNum": 192,
          "reservationNum": 130,
          "orderPercent": 0.38,
          "depositPercent": 0.14,
          "reservationPercent": 0.85,
          "totalCount": 532,
        }, {
          "date": '2018-01-24T16:00:00.000',
          "_id": 1212121212,
          "orderNum": 2456,
          "depositNum": 212,
          "reservationNum": 190,
          "orderPercent": 0.33,
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
        }, {
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
            1: 0.1,
            2: 0.09,
          },
        }, {
          "date": '2018-01-28T16:00:00.000',
          "_id": 3232434535,
          "orderNum": 3434,
          "depositNum": 192,
          "reservationNum": 130,
          "orderPercent": 0.23,
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
          "orderPercent": 0.53,
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

    const dataArr4 = [];

    result.forEach((item) => {
      dataArr4.push({
        date: new Date(item.date).format('MM/dd'),
        count: item.orderNum,
        percent: item.orderPercent,
      });
    });


    //当日下达订单数量
    const Chart4 = createG2(chart => {
      chart.col('date', {
        tickInterval: 1 * 24 * 60 * 60 * 1000,
        alias: '时间'
      });
      chart.axis('date', {
        title: null,
      });
      //第一个轴
      chart.col('count', {
        alias: '当日下单账户数'
      });
      chart.axis('count', {
        title: {
          fill: '#5795B2',
          fontSize: 16
        },
        line: null,//轴本身的线
        tickLine: null,
        labels: {
          label: {
            fill: '#5795B2'
          }
        },
      });
      //第二个轴
      chart.col('percent', {
        alias: '活跃账户下单率',
      });
      chart.axis('percent', {
        title: {
          fill: '#CD6E55',
          fontSize: 16
        },
        line: null,
        tickLine: null,
        labels: {
          label: {
            fill: '#CD6E55'
          }
        }
      });
      chart.legend({
        position: "bottom",
      });
      chart.intervalDodge().position('date*count').color('#5795B2');
      chart.line().position('date*percent').size(4).color('#CD6E55');
      chart.point().position('date*percent').size(4).color('#CD6E55').shape('circle', 'borderRadius');
      chart.render();
    });

    const charts = [
      {
        chart: <Chart4
          data={dataArr4}
          forceFit
          plotCfg={{
            margin: [20, 100, 60, 90]
          }}
          width={800}
          height={400}
        />,
        title: '下单账户数、活跃账户下单率'
      }];
    this.setState({
      charts,
    })
  }

  render () {
    const { charts = [], table } = this.state;
    return <div>
      <br/>
      {
        charts.length > 0 ?
          <div>
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
