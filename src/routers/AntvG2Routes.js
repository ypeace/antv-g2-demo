import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import './style.css';
import Point from "../pages/g2/Point";
import Line from "../pages/g2/Line";


export default class AntvG2Routes extends Component {
  constructor (props) {
    super(props);
    this.state = {
      path: ''
    }
  }

  componentWillMount(){
    const pathFirst = window.location.pathname.split('/')[2]||'point';
    const url = this.props.match.url;
    const pathForComponent = `${url}/${pathFirst}`||`${url}/point`;
    const targetObj = this.menu.filter(item=>item.path ==='/'+ pathFirst);
    this.setState({
      pathForComponent,
      component: targetObj[0].component,
      title: targetObj[0].title
    })
  }

  menu = [
    {
      path: '/point',
      name: '点图示例',
      component: Point,
      title: '点的图'
    }, {
      path: '/line',
      name: '线图示例',
      component: Line,
      title: '线的图'
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
