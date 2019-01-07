/**
 * Created by isaac on 15/10/28.
 */

var url = require('url');
var auth = require('../lib/auth');
var config = require('../config');
var moment = require('moment');
var util = require('../lib/util');
var excel = require('../lib/excel');

module.exports = function (app, mongoose, adminDB) {

    var Admin = adminDB.model('User');
    var User = mongoose.model('User');
    var Cloth = mongoose.model('Cloth');
    var Weight = mongoose.model('Weight');

    var _updateToken = function (userID) {

        var expires = moment().add(7, 'days').valueOf();
        return auth.jwtEncode(
            {
                iss: userID,
                exp: expires
            });
    };

    app.post('/api/user/register', function (req, res) {

        var parsed_url = url.parse(req.url, true);
        var email = req.body.email || parsed_url.email;
        var password = req.body.password || parsed_url.password;
        if (email && password) {

            Admin.findOne({email: email}, function (error, doc) {
                if (doc) {
                    res.send({
                        code: -1,
                        msg: '邮箱已被注册!'
                    });
                } else {
                    var user = new Admin();
                    user.email = email;
                    user.password = user.generateHash(password);
                    user.save(function (error) {
                        if (error) {
                            res.send({
                                code: -1,
                                msg: '注册失败!'
                            })
                        } else {
                            user.password = null;

                            res.send({
                                code: config.code.success,
                                user: user,
                                access_token: _updateToken(user.id)
                            })
                        }
                    });
                }
            });
        } else {
            res.send({
                code: -1,
                msg: '缺少参数!'
            });
        }
    });
 
    app.get('/api/user/profile', auth.jwtAuth(adminDB),
        function (req, res, next) {

            var input = req.query.input;
            var callback = function (error, user) {

                console.log(input, error, user);

                if (user) {
                    //
                    //
                    Cloth.find({user: user.id})
                        .exec(function (error, clothes) {
                            if (error) {
                                res.send({
                                    code: -1,
                                    msg: 'fail to find clothes!'
                                });
                            }else{
                                Weight.find({user: user.id})
                                    .exec(function (error, weights) {
                                        if (error) {
                                            res.send({
                                                code: -1,
                                                msg: 'failed to find weights'
                                            })
                                        }else{
                                            res.send({
                                                code: config.code.success,
                                                data: {
                                                    user: user,
                                                    clothes: clothes,
                                                    weights: weights
                                                }
                                            })
                                        }
                                    })
                            }
                        });
                } else {
                    res.send({
                        code: -1,
                        msg: '用户不存在!'
                    })
                }
            };

            if (util.validatePhone(input)) {
                console.log('phone');
                //is phone number
                //
                User.findOne({mobile: input})
                    .select('-password -__v')
                    .exec(callback);

            } else if (util.validateObjectID(input)) {
                console.log('id');

                User.findOne({_id: input})
                    .select('-password -__v')
                    .exec(callback);

            } else {
                console.log('name');

                User.findOne({name: input})
                    .select('-password -__v')
                    .exec(callback);
            }
        });

    app.get('/api/user/export', auth.jwtAuth(adminDB),
        function (req, res, next) {

            var input = req.query.input;
            console.log(req.query);

            var callback = function (error, user) {

                console.log(input, error, user);

                if (user) {
                    //
                    //
                    Cloth.find({user: user.id})
                        .exec(function (error, clothes) {
                            if (error) {
                                res.send({
                                    code: -1,
                                    msg: 'fail to find clothes!'
                                });
                            }else{
                                Weight.find({user: user.id})
                                    .exec(function (error, weights) {
                                        if (error) {
                                            res.send({
                                                code: -1,
                                                msg: 'failed to find weights'
                                            })
                                        }else{
                                            excel.export(res, user, clothes, weights);
                                        }
                                    })
                            }
                        });
                } else {
                    res.send({
                        code: -1,
                        msg: '用户不存在!'
                    })
                }
            };

            if (util.validatePhone(input)) {
                console.log('phone');
                //is phone number
                //
                User.findOne({mobile: input})
                    .select('-password -__v')
                    .exec(callback);

            } else if (util.validateObjectID(input)) {
                console.log('id');

                User.findOne({_id: input})
                    .select('-password -__v')
                    .exec(callback);

            } else {
                console.log('name');

                User.findOne({name: input})
                    .select('-password -__v')
                    .exec(callback);
            }
        });

    app.get('/api/user/export_all.xlsx', auth.jwtAuth(adminDB),
        function (req, res, next) {

            User.find({})
                .select('-password -__v')
                .exec(function (error, users) {
                    excel.exportUsers(res, users);
                });
        });

    app.get('/api/user/all', auth.jwtAuth(adminDB),
        function (req, res) {

            User.find({})
                .select('-password -__v')
                .exec(function (error, docs) {

                    if (error) {
                        res.send({
                            code: -1,
                            msg: error.message
                        })
                    } else {
                        res.send({
                            code: config.code.success,
                            users: docs
                        })
                    }
                })
        });
};