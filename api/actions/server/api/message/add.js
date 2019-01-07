/**
 * Created by isaac on 16/5/30.
 */

import config from '../../config';

export default function add(req, params, context) {
  const {db} = context;
  const Message = db.model('Message');

  return new Promise((resolve, reject) => {
    const info = req.body;
    const message = new Message(info);
    message.save((error) => {
      if (error) {
        console.log(error);
        reject({msg: '创建失败!'});
      } else {
        resolve({
          code: config.code.success,
          data: message
        })
      }
    });
  });
}

