/**
 * Created by isaac on 16/5/30.
 */
import config from '../../config';

export default function remove(req, params, context) {
  const {db} = context;
  const Message = db.model('Message');

  return new Promise((resolve, reject) => {
    const {id} = req.body;
    Message.findOneAndRemove({_id: id}, (error) => {
      if (error) {
        console.log(error);
        reject({msg: '删除失败!'});
      } else {
        resolve({
          code: config.code.success
        })
      }
    });
  });
}

