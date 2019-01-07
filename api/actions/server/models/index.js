/**
 * Created by isaac on 15/10/28.
 */

module.exports = function(mongoose, admin_db) {

    require('./Admin')(admin_db);

    require('./Cloth')(mongoose);
    require('./CreditRecord')(mongoose);
    require('./Device')(mongoose);
    require('./Feedback')(mongoose);
    require('./File')(mongoose);
    require('./User')(mongoose);
    require('./Weight')(mongoose);
    require('./Message')(mongoose);
    require('./Recipe')(mongoose);
};
