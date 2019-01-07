/**
 * Created by isaac on 16/8/13.
 */
var mongoose = require('mongoose');

var HelpSchema = mongoose.Schema({
  list         : [
    {
      title: String,
      url: String
    }
  ],
  create_time   : {type: Number, default: function() { return new Date().getTime(); } },
  deleted      : { type: Boolean, default: false }
});

module.exports = mongoose.model('Help', HelpSchema);
