/**
 * Created by isaac on 16/8/13.
 */
import config from '../../config';

export default function (req, params, context) {
  const {db} = context;
  const Help = db.model('Help');
  return new Promise((resolve, reject) => {
    const {id, args} = req.body;
    Help.findOneAndUpdate({_id: id}, args, (error) => {
      if (error) {
        console.log(error);
        reject({msg: '更新失败!'});
      } else {
        resolve({code: config.code.success});
      }
    });
  });
}
