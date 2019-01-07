/**
 * Created by isaac on 2016/4/3.
 */
import React from 'react';
import {Avatar, NormalButton} from 'components';
const style = {
  whiteSpace: 'nowrap'
};

export function columnCreator(editAction, deleteAction) {
  return [
    {
      name: '编号', field: '$index', style, width: 50
    },
    {
      name: '分类', field: 'category', style
    },
    {
      name: '标题', field: 'title', style, width: 200
    },
    {
      name: '置顶', style, width: 50, display: (model) => model.is_top ? '是' : '否'
    },
    {
      name: '缩略图', style, display: ({thumbnail}) => <Avatar src={thumbnail} style={{height: '100px'}} />
    },
    {
      name: '描述', field: 'description', width: 300
    },
    {
      name: '文章地址', style, width: 80,
      display: ({url}) => <a href={url} onClick={(event) => event.preventDefault() && window.open(url)} >详情</a>
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
