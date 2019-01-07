const LOAD = 'uhs/help/LOAD';
const LOAD_SUCCESS = 'uhs/help/LOAD_SUCCESS';
const LOAD_FAIL = 'uhs/help/LOAD_FAIL';

const ADD = 'uhs/help/ADD';
const ADD_SUCCESS = 'uhs/help/ADD_SUCCESS';
const ADD_FAIL = 'uhs/help/ADD_FAIL';

const UPDATE = 'uhs/help/UPDATE';
const UPDATE_SUCCESS = 'uhs/help/UPDATE_SUCCESS';
const UPDATE_FAIL = 'uhs/help/UPDATE_FAIL';

const initialState = {
  loaded: false
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
    case ADD:
    case UPDATE:
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
    case ADD_FAIL:
    case UPDATE_FAIL:
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

export function getHelp(callback) {
  return (dispatch) => {
    dispatch({
      types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
      promise: (client, ctx) => client.get('/help/current', ctx),
    }).then(callback);
  };
}

export function updateHelp(data, callback) {
  return (dispatch) => {
    dispatch({
      types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
      promise: (client, ctx) => client.post('/help/update', {...ctx, data}),
    }).then(callback);
  };
}

export function addHelp(data, callback) {
  return (dispatch) => {
    dispatch({
      types: [ADD, ADD_SUCCESS, ADD_FAIL],
      promise: (client, ctx) => client.post('/help/add', {...ctx, data}),
    }).then(callback);
  };
}
