/**
 * Created by isaac on 16/5/30.
 */

const LOAD = 'uhs/cloth/LOAD';
const LOAD_SUCCESS = 'uhs/cloth/LOAD_SUCCESS';
const LOAD_FAIL = 'uhs/cloth/LOAD_FAIL';

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
        loaded: true,
        loading: false,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.cloth && globalState.cloth.loaded;
}

function _load(params) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client, ctx) => client.get('/cloth/list', {...ctx, params}),
  };
}

export function load(params, callback) {
  return (dispatch) => {
    dispatch(_load(params)).then(callback);
  };
}
