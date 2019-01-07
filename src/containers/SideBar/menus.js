/**
 * Created by yons on 16/4/6.
 */
import React from 'react';
import {Icon} from 'components';
const style = {marginRight: 0};
// 'superadmin', 'admin', 'director', 'doctor'

export default [
  {
    header: '血透',
    menus: [
      // {
      //   icon: <Icon className="dashboard big" style={style} />,
      //   link: '/dashboard',
      //   name: '首页'
      // },
      {
        icon: <Icon className="user big" style={style} />,
        link: '/patients',
        name: '患者'
      },
      {
        icon: <Icon className="filter big" style={style} />,
        link: '/clothes',
        name: '衣物'
      },
      {
        icon: <Icon className="calendar big" style={style} />,
        link: '/weights',
        name: '体重'
      },
      {
        icon: <Icon className="mobile big" style={style} />,
        link: '/devices',
        name: '设备'
      },
    ]
  },
  {
    header: '设置',
    menus: [
      // {
      //   icon: <Icon className="browser big" style={style} />,
      //   link: '/feedbacks',
      //   name: '反馈'
      // },
      {
        icon: <Icon className="comments big" style={style} />,
        link: '/messages',
        name: '消息'
      },
      {
        icon: <Icon className="browser big" style={style} />,
        link: '/recipes',
        name: '食谱'
      },
      {
        icon: <Icon className="help big" style={style} />,
        link: '/help',
        name: '帮助'
      }
    ]
  }
];
