import React, { Component } from 'react';
import createG2 from 'g2-react';
import { Frame } from 'g2';

import {
  SelectField,
  MenuItem,
  DatePicker,
} from 'material-ui';


import { fetchRent } from '../../services/statistic/rentInDay';
import { fetchRegions } from '../../services/operation/region';
import { create, finish } from '../../services/operation/inspectionOrder';

export default class OrderTrendMap extends Component {

  fetchData (region) {
    const { query } = this.state;
    (async _ => {
      const finalQuery = region ? { query: { ...query, ...{ region } } } : { query };
      this.setState({
        query: {
          ...this.state.query,
          region
        }
      });
      let result = await fetchRent({ ...finalQuery, ...{ limit: 1000 } });
      let result1 = result.items.reduce((memo, item) => {

        memo.finishCount = [...memo.finishCount, {
          date: new Date(item.date).toSimpleString(),
          完成订单数: item.finishCount,
          使用优惠券的订单数: parseFloat(item.finishCountUseCoupon),
          自己加的:Math.random() * 500
        }];
        return memo;
      }, {
        finishCount: [], // 日单量
      });
      let result2 = result.items.reduce((memo, item) => {
        memo.disCountPerOrder = [...memo.disCountPerOrder, {
          date: new Date(item.date).toSimpleString(),
          日单均优惠额: parseFloat((item.couponAmount ? ((item.couponAmount / item.finishCount) / 100) : 0).toFixed(2)),
          订单均价: parseFloat((item.costAmount ? ((item.costAmount / item.finishCount) / 100) : item.costAmount).toFixed(2)),

        }];
        return memo;
      }, {
        disCountPerOrder: [], //日单均优惠额
      });
      let countName = ['完成订单数', '使用优惠券的订单数', '自己加的'];
      let countName2 = ['日单均优惠额', '订单均价'];

      let frame1 = new Frame(result1.finishCount);
      frame1 = Frame.combinColumns(frame1, countName, '订单数', '名称', 'date');
      console.log(frame1)
      let frame2 = new Frame(result2.disCountPerOrder);
      frame2 = Frame.combinColumns(frame2, countName2, '比率', '名称', 'date');

      this.renderChart(frame1, frame2)
    })().catch(err => {
      window.iziToast.error({ title: err });
    });
  }

  renderChart (frame1, frame2) {
    const Chart1 = createG2(chart => {
      chart.col('date', {//必须先于chart.line()定义
        type: 'time',//若果是连续的时间用time  否则用timeCate
        nice: false,
        alias:'时间',//定义坐标轴名称
        mask: 'mm/dd',//默认是"yyyy-mm-dd"
        // tickCount: 11,//定义坐标轴刻度线的条数 默认为5
        tickInterval: 1 * 24 * 60 * 60 * 1000//和上面的不能同时定义// tickInterval: 1000, // 当为时间类型时，请传入单位为微秒的数据
        // formatter: function(val) {
        //   return val + '元';
        // }
      });
      chart.axis('date', {
        labels: {
          autoRotate: false,
          custom: true, // 表示使用自定义 html 显示文本标签
          // renderer: function(value){
          //   return '<img src="https://www.jiuwa.net/bg/985.jpg" width="30px"/>';
          // }
        },
        title: null,//控制标题  显示于否
        formatter: value => value + '号'
      });
      chart.axis("订单数", {
        title: null,//为坐标轴设置别名的时候需要在col里设置alias属性
        tickLine: {
          lineWidth: 2,
          value: 10,
          stroke: 'red'
        }
      });
      chart.legend({//上下的时候不显示图例
        // title: null, // 不展示图例的标题
        // position:"top",
        spacingX: 200,
        dy: 10,//图例的垂直偏移距离
        dx: 20,//图例的水平偏移距离
        itemWrap: false,//是否自动换行
        marker: 'square' // 设置图例 marker 的显示样式  方块的
      });
      // chart.legend(false); //所有的图例都不显示
      chart.line()/*线形状*/.position('date * 订单数')/*坐标轴的映射*/.color('名称')/*颜色，有回调函数，或者直接用数组来装下一组数*/.size(1)/*对于点来说代表半径，对于线意味着粗细，对于柱状图来说对应柱子的宽度*/;
      chart.interval().position('date * 订单数').color('#90ed7d').shape('diamond');
      chart.render();
      chart.changeData(frame1);

      //修改提示信息里面的东西
      chart.on('tooltipchange', function (ev) {
        var item = ev.items; // 获取tooltip要显示的内容
        item[0].value = '格式化-' + item[0].value;
        item[1].value = '格式化22' + item[1].value;
      });
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
    const Chart2 = createG2(chart => {

      chart.source(frame2, {
        'date': {
          type: 'time',
          nice: false,
          mask: 'mm/dd',
          tickCount: 5,//定义刻度线的条数，列定义中为对应的数据字段设置 tickCount 用于控制刻度线的个数；
          // range:[0.01,1],
        },
        '比率': {//格式化坐标轴
          formatter: function (val) {
            return val + '!';
          }
        }
      });

      chart.axis('比率', {
        title: null,
      });
      chart.axis('date', {
        title: null,
      });
      chart.legend({
        title: null, // 不展示图例的标题
        position: "bottom"
      });
      chart.line().position('date * 比率').color('名称', function (value) {
        if (value === '订单均价') {
          return 'green'
        }
      }).label('比率', {
        custom: true, // 使用自定义文本
        renderer: (a, b, c) => a, // 格式化文本的函数
        labelLine: false, // 不显示文本的连接线
        offset: 50 // 文本距离图形的距离
      });
      chart.render();
    });

    this.setState({
      chart1: <Chart1
        data={[]}
        forceFit
        height={400}
        width={1000}
      />,
      chart2: <Chart2
        data={[]}
        forceFit
        height={400}
        width={1000}
      />,
    });
  }


}


