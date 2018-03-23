import React, { Component } from "react";
import { Stat } from "g2";
import Button from 'antd/lib/button';
import './style.css';

export default class AntvG2 extends Component {
  constructor (props) {
    super(props);
    this.state = {
      date: '',
    };
  }

  componentWillMount () {
    // window.print()提示用户打印页面
  }


  render() {
    return (
      <div className="App">
        <Button type="primary">Button</Button>
      </div>
    );
  }
}


