/**
 * Created by isaac on 15/10/28.
 */

module.exports = function (app, db, adminDB) {

    require('./cloth')(app, db, adminDB);
    require('./credit')(app, db, adminDB);
    require('./device')(app, db, adminDB);
    require('./feedback')(app, db, adminDB);
    require('./weight')(app, db, adminDB);
    require('./user')(app, db, adminDB);
    require('./message')(app, db, adminDB);
    require('./recipe')(app, db.adminDB);
};
