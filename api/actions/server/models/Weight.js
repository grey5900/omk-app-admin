/**
 * Created by isaac on 8/26/15.
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var WeightSchema = mongoose.Schema({
  user         : {type: ObjectId, ref: 'User'},
  local_id     : String,
  weight       : Number,
  type         : Number, //0: before, 1: after 2: daily
  cloth        : [String],
  cloth_weight : Number,
  pure_weight  : Number,
  comment      : String,

  water_mass   : Number,
  high_blood_pressure: Number,
  low_blood_pressure: Number,
  heart_rate   : Number,

  create_time  : Number,
  deleted      : { type: Boolean, default: false }
});

module.exports = function (mongoose) {

    return mongoose.model('Weight', WeightSchema);
};