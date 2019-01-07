/**
 * Created by isaac on 16/5/30.
 */

import {listGenerator} from '../../lib/util';

export default function list(req, params, context) {
  const {db} = context;
  const Device = db.model('Device');
  const args = {source: {$ne: 1}};
  return listGenerator(req, Device, [args], 'user');
}
