/**
 * Created by isaac on 2016/4/3.
 */
import React from 'react';
import {NormalButton} from 'components';
import {LinkContainer} from 'react-router-bootstrap';
const style = {
  whiteSpace: 'nowrap'
};

export function columnCreator(editAction, deleteAction) {
  return [
    {
      name: '编号', field: '$index', style, width: 50
    },
    {
      name: '类别', field: 'type', style
    },
    {
      name: '食谱', style, width: 800, display: (model) => {
        return (
          <div>
            {
              model.detail.map((item) => {
                const link = `/message/${item}`;
                return  (<div><LinkContainer to={link}><a>{item}</a></LinkContainer><br/></div>);
              })
            }
          </div>
        );
      }
    },
    {
      name: '创建时间', style, width: 120,
      display: (model) => {
        const time = model.create_time;
        const date = new Date(time);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
    },
    {
      name: '操作', style, width: 160,
      display: (model) => {
        return (<div>
          <NormalButton onClick={editAction.bind(null, model)} style={{marginRight: '10px'}} >编辑</NormalButton>
          <NormalButton onClick={deleteAction.bind(null, model)} >删除</NormalButton>
        </div>);
      }
    }
  ];
}
