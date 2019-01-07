/*
 * Copyright(c) omk 2016
 * Filename: Recipe.js
 * Author  : Lin Chen <lc@omk.io>
 * Create  : 星期五, 12 八月 2016.
 */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var RecipeSchema = mongoose.Schema({
  type        : {type: String, enum: ['breakfast', 'meal', 'dessert']},
  detail      : [{type: ObjectId, ref: 'Message'}],
  create_time : {type: Number, default: function() {return new Date().getTime();}},
  deleted     : {type: Boolean, default: false}
});

module.exports = mongoose.model('Recipe', RecipeSchema);
