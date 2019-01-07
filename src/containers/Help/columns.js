/**
 * Created by isaac on 16/8/13.
 */
import React from 'react';

export default function (editAction, deleteAction) {
  return [
    {
      field: '$index', name: '序号'
    },
    {
      field: 'title', name: '标题'
    },
    {
      field: 'url', name: 'URL',
      display: ({url}) => {
        if (url) {
          const str = url.length > 10 ? `${url.substring(0, 10)}...` : url;
          return (<a href={url} onClick={(event) => {
            event.preventDefault();
            window.open(url);
          }} >{str}</a>);
        }
        return '';
      }
    },
    {
      name: '操作',
      width: 166,
      display: (model, index) => {
        return (<div>
          <button className="ui primary button" onClick={editAction.bind(null, model, index)} >编辑</button>
          <button className="ui orange button" onClick={deleteAction.bind(null, model, index)} >删除</button>
        </div>);
      }
    }
  ];
}
