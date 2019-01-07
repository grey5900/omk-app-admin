/**
 * Created by isaac on 16/5/31.
 */

import config from '../../config';
import {exportSummary} from '../../lib/excel';

function loop(reject, resolve, Cloth, Weight, patients, result) {
  if (patients.length > 0) {
    var patient = patients[0];
    Cloth.count({user: patient})
      .exec((error, clothCount) => {
        if (error) {
          console.log(error);
          reject({msg: 'search cloth error!'});
        } else {
          Weight.count({user: patient})
            .exec((err, weightCount) => {
              if (err) {
                console.log(err);
                reject({msg: 'search weight error!'});
              } else {
                Weight.findOne({user: patient}, {}, {sort: {create_time: -1}}, (error, weight) => {
                  if (error) {
                    console.log(error);
                    reject({msg: 'find weight error!'});
                  } else {
                    if (weight) {
                      var date = new Date(weight.create_time);
                      result.push([patient.name, patient.mobile, clothCount, weightCount,'' , `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`]);
                    } else {
                      result.push([patient.name, patient.mobile, clothCount, weightCount,'' ,'']);
                    }
                    // then next
                    loop(reject, resolve, Cloth, Weight, patients.slice(1), result);
                  }
                });
              }
            });
        }
      });
  } else {
    resolve((res) => {
      exportSummary(res, result);
    });
  }
}

export default function summary(req, params, context) {
  const {db} = context;
  const Patient = db.model('User');
  const Cloth = db.model('Cloth');
  const Weight = db.model('Weight');
  return new Promise((resolve, reject) => {
    Patient.find({source: {$ne: 1}}, (error, docs) => {
      if (error) {
        console.log(error);
        reject({msg: '查找失败!'});
      } else {
        loop(reject, resolve, Cloth, Weight, docs, []);
      }
    });
  });
}
