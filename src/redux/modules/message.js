/**
 * Created by isaac on 16/5/22.
 */
const FETCH = 'uhs/message/FETCH_ALL';
const FETCH_SUCCESS = 'uhs/message/FETCH_ALL_SUCCESS';
const FETCH_FAIL = 'uhs/message/FETCH_ALL_FAIL';

const CREATE = 'uhs/message/CREATE';
const CREATE_SUCCESS = 'uhs/message/CREATE_SUCCESS';
const CREATE_FAIL = 'uhs/message/CREATE_FAIL';

const UPDATE = 'uhs/message/UPDATE';
const UPDATE_SUCCESS = 'uhs/message/UPDATE_SUCCESS';
const UPDATE_FAIL = 'uhs/message/UPDATE_FAIL';

const DELETE = 'uhs/message/DELETE';
const DELETE_SUCCESS = 'uhs/message/DELETE_SUCCESS';
const DELETE_FAIL = 'uhs/message/DELETE_FAIL';

const ONE = 'uhs/message/ONE';
const ONE_SUCCESS = 'uhs/message/ONE_SUCCESS';
const ONE_FAIL = 'uhs/message/ONE_FAIL';

const initialState = {
  loading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH:
    case CREATE:
    case UPDATE:
    case DELETE:
    case ONE:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUCCESS:
    case UPDATE_SUCCESS:
    case DELETE_SUCCESS:
    case ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        all: action.result.data
      };
    case FETCH_FAIL:
    case CREATE_FAIL:
    case UPDATE_FAIL:
    case DELETE_FAIL:
    case ONE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.msg
      };
    default:
      return state;
  }
}

export function listMessage(params, callback) {
  return (dispatch) => {
    dispatch({
      types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
      promise: (client, ctx) => client.get('/message/list', {...ctx, params})
    }).then(callback);
  };
}


export function createMessage(data, callback) {
  return (dispatch) => {
    dispatch({
      types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
      promise: (client, ctx) => client.post('/message/add', {...ctx, data})
    }).then(callback);
  };
}

export function updateMessage(data, callback) {
  return (dispatch) => {
    dispatch({
      types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
      promise: (client, ctx) => client.post('/message/update', {...ctx, data})
    }).then(callback);
  };
}

export function deleteMessage(id, callback) {
  return (dispatch) => {
    dispatch({
      types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
      promise: (client, ctx) => client.post('/message/remove', {...ctx, data: {id}})
    }).then(callback);
  };
}

export function getMessage(id, callback) {
  return (dispatch) => {
    dispatch({
      types: [ONE, ONE_SUCCESS, ONE_FAIL],
      promise: (client, ctx) => client.get('/message/one', {...ctx, params: {id}})
    }).then(callback);
  };
}
