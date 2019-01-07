/**
 * Created by isaac on 16/5/30.
 */
import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';

export function columnCreator() {
  return [
    {
      field: '$index',
      name: '编号',
      width: 50,
    },
    {
      name: '患者',
      display: ({user}) => {
        let result = '';
        if (user) {
          const link = `/patient/${user._id}`;
          result = (<LinkContainer to={link} ><a>{user.real_name}</a></LinkContainer>);
        }
        return result;
      }
    },
    {
      field: 'weight',
      name: '体重',
      width: 70,
    },
    {
      name: '时段',
      width: 50,
      display: ({type}) => {
        let result = '';
        switch (type) {
          case 0:
            result = '透前';
            break;
          case 1:
            result = '透后';
            break;
          default:
            result = '日常';
            break;
        }
        return result;
      }
    },
    {
      name: '衣物重量',
      display: (model) => {
        const cw = model.cloth_weight;
        let result = null;
        if (cw) {
          result = cw.toFixed(3);
        }
        return result;
      }
    },
    {
      field: 'pure_weight',
      name: '净重'
    },
    {
      name: '血压(mmHg)',
      width: 110,
      display: (model) => {
        const hp = model.high_blood_pressure;
        const lp = model.low_blood_pressure;
        let result = '--- / ---';
        if (hp && lp) {
          result = `${model.high_blood_pressure} / ${model.low_blood_pressure}`;
        }
        return result;
      }
    },
    {
      field: 'heart_rate',
      width: 100,
      name: '心率(次/分)'
    },
    {
      field: 'create_time',
      name: '创建时间',
      display: (model) => {
        const date = new Date(model.create_time);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
    }
  ];
}
