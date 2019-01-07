/**
 * Created by isaac on 16/5/30.
 */
import {listGenerator} from '../../lib/util';

export default function list(req, params, context) {
  const {db} = context;
  const Feedback = db.model('Feedback');

  return listGenerator(req, Feedback, null, '');
}