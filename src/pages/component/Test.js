import React, { Component } from "react";
import { BrowserRoute as Router, Route, Link } from "react-router-dom";
import createG2 from "g2-react";
import { Stat } from "g2";
import './style.css'


export default class AntvG2 extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillMount () {
    // console.log(window.screen.width)
    // console.log(window.screen.height)
    // console.log(window.innerWidth)
    // console.log(window.innerHeight)
    // window.print()提示用户打印页面
    window.prompt("444444")
  }

  render () {
    return <div>
      <div></div>
      <hr/>
      <select
        onChange={(e) => {
          console.log(e.target.value)
        }}
      >
        <option value="1">哈哈</option>
        <option value="2">呵呵</option>
        <option value="3">哦哦</option>
        <option value="4">嘻嘻</option>
      </select>
      <hr/>
      <input
        type="number"
        max="99"
        name="price"
      />
      <embed src = "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"/>
      <hr/>
      <div className="test-box">
        <p
        style={{zoom:'150%'}}
        >我喜欢ni </p>
        <p>我喜欢苹果</p>
      </div>
      <hr/>
      <div className="box-shadow"> box-shadow: 30px 10px 30px 5px blue;4个值得意思：1向右阴影的长度 2 向下 3，模糊度 4扩散度
      </div>
      <br/>
      <br/>
      <br/>
      <div className=" outline">轮廓是不占地的</div>
      <div className=" ">轮廓</div>

    </div>
  }
}
