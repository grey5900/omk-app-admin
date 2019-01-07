/**
 * Created by isaac on 16/5/30.
 */

export function columnCreator() {
  return [
    {
      field: '$index',
      name: '编号',
      width: 50
    },
    {
      field: 'title',
      name: '标题'
    },
    {
      field: 'content',
      name: '内容'
    },
    {
      field: 'channel',
      name: '渠道'
    },
    {
      field: 'user',
      name: '用户'
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
