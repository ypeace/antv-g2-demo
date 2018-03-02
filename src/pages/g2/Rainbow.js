import React, { Component } from "react";
import createG2 from "g2-react";
import { Stat } from "g2";
import { Frame } from 'g2';
import './style.css'
export default class AntvG2 extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillMount () {
    this.fetchData();
  }

  fetchData () {
    (async _ => {
      const result = [
        {
          date: '2018-01-27T16:00:00.000',
          orderCount: 22324,
          orderCountTotalAmount: 1223453,
          orderAmount: {//钱
            stockAndCouponAndPark: 2433,
            couponAndPark: 5333,
            stockAndCoupon: 2533,
            stockAndPark: 5555,
            coupon: 3322,//优惠券
            park: 1111,//停车优惠
            stock: 3456,//骑行优惠
            normal: 1341//无优惠
          },
          discountCount: {//数量
            stockAndCouponAndPark: 242,
            couponAndPark: 332,
            stockAndCoupon: 456,
            stockAndPark: 823,
            coupon: 253,
            park: 153,
            stock: 231,
            normal: 987
          },
          discountAmount: {//钱 每一种给总优惠了多少爱你
            coupon: 12345,
            park: 15667,
            stock: 33221
          }
        }, {
          date: '2018-01-28T16:00:00.000',
          orderCount: 22222,
          orderCountTotalAmount: 222221222,
          orderAmount: {//钱
            stockAndCouponAndPark: 2222,
            couponAndPark: 2333,
            stockAndCoupon: 2444,
            stockAndPark: 2555,
            coupon: 6666,//优惠券
            park: 5,//停车优惠
            stock: 2888,//骑行优惠
            normal: 2999//无优惠
          },
          discountCount: {//数量
            stockAndCouponAndPark: 222,
            couponAndPark: 333,
            stockAndCoupon: 444,
            stockAndPark: 555,
            coupon: 666,
            park: 222,
            stock: 333,
            normal: 444
          },
          discountAmount: {//钱 每一种给总优惠了多少爱你
            coupon: 22222,
            park: 33333,
            stock: 11111
          }
        }, {
          date: '2018-01-29T16:00:00.000',
          orderCount: 22324,
          orderCountTotalAmount: 1223453,
          orderAmount: {//钱
            stockAndCouponAndPark: 2433,
            couponAndPark: 5333,
            stockAndCoupon: 2533,
            stockAndPark: 5555,
            coupon: 3322,//优惠券
            park: 1111,//停车优惠
            stock: 3456,//骑行优惠
            normal: 1341//无优惠
          },
          discountCount: {//数量
            stockAndCouponAndPark: 242,
            couponAndPark: 332,
            stockAndCoupon: 456,
            stockAndPark: 823,
            coupon: 253,
            park: 153,
            stock: 231,
            normal: 987
          },
          discountAmount: {//钱 每一种给总优惠了多少爱你
            coupon: 12345,
            park: 15667,
            stock: 33221
          }
        }, {
          date: '2018-01-30T16:00:00.000',
          orderCount: 33333,
          orderCountTotalAmount: 3333333,
          orderAmount: {//钱
            stockAndCouponAndPark: 3333,
            couponAndPark: 2333,
            stockAndCoupon: 2444,
            stockAndPark: 2555,
            coupon: 2,//优惠券
            park: 5777,//停车优惠
            stock: 2888,//骑行优惠
            normal: 2999//无优惠
          },
          discountCount: {//数量
            stockAndCouponAndPark: 222,
            couponAndPark: 333,
            stockAndCoupon: 444,
            stockAndPark: 555,
            coupon: 666,
            park: 222,
            stock: 333,
            normal: 444
          },
          discountAmount: {//钱 每一种给总优惠了多少爱你
            coupon: 33333,
            park: 44444,
            stock: 11111
          }
        }];

      this.renderChart(result)
    })()
  }

  renderChart (results) {
    const dataArr = [];
    results.forEach((item) => {
      dataArr.push({
        date: new Date(item.date).format('MM/dd'),
        优惠券优惠总额: Number(item.discountAmount.coupon && (item.discountAmount.coupon / 100).toFixed(2)),
        停车优惠总额: Number(item.discountAmount.park && (item.discountAmount.park / 100).toFixed(2)),
        骑行优惠总额: Number(item.discountAmount.stock && (item.discountAmount.stock / 100).toFixed(2)),

        优惠券优惠订单数: item.discountCount.coupon,
        停车优惠订单数: item.discountCount.park,
        骑行优惠订单数: item.discountCount.stock,
        无优惠订单数: item.discountCount.normal,
        优惠券和骑行优惠订单数: item.discountCount.stockAndCoupon,
        优惠券和停车订单数: item.discountCount.couponAndPark,
        停车和骑行优惠订单数: item.discountCount.stockAndPark,
        停车和骑行和优惠券三种优惠订单数: item.discountCount.stockAndCouponAndPark,

        优惠券优惠订单额: Number(item.orderAmount.coupon && ((item.orderAmount.coupon) / 100).toFixed(2)),
        停车优惠订单额: Number(item.orderAmount.park && ((item.orderAmount.park) / 100).toFixed(2)),
        骑行优惠订单额: Number(item.orderAmount.stock && ((item.orderAmount.stock) / 100).toFixed(2)),
        无优惠订单额: Number(item.orderAmount.normal && ((item.orderAmount.normal) / 100).toFixed(2)),
        优惠券和骑行优惠订单额: Number(item.orderAmount.stockAndCoupon && ((item.orderAmount.stockAndCoupon) / 100).toFixed(2)),
        优惠券和停车订单额: Number(item.orderAmount.couponAndPark && ((item.orderAmount.couponAndPark) / 100).toFixed(2)),
        停车和骑行优惠订单额: Number(item.orderAmount.stockAndPark && ((item.orderAmount.stockAndPark) / 100).toFixed(2)),
        停车和骑行和优惠券三种优惠订单额: Number(item.orderAmount.stockAndCouponAndPark && ((item.orderAmount.stockAndCouponAndPark) / 100).toFixed(2)),
      })
    });
    console.log(dataArr);
    //// 各优惠类型订单优惠金额
    let frame1 = new Frame(dataArr);
    frame1 = Frame.combinColumns(frame1, ['优惠券优惠订单数', '停车优惠订单数', '骑行优惠订单数', '无优惠订单数', '优惠券和骑行优惠订单数', '优惠券和停车订单数', '停车和骑行优惠订单数', '停车和骑行和优惠券三种优惠订单数'], "订单数量", '类别', 'date');

    //// 各优惠类型订单租金额
    let frame2 = new Frame(dataArr);
    frame2 = Frame.combinColumns(frame2, ['优惠券优惠订单额', '停车优惠订单额', '骑行优惠订单额', '无优惠订单额', '优惠券和骑行优惠订单额', '优惠券和停车订单额', '停车和骑行优惠订单额', '停车和骑行和优惠券三种优惠订单额'], '优惠总额', '类别', 'date');
    //// 各优惠类型订单优惠金额
    let frame3 = new Frame(dataArr);
    frame3 = Frame.combinColumns(frame3, ['优惠券优惠总额', '停车优惠总额', '骑行优惠总额'], '优惠总额', '类别', 'date');


    const Chart1 = createG2(chart => {
      chart.col('date', {
        type: 'time',
        nice: false,
        mask: 'mm/dd',
        alias: '时间'
      });//横轴
      chart.axis('date', {//Y轴
        labels: {
          autoRotate: false
        }
      });
      chart.axis('date', {
        title: null,
      });
      chart.legend({
        position: "bottom",
        itemWrap: true,

        dy: 10,
      });
      chart.areaStack().position('date * 订单数量').color('类别');
      chart.render();
    });

    const Chart2 = createG2(chart => {
      chart.col('date', {
        type: 'time',
        nice: false,
        mask: 'mm/dd',
        alias: '时间'
      });//横轴

      chart.col('..percent', {
        formatter: function (订单数量) {
          订单数量 = 订单数量 || 0;
          订单数量 = 订单数量 * 100;
          return parseInt(订单数量);
        },
        alias: 'percent(%)'
      });

      chart.axis('date', {//Y轴
        labels: {
          autoRotate: false
        }
      });
      chart.axis('date', {
        title: null,
      });
      chart.legend({
        position: "bottom",
        itemWrap: true,
        dy: 10,
      });
      chart.on('tooltipchange', function (ev) {
        const items = ev.items;
        items.forEach(item => {
          item.value = item.value + ' % ';
        })
      });
      chart.areaStack().position(Stat.summary.percent('date*订单数量')).color('类别');
      // chart.areaStack().position('date * 订单数量').color('类别');
      chart.render();
    });

    this.setState({
      chartForCount: <Chart1
        data={frame1}
        forceFit
        height={400}
        width={1000}
        plotCfg={
          { margin: [50, 100, 100, 80] }
        }
      />,
      chartForPercent: <Chart2
        data={frame1}
        forceFit
        height={400}
        width={1000}
        plotCfg={
          { margin: [50, 100, 100, 80] }
        }
      />,
    })
  }

  render () {
    const { onShow, chartForCount, chartForPercent } = this.state;
    return <div>
      <br/>
      <br/>
      <div style={{ textAlign: 'center'}}>
        <button
          className={onShow?"button-active":''}
          onClick={_ => {
            this.setState({
              onShow: true
            })
          }}>各优惠类型订单数
        </button>
        <button
          className={!onShow?"button-active":''}
          onClick={_ => {
            this.setState({
              onShow: false
            })
          }}>各优惠类型订单数所占比率
        </button>
        {onShow ? (chartForCount ? chartForCount : null) : (chartForPercent ? chartForPercent : null)}
      </div>
    </div>
  }
}
