import {alertError} from 'utils/ui';
import {tokenExpired} from 'redux/modules/auth';
import {push} from 'react-router-redux';

export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const state = getState();
      const token = state.auth.access_token;

      const ctx = {};
      if (token) {
        ctx.$token = token;
      }

      const {promise, types, ...rest} = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});

      const actionPromise = promise(client, ctx);
      actionPromise.then(
        (result) => next({...rest, result, type: SUCCESS}),
        (error) => {
          console.log('handle error:', error);
          const {msg, status, redirect} = error;
          let result = null;
          if (status === 410 || redirect) {
            alertError(msg);
            result = next(tokenExpired()).then(() => {
              next(push(redirect));
            });
          } else {
            alertError(msg || '服务器内部错误!');
            result = next({...rest, error, type: FAILURE});
          }
          return result;
        }
      ).catch((error) => {
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });

      return actionPromise;
    };
  };
}
