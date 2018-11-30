import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import './style.css';

import Point from "../pages/g2/DoubleYChart";
import Line from "../pages/g2/BaseChart";
import Rainbow from "../pages/g2/Rainbow";
import HotChart from "../pages/g2/HotChart"
import HotMap from "../pages/g2/HotMap"
import AreaChart from '../pages/g2/AreaChart'
import TableChart from '../pages/g2/TableChart'

export default class AntvG2Routes extends Component {
  constructor (props) {
    super(props);
    this.state = {
      path: ''
    }
  }

  componentWillMount () {
      //先拿到路径

    const pathFirst = window.location.pathname.split('/')[2] || 'BaseChart';
    const url = this.props.match.url;
    const pathForComponent = `${url}/${pathFirst}`;
    const targetObj = this.menu.filter(item => item.path === '/' + pathFirst);
    console.log(targetObj);
    this.setState({
      pathForComponent,
      component: targetObj[0].component,
      title: targetObj[0].title
    });
  }

  menu = [
    {
      path: '/BaseChart',
      name: '基础图例',
      component: Point,
      title: '柱状图、点图 、线图'
    }, {
      path: '/DoubleYChart',
      name: '双Y轴图例',
      component: Line,
      title: '双Y轴图例'
    }, {
      path: '/rainbow',
      name: '多线彩虹图',
      component: Rainbow,
      title: '多线彩虹图'
    }, {
      path: '/HotChart',
      name: '热力图',
      title: '热力图',
      component: HotChart,
    }, {
      path: '/areaChart',
      name: '区域层叠图',
      title: '留存层叠图',
      component: AreaChart,
    }, {
      path: '/tableChart',
      name: '列表图',
      title: '列表图',
      component: TableChart,
    }, {
      path: '/HotMap',
      name: '饼图',
      title: '饼图',
      component: HotMap,
    }
  ];


  render () {
    const url = this.props.match.url;
    const { pathForComponent, component, title } = this.state;
    console.log(component)
    return <div className="content">
      <div className="content-left">
        <ul>
          {
            this.menu.map((item, index) => {
              return <li key={index}
                         onClick={_ => {
                           console.log("2222", item.component)
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
          <Route path={pathForComponent} component={component}/>
        </div>
      </div>
    </div>
  }
}
