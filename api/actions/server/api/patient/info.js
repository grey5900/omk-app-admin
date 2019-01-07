/**
 * Created by isaac on 16/5/31.
 */

import config from '../../config';

export default function info(req, params, context) {
  const {db} = context;
  const Cloth = db.model('Cloth');
  const Weight = db.model('Weight');

  return new Promise((resolve, reject) => {
    const {id} = req.query;
    Cloth.find({user: id}, (error, clothes) => {
      if (error) {
        console.log(error);
        reject({msg: '查找衣物失败!'});
      } else {
        Weight.find({user: id}, (err, weights) => {
          if (err) {
            console.log(err);
            reject({msg: '查找体重记录失败!'});
          } else {
            resolve({
              code: config.code.success,
              clothes,
              weights
            })
          }
        });
      }
    });
  });
}
