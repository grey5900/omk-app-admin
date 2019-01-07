/**
 * Created by isaac on 2016/4/3.
 */
import config from '../../config';

export default function list(req, params, context) {
  const {db} = context;
  const Cloth = db.model('Cloth');

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
    Cloth.count(args, (error, count) => {
      if (error) {
        reject({msg: error.message});
      } else {
        if (count === 0) {
          resolve({
            code: config.code.success,
            data: {
              total: 0,
              clothes: []
            }
          });
        } else {
          Cloth.find(args)
            .skip(skip)
            .limit(limit)
            .populate('user')
            .exec((err, docs) => {
              if (err || !docs) {
                reject({msg: '查找失败！'});
              } else {
                resolve({
                  code: config.code.success,
                  data: {
                    total: count,
                    clothes: docs
                  }
                });
              }
            });
        }
      }
    });
  });
}
