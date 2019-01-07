/**
 * Created by isaac on 11/2/15.
 */
var config = require('../config');
var auth = require('../lib/auth');

module.exports = function (app, db, adminDB) {

    var Credit = db.model('CreditRecord');

    app.get('/api/credit/all',
        auth.jwtAuth(adminDB),
        function (req, res) {

        Credit.find({})
            .select('-__v')
            .exec(function (error, docs) {

                if (error) {
                    res.send({
                        code: -1,
                        msg: error.message
                    })
                }else{
                    res.send({
                        code: config.code.success,
                        credits: docs
                    })
                }
            })
    });
};