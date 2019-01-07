/**
 * Created by isaac on 16/8/13.
 */
import config from '../../config';

export default function (req, params, context) {
  const {db} = context;
  const Help = db.model('Help');
  return new Promise((resolve, reject) => {
    const help = new Help(req.body);
    help.save((error) => {
      if (error) {
        console.log(error);
        reject({msg: '创建失败!'});
      } else {
        resolve({code: config.code.success, data: help});
      }
    });
  });
}
