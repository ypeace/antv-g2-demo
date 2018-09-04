import React, { Component } from "react";
import createG2 from "g2-react";
import G2, { Stat } from "g2";

export default class HotMap extends Component {

  componentWillMount () {
    const data = {
      lowPower: {
        // 4点前产生的归属于无法租赁组(7)的低电任务车辆数
        amount: 88,
        // 低电任务总数(702)
        total: 100
      },
      lowVoltage: {
        // 4点前产生的归属于低压换电组(13)的低压预警(1301)任务车辆数
        amount: 34,
        // 低压换电任务总数
        total: 131
      },
      pullBack: {
        // 未完成待拖回车辆在前一天18点到当天6点未寻找过的数量
        amount: 65,
        // 总未完成待拖回车辆比例
        total: 144
      },
      powerUnlink: {
        // 断电任务车辆中在前一天18点到当天6点间未寻找的车辆数
        amount: 34,
        // 总断电任务车辆 
        total: 214
      },
    };
    this.setState({
      data
    })
  }

  renderChart1 () {
    const lowPower = {
      // 4点前产生的归属于无法租赁组(7)的低电任务车辆数
      amount: 88,
      // 低电任务总数(702)
      total: 100
    };
    let obj = {
      低电任务车辆数: 88,
      未完成的低电任务总数: (100 - 88),

    };
    let data = [];
    for (let key in obj) {
      data.push({ name: key, value: obj[key] })
    }
    console.log(data)
    let Chart = createG2(chart => {
      let Stat = G2.Stat;
      // 重要：绘制饼图时，必须声明 theta 坐标系
      chart.coord('theta', {
        radius: 0.5 // 设置饼图的大小
      });

      //图例说明
      chart.legend("name", {
        position: "bottom",
        itemWrap: true,
        formatter: (val) => {
          let string = "";
          for (let i = 0, len = data.length; i < len; i++) {
            let obj = data[i];
            if (obj.name === val) {
              string = val + ': ' + obj.value + '%' + '';
            }
          }
          return `${string}`
        }
      });
//
      chart.tooltip({
        title: null,
        map: {
          value: 'value'
        }
      });

      chart.coord("theta", {
        title: null
      });
      chart.intervalStack()
        .position(Stat.summary.percent('value'))
        .color('name')
        .label('name*..percent', function (name, percent) {
          percent = (percent * 100).toFixed(2) + '%';
          return name + ' ' + percent;

        });
      chart.render();
      // 设置默认选中
      let geom = chart.getGeoms()[0]; // 获取所有的图形
      let items = geom.getData(); // 获取图形对应的数据
      // geom.setSelected(items[1]); // 设置选中
    });
    return <Chart
      data={data}
      forceFit
      height={400}
      width={500}/>
  }


  renderChart2 () {

  }

  render () {

    return <div>{this.renderChart1()}</div>
  }
}