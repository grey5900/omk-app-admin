/**
 * Created by isaac on 1/3/16.
 */
import config from '../config';

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateObjectID(str) {
  var exp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  return exp.test(str);
}

function validatePhone(str) {
  var exp = /^1\d{10,10}$/;
  return exp.test(str);
}

function listGenerator(req, Model, extraArgs, populate) {
  return new Promise((resolve, reject) => {
    let skip = parseInt(req.query.skip) || 0;
    let limit = parseInt(req.query.limit) || 20;
    let args = {};
    if (extraArgs) {
      extraArgs.forEach((looper) => {
        if (typeof looper === 'string') {
          let value = req.query[looper];
          if (typeof value !== 'undefined') {
            args[looper] = value;
          }
        } else if (typeof looper === 'object') {
          Object.assign(args, looper);
        } else if (typeof looper === 'function') {
          Object.assign(args, looper(req));
        }
      });
    } else {
      args.deleted = false;
    }
    Model.count(args, (error, count) => {
      if (error) {
        reject({msg: error.message});
      } else {
        if (count === 0) {
          resolve({
            code: config.code.success,
            data: {
              total: 0,
              data: []
            }
          });
        } else {
          Model.find(args)
            .select('-__v')
            .skip(skip)
            .limit(limit)
            .populate(populate)
            .exec((err, docs) => {
              if (err) {
                reject({msg: '查找失败！'});
              } else {
                resolve({
                  code: config.code.success,
                  data: {
                    total: count,
                    data: docs
                  }
                });
              }
            });
        }
      }
    });
  });
}


export default {
  validateEmail,
  validateObjectID,
  validatePhone,
  listGenerator
};
