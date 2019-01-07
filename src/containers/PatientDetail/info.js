/**
 * Created by isaac on 16/5/31.
 */
import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';

export function weightColumnCreator() {
  return [
    {
      name: '编号', field: '$index', width: 60
    },
    {
      name: '体重', field: 'weight', width: 60
    },
    {
      name: '时段', display: ({type}) => type, width: 100
    },
    {
      name: '衣物重量', field: 'cloth_weight', width: 100
    },
    {
      name: '净重', field: 'pure_weight', width: 100
    },
    {
      name: '血压', width: 100,
      display: (model) => {
        const hbp = model.high_blood_pressure;
        const lbp = model.low_blood_pressure;
        let result = '';
        if (hbp && lbp) {
          result = `${hbp} / ${lbp}`;
        }
        return result;
      }
    },
    {
      name: '心率', field: 'heart_rate', width: 100
    },
    {
      name: '创建时间',
      width: 150,
      display: (model) => {
        const time = model.create_time;
        const date = new Date(time);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
    }
  ];
}

export function clothColumnCreator() {
  return [
    {
      name: '编号', field: '$index', width: 60
    },
    {
      name: '姓名',
      width: 60,
      display: (model) => {
        const {user} = model;
        const link = `/patient/${model._id}`;
        return (<LinkContainer to={link} ><a>{user.name}</a></LinkContainer>);
      }
    },
    {
      name: '重量', field: 'weight', width: 60
    },
    {
      name: '类型', field: 'type', width: 60
    },
    {
      name: '常用', field: 'is_common', width: 60
    },
    {
      name: '备注', field: 'comment', width: 160
    },
    {
      name: '创建时间',
      width: 160,
      display: (model) => {
        const time = model.create_time;
        const date = new Date(time);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
    }
  ];
}

export function parseWeight(weights) {
  const result = [];
  const hearts = [];
  weights.forEach((weight) => {
    const time = weight.create_time;
    const date = new Date(time);
    const timeString = date; // `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    result.push({
      time: timeString,
      value: weight.weight || 0,
      name: '体重'
    });
    result.push({
      time: timeString,
      value: weight.cloth_weight || 0,
      name: '衣物重量'
    });
    result.push({
      time: timeString,
      value: weight.pure_weight || 0,
      name: '净重'
    });
    result.push({
      time: timeString,
      value: weight.water_mass || 0,
      name: '超滤量'
    });

    hearts.push({
      time: timeString,
      value: weight.high_blood_pressure || 0,
      name: '收缩压'
    });
    hearts.push({
      time: timeString,
      value: weight.low_blood_pressure || 0,
      name: '舒张压'
    });
    hearts.push({
      time: timeString,
      value: weight.heart_rate || 0,
      name: '心率'
    });
  });
  return [result, hearts];
}

export function parseCloth(clothes) {
  const result = {};
  clothes.forEach((cloth) => {
    const {type} = cloth;
    let count = result[type];
    if (!count) {
      count = 0;
    }
    ++count;
    result[type] = count;
  });
  return Object.keys(result).map((key) => ({value: result[key], name: key}));
}
