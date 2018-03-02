import React, { Component } from "react";
import { BrowserRoute as Router, Route, Link } from "react-router-dom";
import createG2 from "g2-react";
import { Stat } from "g2";

export default class AntvG2 extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillMount () {

  }

  render () {
    return <div>
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
      <embed src = "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"

      />
    </div>
  }
}
