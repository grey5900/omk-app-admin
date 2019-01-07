/**
 * Created by chris on 16/3/8.
 */
import Alert from 'react-s-alert';
const FETCH = 'uhs/admin/FETCH';
const FETCH_SUCCESS = 'uhs/admin/FETCH_SUCCESS';
const FETCH_FAIL = 'uhs/admin/FETCH_FAIL';

const CREATE = 'uhs/admin/CREATE';
const CREATE_SUCCESS = 'uhs/admin/CREATE_SUCCESS';
const CREATE_FAIL = 'uhs/admin/CREATE_FAIL';

const CHANGE_PASSWORD = '/uhs/admin/CHANGE_PASSWORD';
const CHANGE_PASSWORD_SUCCESS = '/uhs/admin/CHANGE_PASSWORD_SUCCESS';
const CHANGE_PASSWORD_FAIL = '/uhs/admin/CHANGE_PASSWORD_FAIL';

const UPDATE_ROLE = '/uhs/admin/UPDATE_ROLE';
const UPDATE_ROLE_SUCCESS = '/uhs/admin/UPDATE_ROLE_SUCCESS';
const UPDATE_ROLE_FAIL = '/uhs/admin/UPDATE_ROLE_FAIL';

const DELETE_ROLE = '/uhs/admin/DELETE_ROLE';
const DELETE_ROLE_SUCCESS = '/uhs/admin/DELETE_ROLE_SUCCESS';
const DELETE_ROLE_FAIL = '/uhs/admin/DELETE_ROLE_FAIL';

const RESET_PASSWORD = '/uhs/admin/RESET_PASSWORD';
const RESET_PASSWORD_SUCCESS = '/uhs/admin/RESET_PASSWORD_SUCCESS';
const RESET_PASSWORD_FAIL = '/uhs/admin/RESET_PASSWORD_FAIL';

const SEARCH = 'uhs/admin/SEARCH';
const SEARCH_SUCCESS = 'uhs/admin/SEARCH_SUCCESS';
const SEARCH_FAIL = 'uhs/admin/SEARCH_FAIL';

const initialState = {
  loading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH:
    case CHANGE_PASSWORD:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUCCESS:
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.result
      };
    case CREATE:
      return {
        ...state,
        loading: true
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.result
      };
    case SEARCH_FAIL:
    case RESET_PASSWORD_FAIL:
    case UPDATE_ROLE_FAIL:
    case DELETE_ROLE_FAIL:
    case FETCH_FAIL:
    case CREATE_FAIL:
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.msg
      };
    case UPDATE_ROLE:
      return {
        ...state,
        loading: true
      };
    case UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        status: action.result.code
      };
    case DELETE_ROLE:
      return {
        ...state,
        loading: true
      };
    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        status: action.result.code
      };
    case RESET_PASSWORD:
      return {
        ...state,
        loading: true
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        status: action.result.code
      };
    case SEARCH:
      return {
        ...state,
        loading: true
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        search: action.result.data
      };
    default:
      return state;
  }
}

function _load(params) {
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: (client, ctx) => client.get('/admin/all', {...ctx, params}),
  };
}

export function load(params, callback) {
  return (dispatch) => {
    dispatch(_load(params))
      .then((args) => {
        if (callback) {
          callback(null, args);
        }
      });
  };
}

export function _updateAdmin(data) {
  return {
    types: [UPDATE_ROLE, UPDATE_ROLE_SUCCESS, UPDATE_ROLE_FAIL],
    promise: (client, ctx) => client.post('/admin/update', {...ctx, data})
  };
}
export function updateAdmin(data, pageInfo, callback) {
  return (dispatch) => {
    dispatch(_updateAdmin(data))
      .then(() => {
        const {pageIndex, pageSize} = pageInfo;
        dispatch(load({skip: pageIndex * pageSize, limit: pageSize}, (err, response) => {
          if (response && callback) {
            callback(null, response);
          }
        }));
      });
  };
}

export function _createAdmin(data) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client, ctx) => client.post('/admin/register', {...ctx, data})
  };
}

export function createAdmin(data, callback) {
  return (dispatch, getState) => {
    dispatch(_createAdmin(data))
      .then(() => {
        dispatch(load({}, () => {
        }));
        if (callback) {
          callback(null, getState().admin.data);
        }
      });
  };
}

export function _deleteAdmin(data) {
  return {
    types: [DELETE_ROLE, DELETE_ROLE_SUCCESS, DELETE_ROLE_FAIL],
    promise: (client, ctx) => client.post('/admin/remove', {...ctx, data})
  };
}

export function deleteAdmin(data, pageInfo, callback) {
  return (dispatch) => {
    dispatch(_deleteAdmin(data))
      .then(() => {
        const {pageIndex, pageSize} = pageInfo;
        dispatch(load({skip: pageIndex * pageSize, limit: pageSize}, (err, response) => {
          if (response && callback) {
            callback(null, response);
          }
        }));
      });
  };
}

function _forceResetPassword(data) {
  return {
    types: [RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL],
    promise: (client, ctx) => client.post('/admin/forceresetpassword', {...ctx, data}),
  };
}

export function forceResetPassword(data, callback) {
  return (dispatch) => {
    dispatch(_forceResetPassword(data))
      .then((args) => {
        if (callback) {
          callback(null, args);
        }
      });
  };
}

function _searchAdmin(params) {
  return {
    types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
    promise: (client, ctx) => client.get('/admin/search', {...ctx, params}),
  };
}

export function searchAdmin(params, callback) {
  return (dispatch) => {
    dispatch(_searchAdmin(params))
      .then((args) => {
        if (callback) {
          callback(null, args);
        }
      });
  };
}
function _changePassword(data) {
  return {
    types: [CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL],
    promise: (client, ctx) => client.post('/admin/resetpassword', {...ctx, data})
  };
}
export function changePassword(data) {
  return (dispatch) => {
    dispatch(_changePassword(data))
      .then(() => {
        Alert.success('密码修改成功', {
          position: 'bottom-right',
          effect: 'scale',
          timeout: 3000
        });
      });
  };
}
