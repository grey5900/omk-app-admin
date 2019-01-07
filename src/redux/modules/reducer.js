import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';

import auth from './auth';
import {reducer as form} from 'redux-form';
import patient from './patient';
import ui from './ui';
import hospital from './hospital';
import admin from './admin';
import message from './message';
import cloth from './cloth';
import weight from './weight';
import feedback from './feedback';
import device from './device';
import help from './help';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  admin,
  auth,
  cloth,
  device,
  feedback,
  form,
  help,
  patient,
  message,
  ui,
  hospital,
  weight
});
