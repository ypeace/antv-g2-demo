import React, { Component } from "react";
import data from '../../data/data 留存';
import createG2 from 'g2-react';
import { Frame } from 'g2';

export default class HotMap extends Component {

  constructor (prop) {
    super(prop);
    this.state = {}
  }

  componentWillMount () {
    this.renderChart(data);
  }

  renderChart (result) {
    let days = Object.keys(result[0].freshInterval);
    days.push('moreThan30');
    const freshIntervals = [];
    result.forEach((item) => {
      const numArr = Object.values(item.freshInterval);
      const totalNum = numArr.reduce((sum, value) => {
        return sum + Number(value)
      }, 0);
      const date = new Date(item.date).format('MM/dd');
      const moreThan30 = Math.abs(item.totalCount - totalNum);
      freshIntervals.push({ ...item.freshInterval, date, moreThan30 })
    });
    console.log(freshIntervals);
    let frame = new Frame(freshIntervals);
    frame = Frame.combinColumns(frame, days, '人数', '天数', 'date');
    console.log(frame);

    const Chart = createG2(chart => {
      chart.col('date', {
        type: 'time',
        mask: 'mm/dd',
        nice: false,
      });

      chart.axis('date',{
        title:null
      });

      chart.legend({
        title:null,
        position:'bottom',
        dy:10,
        itemWrap: true,

      });

      // chart.areaStack().position('date*人数').color('天数');
      chart.areaStack().position('date*人数').color('天数',["#aaa1cc","#e0b5c9","#e098b0","#ee82a2","#ef91ac","#eda994","#eeb798","#ecc099","#f6d5aa","#f0d48a","#efd95f","#eee469","#dbdc7f","#dfd961","#ebe378","#f5e351","#b28647","#a97d32","#dfad70","#a2765d","#9f6652","#b9763f","#bf6e5d","#af643c","#9b4c3f","#72659d","#8a6e9e","#8f5c85","#934b8b","#9d4e87","#92538c","#8b6397","#716084","#2e6093","#3a5988","#4a5072","#393e64",]);
      chart.render();

    });

    const charts = [
      {
        chart:<Chart
        data = {frame}
        forceFit
        width={800}
        height={650}
        plotCfg={
          { margin: [20, 100, 100, 50] }
        }
        />,
        title:'1111'
      }
    ];
    this.setState({
      charts,
    })

  }

  render () {
    const { charts=[] } = this.state;
    return <div>
      <br/>
      {
        charts.length > 0 ?
          <div >
            {charts.map((item, index) => {
              return <div key={index}>
                <div >{item.chart}</div>
              </div>
            })}
          </div> : null
      }
    </div>
  }

}