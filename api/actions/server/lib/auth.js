/**
 * Created by isaac on 15/10/29.
 */
var url = require('url');
var jwt = require('jwt-simple');
var token_secret = 'omk-136f7caa-3067-43ad-9861-a09e37caa6af-veritas';

var jwtEncode = function (data) {
    return jwt.encode(data, token_secret);
};

var jwtDecode = function (data) {
    return jwt.decode(data, token_secret);
};


var jwtAuth = function (db) {

    var UserModel =  db.model('User');

    return function(req, res, next) {

        // Parse the URL, we might need this
        var parsed_url = url.parse(req.url, true);

        /**
         * Take the token from:
         *
         *  - the POST value access_token
         *  - the GET parameter access_token
         *  - the x-access-token header
         *    ...in that order.
         */
        var token = (req.body && req.body.access_token)
            || parsed_url.query.access_token
            || req.headers["x-access-token"];

        if (token) {

            try {
                var decoded = jwtDecode(token);

                if (decoded.exp <= Date.now()) {
                    res.end('Token已过期!', 400);
                }

                UserModel.findById(decoded.iss, function(err, user) {

                    if (!err) {
                        req.user = user;
                        return next()
                    }else{
                        console.log('err----rrr', err, user);
                        res.send({
                            code: 400,
                            msg: '用户不存在!'
                        });
                    }
                })

            } catch (err) {
                console.error(err);
                return next()
            }

        } else {
            return next()
        }
    }
};

var userAuth = function (req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.send({
        code: 401,
        msg: 'Auth failed'
    });
};

module.exports = {
    jwtAuth : jwtAuth,
    jwtEncode: jwtEncode,
    jwtDecode: jwtDecode,
    userAuth : userAuth
};