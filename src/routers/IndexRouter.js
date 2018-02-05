import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './style.css';
import Echart from '../pages/echart/Echart';
import AntvG2Routes from "../routers/AntvG2Routes";
import MapIndex from "../pages/map/MapIndex";

class IndexRoute extends Component {
  constructor () {
    super();
    this.state = {
      active: ''
    }
  }
  componentWillMount(){
    const pathFirst = window.location.pathname.split('/')[1];
    this.setState({
      active:pathFirst
    })
  }

  render () {
    const { active } = this.state;
    return (
      <Router>
        <div className="container">
          <div className="header">
            <ul className="nav-list">
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
                    active: 'echart3'
                  })
                }}
              ><Link to="/echart" className={active === 'echart' ? "active" : null}>Echart</Link></li>
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
          <Route path="/map" component={MapIndex}/>
        </div>
      </Router>
    );
  }
}


export default IndexRoute;
