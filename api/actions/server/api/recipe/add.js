/*
 * Copyright(c) omk 2016
 * Filename: add.js
 * Author  : Lin Chen <lc@omk.io>
 * Create  : 星期五, 12 八月 2016.
 */

import config from '../../config';

export default function add(req, params, context) {
  const {db} = context;
  const Recipe = db.model('Recipe');

  return new Promise((resolve, reject) => {
    const info = req.body;
    const recipe = new Recipe(info);
    recipe.save((error) => {
      if (error) {
        console.log(error);
        reject({msg: '创建失败!'});
      } else {
        resolve({
          code: config.code.success,
          data: recipe
        });
      }
    });
  });
}

