import React, { Component } from "react";
import dateForDay from '../../data/date N周留存';
import dateForWeek from '../../data/data 留存';
import Table from '../projectComponents/Table'

export default class HotMap extends Component {

  constructor (prop) {
    super(prop);
    this.state = {}
  }

  colorForNumber (num) {
    if (!isNaN(num)) {
      if (num <= 25) return 'rgba(111,221,223,0.13)';
      if (50 > num && num > 25) return 'rgba(111,221,223,0.4)';
      if (75 > num && num >= 50) return 'rgba(111,221,223,0.64)';
      if (num >= 75) return 'rgba(111,221,223,1)';
    } else {
      return '#fff'
    }
  }

  render () {
    let columns1 = [
      {
        name: '时间',
        render: (row) => {
          const dateAfter7 = new Date(row.date).getTime()+3600*24*7*1000;
          //第二种：          console.log('7 days'.after(new Date(row.date)));
          return new Date(row.date).format("MM/dd") + "——" + new Date(dateAfter7).format("MM/dd")
        }
      },
      {
        name: '当周押金支付数',
        render: (row) => row.depositCount
      }
    ];

    let columns3 = [
      {
        name: '时间',
        render: (row) => new Date(row.date).format("MM-dd")
      },
      {
        name: '当日订单数',
        render: (row) => row.totalCount
      }
    ];

    const days = [1, 2, 3, 4, 5, 6, 7, 8];

    days.forEach((item) => {
      columns1.push({
        name: `${item}周后留存`,
        render: (row) => {
          const num = (row.depositRetentionInterval[Number(item)] * 100 / row.depositCount).toFixed(2);
          const percent = (row.depositRetentionInterval[Number(item)]) ? num + "%" : null;
          return <div style={{
            backgroundColor: this.colorForNumber(num),
            width: "100%",
            height: '30px'
          }}>{row.depositRetentionInterval[Number(item)]}/{percent}</div>
        }
      })
    });

    const days2 = [1, 2, 3, 4, 5, 6, 7];
    days2.forEach((item) => {
      columns3.push({
        name: `${item}天后留存`,
        render: (row) => {
          const num = (row.loginRetentionInterval[Number(item)] * 100 / row.totalCount).toFixed(2);
          const percent = (row.loginRetentionInterval[Number(item)]) ? num + "%" : null;
          console.log(!isNaN(num), (!isNaN(num)) ? 'blue' : 'green');
          return <div style={{
            backgroundColor: this.colorForNumber(num),
            width: "100%",
            height: '30px'
          }}>{row.loginRetentionInterval[Number(item)]}/{percent}</div>
        }
      });

    });

    return <div>
      <Table
        title="活跃账户日留存"
        columns={columns3}
        dataSource={dateForWeek}
      />
      <Table
        title="押金账户周留存"
        columns={columns1}
        dataSource={dateForDay}
      />
    </div>
  }


}