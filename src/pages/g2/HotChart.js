import React, { Component } from "react";
import createG2 from "g2-react";
import { Frame, State } from "g2";

export default class HotChart extends Component {

  componentWillMount () {
    let data = [];
    for(var i = 0; i <= 20; i ++) {
      for(var j = 0; j <= 20; j ++) {
        var x = i*25.6;
        var y = j*19.2;
        if((x>220&&x<360)&&(y>70&&y<230)){
          var z = Math.random()*(200);
        }else if((x>320&&x<500)&&(y>230&&y<380)){
          var z = Math.random()*(200);
        }else{
          var z  = Math.random()*(100);
        }
        data.push({
          x: x,
          y: y,
          value: z
        });
      }
    }
    this.renderChart(data)
  }

  renderChart (data) {
    const Chart = createG2(chart => {
      chart.col("x", {
        type: 'linear',
        min: 0,
        max:512,
        nice:false
      });

      chart.col("y",{
        type:'linear',
        min:0,
        max:384,
        nice:false
      });
      //由于数据坐标的原点在左下角，但是图片坐标原点在左上角，所以需要将数据坐标翻转
      chart.coord().reflect();
      chart.axis(false);
      chart.source(data);
      chart.heatmap().position('x*y').color('value').size(40);//为了呈献更好的效果，需要调整热力图的叠加范围
      //引入背景图片
      chart.guide().image([0,384],[512,0],{
        src: 'https://zos.alipayobjects.com/rmsportal/psmMpWXLgUvKtbm.jpg'
      });
      chart.render();
    });

    this.setState({
      chart:<Chart
       width={800}
       height={600}
       // forceFit={true}
      />
    })

  }

  render () {
    const {chart = null} =this.state;
    return <div>
      {chart}
    </div>
  }
}