/**
 * Created by isaac on 16/5/30.
 */

import {listGenerator} from '../../lib/util';

export default function list(req, params, context) {
  const {db} = context;
  const Weight = db.model('Weight');
  const args = {source: {$ne: 1}};
  return listGenerator(req, Weight, [args], 'user');
}
