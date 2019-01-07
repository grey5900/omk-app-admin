/**
 * Created by isaac on 16/8/13.
 */
import config from '../../config';

export default function (req, params, context) {
  const {db} = context;
  const Help = db.model('Help');
  return new Promise((resolve, reject) => {
    Help.findOne({})
      .sort({create_time: -1})
      .exec(function (error, doc) {
        if (error) {
          console.log(error);
          reject({msg: '查询失败!'});
        } else {
          resolve({code: config.code.success, data: doc});
        }
      });
  });
}
