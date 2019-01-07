/**
 * Created by isaac on 15/10/28.
 */

module.exports = function (app, db, admin_db) {

    require('./models/index')(db, admin_db);
    require('./api/index')(app, db, admin_db);

};