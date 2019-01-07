/**
 * Created by isaac on 2016/4/3.
 */
import config from '../../config';
import url from 'url';
import auth from '../../lib/auth';
import moment from 'moment';

var _updateToken = function (userID) {

  var expires = moment().add(7, 'days').valueOf();
  return auth.jwtEncode(
    {
      iss: userID,
      exp: expires
    });
};

export default function login(req, params, context) {
  const {adminDB} = context;
  const Admin = adminDB.model('User');

  return new Promise((resolve, reject) => {

    const obj = url.parse(req.url, true);
    var email = req.body.email || obj.email;
    var password = req.body.password || parsed_url.password;

    if (email && password) {

      Admin.findOne({email}, (error, doc) => {

        if (doc) {
          if (doc.validPassword(password)) {
            doc.password = null;
            resolve({
              code: config.code.success,
              user: doc,
              access_token: _updateToken(doc.id)
            })
          } else {
            reject({msg: '密码错误!'});
          }
        } else {
          reject({msg: '邮箱不存在!'});
        }
      });
    } else {
      reject({msg: '缺少参数!'});
    }
  });
}
