/**
 * Created by isaac on 2016/3/23.
 */
var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
  category         : String, //分类
  title            : String, //标题
  is_top           : Boolean, //是否置顶
  banner           : String, //banner的url
  thumbnail        : String, //缩略图url
  description      : String, //描述
  url              : String, //详情url
  summary          : String,
  recommend_recipe : {type: Boolean, default: false},
  is_lesson        : {type: Boolean, default: false},
  create_time      : {type: Number, default: function(){return new Date().getTime();}},
  deleted          : {type: Boolean, default: false}
});

module.exports = function(mongoose) {
    return mongoose.model('Message', MessageSchema);
};
