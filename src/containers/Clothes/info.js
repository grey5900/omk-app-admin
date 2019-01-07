/**
 * Created by isaac on 2016/4/3.
 */
import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';

export function columnCreator() {
  return [
    {
      field: '$index',
      name: '编号',
      width: 50
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
      field: 'weight', name: '重量(kg)'
    },
    {
      field: 'type', name: '类型'
    },
    {
      field: 'is_common', name: '常用'
    },
    {
      field: 'comment',
      name: '备注',
      width: 150
    },
    {
      field: 'create_time', name: '创建时间',
      display: (model) => {
        const date = new Date(model.create_time);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
    }
  ];
}
