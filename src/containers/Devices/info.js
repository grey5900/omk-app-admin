/**
 * Created by isaac on 2016/4/3.
 */
import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';

export function columnCreator() {
  return [
    {
      field: '$index',
      width: 50,
      name: '编号'
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
      field: 'manufacturer',
      name: '厂商'
    },
    {
      field: 'model',
      name: '型号'
    },
    {
      field: 'platform',
      name: '平台'
    },
    {
      field: 'uuid',
      width: 330,
      name: 'UUID'
    },
    {
      field: 'version',
      name: '版本号'
    },
    {
      name: '创建时间',
      display: (model) => {
        const date = new Date(model.create_time);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
    }
  ];
}
