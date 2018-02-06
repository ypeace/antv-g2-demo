import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import './style.css';

import Point from "../pages/g2/DoubleYChart";
import Line from "../pages/g2/BaseChart";
import HotChart from "../pages/g2/HotChart"
import HotMap from "../pages/g2/HotMap"

Date.prototype.format = function(fmt) {
  let  o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
};

export default class AntvG2Routes extends Component {
  constructor (props) {
    super(props);
    this.state = {
      path: ''
    }
  }

  componentWillMount(){
    const pathFirst = window.location.pathname.split('/')[2]||'BaseChart';
    const url = this.props.match.url;
    const pathForComponent = `${url}/${pathFirst}`||`${url}/BaseChart`;
    const targetObj = this.menu.filter(item=>item.path ==='/'+ pathFirst);
    this.setState({
      pathForComponent,
      component: targetObj[0].component,
      title: targetObj[0].title
    })
  }

  menu = [
    {
      path: '/BaseChart',
      name: '基础图例',
      component: Point,
      title: '柱状图、点图、线图'
    }, {
      path: '/DoubleYChart',
      name: '双Y轴图例',
      component: Line,
      title: '双Y轴图例'
    },{
      path:'/HotChart',
      name:'热力图',
      title:'热力图',
      component:HotChart,
    },{
      path:'/HotMap',
      name:'热力地图',
      title:'热力地图',
      component:HotMap,
    }
  ];


  render () {
    const url = this.props.match.url;
    const { pathForComponent, component,title } = this.state;
    return <div className="content">
      <div className="content-left">
        <ul>
          {
            this.menu.map((item, index) => {
              return <li key={index}
                         onClick={_ => {
                           this.setState({
                             pathForComponent: `${url}${item.path}`,
                             component: item.component,
                             title: item.title
                           })
                         }}>
                <Link
                  className={pathForComponent === `${url}${item.path}` ? 'active2' : ''}
                  to={`${url}${item.path}`}>{item.name}</Link>
              </li>
            })
          }
        </ul>
      </div>
      <div className="content-right">
        <h4 className="title">{title}</h4>
        <div className="chart">
          <Route exact path={pathForComponent} component={component}/>
        </div>
      </div>
    </div>
  }
}
