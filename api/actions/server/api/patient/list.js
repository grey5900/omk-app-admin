/**
 * Created by isaac on 2016/4/3.
 */

import config from '../../config';

export default function list(req, params, context) {
  const {db} = context;
  const Patient = db.model('User');

  return new Promise((resolve, reject) => {

    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    if (!skip) {
      skip = 0;
    }
    if (!limit) {
      limit = 20;
    }
    const args = {source: {$ne: 1}};
    Patient.count(args, (error, count) => {
      if (error) {
        reject({msg: error.message});
      } else {
        if (count === 0) {
          resolve({
            code: config.code.success,
            data: {
              total: 0,
              patients: []
            }
          });
        } else {
          Patient.find(args)
            .select('-__v -password')
            .skip(skip)
            .limit(limit)
            .exec((err, docs) => {
              if (err || !docs) {
                reject({msg: '查找失败！'});
              } else {
                resolve({
                  code: config.code.success,
                  data: {
                    total: count,
                    patients: docs
                  }
                });
              }
            });
        }
      }
    });
  });
}
