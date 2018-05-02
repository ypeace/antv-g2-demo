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
    const data = [
      {
        id: 1,
        categoryCode: '123',
        categoryName: '肉',
        children: [
          {
            id: 111,
            categoryCode: '22',
            categoryName: '肉1',
            children: [
              {
                id: 23,
                categoryCode: '90',
                categoryName: '肉2',
              }, {
                id: 70,
                categoryCode: '20',
                categoryName: '肉3',
              }
            ]
          }, {
            id: 222,
            categoryCode: '23',
            categoryName: '肉4',
          }, {
            id: 333,
            categoryCode: '24',
            categoryName: '肉5',
            children: [{
              id: 666,
              categoryCode: '666',
              categoryName: '肉6',
              children: [
                {
                  id: 22,
                  categoryCode: '222',
                  categoryName: '肉22',
                  children:[
                    {
                      id: 4,
                      categoryCode: '444',
                      categoryName: '肉44',
                    }
                  ]
                }
              ]
            }, {
              id: 777,
              categoryCode: '777',
              categoryName: '肉77',
            }]
          }]
      },
      {
        id: 8,
        categoryCode: '56',
        categoryName: '菜',
        children: [
          {
            id: 78,
            categoryCode: '57',
            categoryName: '菜1',
            children: [
              {
                id: 89,
                categoryCode: '54',
                categoryName: '菜2',
              }, {
                id: 81,
                categoryCode: '53',
                categoryName: '菜4',
              }
            ]
          }, {
            id: 84,
            categoryCode: '52',
            categoryName: '菜5',
          }, {
            id: 29,
            categoryCode: '51',
            categoryName: '菜6',
          }]
      },
    ];
    this.setState({
      data
    }, () => {
      const fatherArr = this.findFathers('444')
    });
/**/
  }

  findFathers = (id) => {
    const { data } = this.state;



    function fn2 (dataArr, name, fatherName = '') {
      fatherName = fatherName +
        dataArr.forEach((item) => {
          if (item.categoryCode === name) {
            console.log(item.id, item.categoryCode, fatherName)
            return null;
          } else {
            if (item.children && item.children.length > 0) {
              fn2(item.children, name, fatherName + '/' + item.categoryName)
            }
          }
        })
    }

    fn2(data, id)


  };


  render () {
    return (
      <div className="App">
      </div>
    );
  }
}


