/*
 * Copyright(c) omk 2016
 * Filename: update.js
 * Author  : Lin Chen <lc@omk.io>
 * Create  : 星期五, 12 八月 2016.
 */

import config from '../../config';

export default function remove(req, params, context) {
  const {db} = context;
  const Recipe = db.model('Recipe');

  return new Promise((resolve, reject) => {
    const {id, args} = req.body;
    Recipe.findOneAndUpdate({_id: id}, args, (error) => {
      if (error) {
        console.log(error);
        reject({msg: '删除失败!'});
      } else {
        resolve({
          code: config.code.success
        });
      }
    });
  });
}
