/**
 * Created by isaac on 16/5/30.
 */

const LOAD = 'uhs/weight/LOAD';
const LOAD_SUCCESS = 'uhs/weight/LOAD_SUCCESS';
const LOAD_FAIL = 'uhs/weight/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        current: null,
        error: action.error
      };
    default:
      return state;
  }
}

function _load(params) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client, ctx) => client.get('/weight/list', {...ctx, params}),
  };
}

export function load(params, callback) {
  return (dispatch) => {
    dispatch(_load(params)).then(callback);
  };
}
