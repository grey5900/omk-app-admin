/**
 * Created by isaac on 16/6/12.
 */

import config from '../../config';

export default function growth(req, params, context) {
  const {db} = context;
  const Patient = db.model('User');
  return new Promise((resolve, reject) => {
    Patient.mapReduce({
      query: {source: {$ne: 1}},
      map: function () {
        var date = new Date(this.create_time);
        emit(`${date.getFullYear()}-${date.getMonth() + 1}`, 1);
      },
      reduce: (month, quants) => {
        return Array.sum(quants);
      }
    }, (error, results) => {
      if (error) {
        console.log(error);
        reject({msg: '查找失败!'});
      } else {
        resolve({
          code: config.code.success,
          data: results
        });
      }
    });
  });
}
