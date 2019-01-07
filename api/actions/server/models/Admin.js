/**
 * Created by isaac on 11/2/15.
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var UserSchema = mongoose.Schema({

    name: String,
    mobile: String,
    email: String,
    password: String,
    stage: Number,
    sex: Number,
    credit: {type: Number, default: 0},
    avatar: {type: ObjectId, ref: 'File'},
    avatar_url: String,
    isAdmin: Boolean,
    birthday: Date,

    //address parts
    area: String,
    address_detail: String,
    zipcode: String,

    create_time: Number,
    update_time: Number
});

// generating a hash
UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = function (mongoose) {

    return mongoose.model('User', UserSchema);
};