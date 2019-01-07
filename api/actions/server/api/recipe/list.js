/*
 * Copyright(c) omk 2016
 * Filename: all.js
 * Author  : Lin Chen <lc@omk.io>
 * Create  : 星期五, 12 八月 2016.
 */

import {listGenerator} from '../../lib/util';

export default function list(req, params, context) {
  const {db} = context;
  const Recipe = db.model('Recipe');

  return listGenerator(req, Recipe, null, '');
 }
