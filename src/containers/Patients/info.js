import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import moment from 'moment';

export function columnCreator(editAction) {
  return [
    {
      field: '$index',
      name: '编号',
      width: 50
    },
    {
      name: '姓名',
      display: (model) => {
        const link = `/patient/${model._id}`;
        return (<LinkContainer to={link}><a>{model.real_name}</a></LinkContainer>);
      }
    },
    {
      name: '性别',
      width: 50,
      display: ({sex}) => {
        return sex === 0 ? '男' : '女';
      }
    },
    {
      field: 'mobile',
      name: '手机'
    },
    {
      name: '年龄',
      width: 50,
      display: (model) => {
        return (moment(new Date()).diff(model.birthday, 'years'));
      }
    },
    {
      field: 'address_detail',
      name: '地区',
      width: 280
    },
    {
      name: '创建时间',
      display: (model) => {
        const date = new Date(model.create_time);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
    },
    {
      name: '操作',
      display: (model) => {
        return (<div>
          <button className="ui teal button" onClick={editAction.bind(null, model)} >详情</button>
        </div>);
      }
    }
  ];
}
