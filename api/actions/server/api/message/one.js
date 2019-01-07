/**
 * Created by isaac on 16/5/31.
 */
import config from '../../config';

export default function one(req, params, context) {
  const {db} = context;
  const Message = db.model('Message');

  return new Promise((resolve, reject) => {
    const {id} = req.query;
    Message.findOne({_id: id}, (error, doc) => {
      if (error) {
        console.log(error);
        reject({msg: '删除失败!'});
      } else {
        resolve({
          code: config.code.success,
          data: doc
        })
      }
    });
  });
}

