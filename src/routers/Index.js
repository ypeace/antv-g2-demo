import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Echart from "../pages/echart/Echart"

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/about">关于</Link></li>
        <li><Link to="/topics">主题列表</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>首页</h2>
  </div>
)

const About = () => (
  <div>
    <h2>关于</h2>
  </div>
)

const Topics = ({ match }) => {

  return <div>
    <h2>主题列表</h2>
    <ul>
      <li>
        <Link to={`/topics/line`}>
          使用 React 渲染
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          组件
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          属性 v. 状态
        </Link>
      </li>
    </ul>

    <Route path={`/topics/line`} component={Echart}/>
    <Route path={`${match.url}/components`} component={Topic2}/>
    <Route exact path={match.url} render={() => (
      <h3>请选择一个主题。</h3>
    )}/>
  </div>
}


const Topic1 = ({ match }) => (
  <div>
    <h3>rendering</h3>
  </div>
)

const Topic2 = ({ match }) => (
  <div>
    <h3>components</h3>
  </div>
)


export default BasicExample