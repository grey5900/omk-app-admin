/*
 * Copyright(c) omk 2016
 * Filename: recipe.js
 * Author  : Lin Chen <lc@omk.io>
 * Create  : 星期五, 12 八月 2016.
 */
const FETCH = 'uhs/recipe/FETCH_ALL';
const FETCH_SUCCESS = 'uhs/recipe/FETCH_ALL_SUCCESS';
const FETCH_FAIL = 'uhs/recipe/FETCH_ALL_FAIL';

const CREATE = 'uhs/recipe/CREATE';
const CREATE_SUCCESS = 'uhs/recipe/CREATE_SUCCESS';
const CREATE_FAIL = 'uhs/recipe/CREATE_FAIL';

const UPDATE = 'uhs/recipe/UPDATE';
const UPDATE_SUCCESS = 'uhs/recipe/UPDATE_SUCCESS';
const UPDATE_FAIL = 'uhs/recipe/UPDATE_FAIL';

const DELETE = 'uhs/recipe/DELETE';
const DELETE_SUCCESS = 'uhs/recipe/DELETE_SUCCESS';
const DELETE_FAIL = 'uhs/recipe/DELETE_FAIL';

const initialState = {
  loading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH:
    case CREATE:
    case UPDATE:
    case DELETE:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUCCESS:
    case UPDATE_SUCCESS:
    case DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        all: action.result.data
      };
    case FETCH_FAIL:
    case CREATE_FAIL:
    case UPDATE_FAIL:
    case DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.msg
      };
    default:
      return state;
  }
}

export function listRecipe(params, callback) {
  return (dispatch) => {
    dispatch({
      types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
      promise: (client, ctx) => client.get('/recipe/list', {...ctx, params})
    }).then(callback);
  };
}


export function createRecipe(data, callback) {
  return (dispatch) => {
    dispatch({
      types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
      promise: (client, ctx) => client.post('/recipe/add', {...ctx, data})
    }).then(callback);
  };
}

export function updateRecipe(data, callback) {
  return (dispatch) => {
    dispatch({
      types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
      promise: (client, ctx) => client.post('/recipe/update', {...ctx, data})
    }).then(callback);
  };
}

export function deleteRecipe(id, callback) {
  return (dispatch) => {
    dispatch({
      types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
      promise: (client, ctx) => client.post('/recipe/remove', {...ctx, data: {id}})
    }).then(callback);
  };
}
