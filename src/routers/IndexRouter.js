import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './style.css';
import Echart from '../routers/EchartRouter';
import AntvG2Routes from "../routers/AntvG2Routes";
import MapRoutes from "../routers/MapRoutes";
import ComponentRoutes from '../routers/ComponentRoutes'

Date.prototype.format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒对方答复
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }

  return fmt;
};

class IndexRoute extends Component  {
  constructor () {
    super();
    this.state = {
      active: ''
    }
  }

  componentWillMount () {
    const pathFirst = window.location.pathname.split('/')[1]||'g2';
    this.setState({
      active: pathFirst
    })
  }

  render () {
    const { active } = this.state;
    return (
      <Router>
        <div className="container">
          <div className="header">
            <ul className="nav-list">
                <span>进入项目步骤->点击 G2->点击（！！重要）左边的图例就显示了（以前随便搭架子凑着用来装g2的代码，笔记在plane.js里） </span>
              <li
                onClick={() => {
                  this.setState({
                    active: 'echart3'
                  })
                }}
              ><Link to="/echart" className={active === 'echart' ? "active" : null}>Echart</Link></li>
              <li
                onClick={() => {
                  this.setState({
                    active: 'map'
                  })
                }}
              ><Link to="/map" className={active === 'map' ? "active" : null}>Map</Link></li>
              <li
                onClick={() => {
                  this.setState({
                    active: 'component'
                  })
                }}
              ><Link to="/component" className={active === 'component' ? "active" : null}>Component</Link></li>
              <li
                onClick={() => {
                  this.setState({
                    active: 'g2'
                  })
                }}
              ><Link to="/g2" className={active === 'g2' ? "active" : null}>G2</Link></li>
            </ul>
          </div>

          <Route path="/g2" component={AntvG2Routes}/>
          <Route path="/echart" component={Echart}/>
          <Route path="/map" component={MapRoutes}/>
          <Route path="/component" component={ComponentRoutes}/>
        </div>
      </Router>
    );
  }
}


export default IndexRoute;
