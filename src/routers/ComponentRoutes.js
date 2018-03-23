import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import './style.css';
import Test from "../pages/component/Test";
import AntDesign from "../pages/component/AntDesign";

export default class ComponentRoutes extends Component {
  constructor (props) {
    super(props);
    this.state = {
      path: ''
    }
  }

  componentWillMount(){
    const pathFirst = window.location.pathname.split('/')[2]||'test';
    const url = this.props.match.url;
    const pathForComponent = `${url}/${pathFirst}`;
    const targetObj = this.menu.filter(item=>item.path ==='/'+ pathFirst);
    this.setState({
      pathForComponent,
      component: targetObj[0].component,
      title: targetObj[0].title
    })
  }

  menu = [
    {
      path: '/test',
      name: '草稿纸',
      component: Test,
      title: '组件诞生的地方'
    }  ,  {
      path: '/antDesign',
      name: '练习',
      component: AntDesign,
      title: '练习'
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
