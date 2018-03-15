import React from 'react';
import './style.css';

export default ({ dataSource = [], columns = [] , title = ""}) => {
  return (
    <div>
      {title?<p className="title">{title}</p>:null}
      <table className="table">
        <thead>
        <tr>
          {columns.map((column, index) => (
            <td
              key={index}
            >{column.name}</td>
          ))}
        </tr>
        </thead>
        <tbody>
        {dataSource.map((row, index) => {
          return (
            <tr
              key={index}>{columns.map(({ render = _ => null }, index) => {
              return <td
                key={index}>{render(row)}</td>;
            })}</tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
};