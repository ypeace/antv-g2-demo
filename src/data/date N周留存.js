
const data = [
  {
    id:123,
    date:"2018-01-01T16:00:00.000",
    // 押金留存N周分布比率
    depositRetentionInterval:{
      1:22,
      2:56,
      3:82,
      4:22,
      5:72,
      6:45,
      7:50,
      8:20
    },
    // 订单留存N周比率
    orderRetentionInterval:{
      1:98,
      2:88,
      3:89,
      4:79,
      5:72,
      6:45,
      7:50,
      8:33
    },
    // 当周订单数量
    orderCount:343,
    // 当周押金支付数量
    depositCount:300
  },
  {
    id:123,
    date:"2018-01-07T16:00:00.000",
    // 押金留存N周分布比率
    depositRetentionInterval:{
      1:93,
      2:44,
      3:22,
      4:11,
      5:66,
      6:45,
      7:50,
      // 8:22
    },
    // 订单留存N周比率
    orderRetentionInterval:{
      1:98,
      2:88,
      3:67,
      4:66,
      5:55,
      6:45,
      7:50,
      8:33
    },
    // 当周订单数量
    orderCount:500,
    // 当周押金支付数量
    depositCount:124
  },
  {
    id:123,
    date:"2018-01-14T16:00:00.000",
    // 押金留存N周分布比率
    depositRetentionInterval:{
      1:32,
      2:88,
      3:11,
      4:68,
      5:58,
      6:44,
      // 7:33,
    },
    // 订单留存N周比率
    orderRetentionInterval:{
      1:98,
      2:88,
      3:89,
      4:79,
      5:72,
      6:45,
      7:50,
      8:33
    },
    // 当周订单数量
    orderCount:879,
    // 当周押金支付数量
    depositCount:322
  }
];
export default data ;
