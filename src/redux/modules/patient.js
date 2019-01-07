/**
 * Created by isaac on 16/2/27.
 */

const LOAD = 'uhs/patient/LOAD';
const LOAD_SUCCESS = 'uhs/patient/LOAD_SUCCESS';
const LOAD_FAIL = 'uhs/patient/LOAD_FAIL';

const LOAD_ALL = 'uhs/patient/LOAD_ALL';
const LOAD_ALL_SUCCESS = 'uhs/patient/LOAD_ALL_SUCCESS';
const LOAD_ALL_FAIL = 'uhs/patient/LOAD_ALL_FAIL';

const LOAD_PATIENT = 'uhs/patient/LOAD_PATIENT';
const LOAD_PATIENT_SUCCESS = 'uhs/patient/LOAD_PATIENT_SUCCESS';
const LOAD_PATIENT_FAIL = 'uhs/patient/LOAD_PATIENT_FAIL';

const UPDATE = 'uhs/patient/UPDATE';
const UPDATE_SUCCESS = 'uhs/patient/UPDATE_SUCCESS';
const UPDATE_FAIL = 'uhs/patient/UPDATE_FAIL';

const COUNT = 'uhs/patient/COUNT';
const COUNT_SUCCESS = 'uhs/patient/COUNT_SUCCESS';
const COUNT_FAIL = 'uhs/patient/COUNT_FAIL';

const SEARCH = 'uhs/patient/SEARCH';
const SEARCH_SUCCESS = 'uhs/patient/SEARCH_SUCCESS';
const SEARCH_FAIL = 'uhs/patient/SEARCH_FAIL';

const INFO = 'uhs/patient/INFO';
const INFO_SUCCESS = 'uhs/patient/INFO_SUCCESS';
const INFO_FAIL = 'uhs/patient/INFO_FAIL';

const EXPORT_ALL = 'uhs/patient/EXPORT_ALL';
const EXPORT_ALL_SUCCESS = 'uhs/patient/EXPORT_ALL_SUCCESS';
const EXPORT_ALL_FAIL = 'uhs/patient/EXPORT_ALL_FAIL';

const GET_GROW = 'uhs/patient/GET_GROW';
const GET_GROW_SUCCESS = 'uhs/patient/GET_GROW_SUCCESS';
const GET_GROW_FAIL = 'uhs/patient/GET_GROW_FAIL';

const initialState = {
  loaded: false
};

export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
    case LOAD_PATIENT:
    case UPDATE:
    case COUNT:
    case SEARCH:
    case LOAD_ALL:
    case INFO:
    case EXPORT_ALL:
    case GET_GROW:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOAD_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        patient: action.result.data
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.result.data
      };
    case COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        count: action.result.data
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        search: action.result.data
      };
    case LOAD_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        allPatients: action.result.data
      };
    case LOAD_ALL_FAIL:
    case UPDATE_FAIL:
    case LOAD_PATIENT_FAIL:
    case COUNT_FAIL:
    case SEARCH_FAIL:
    case INFO_FAIL:
    case EXPORT_ALL_FAIL:
    case GET_GROW_FAIL:
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

export function isLoaded(globalState) {
  return globalState.patient && globalState.patient.loaded;
}

export function isAllLoaded(globalState) {
  return globalState.patient && globalState.patient.allPatients;
}

export function _loadAll() {
  return {
    types: [LOAD_ALL, LOAD_ALL_SUCCESS, LOAD_ALL_FAIL],
    promise: (client, ctx) => client.get('/patient/all', ctx)
  };
}
export function loadAll(callback) {
  return (dispatch) => {
    dispatch(_loadAll()).then(callback);
  };
}

function _load(params) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client, ctx) => client.get('/patient/list', {...ctx, params}),
  };
}

export function load(params, callback) {
  return (dispatch) => {
    dispatch(_load(params)).then(callback);
  };
}

function _loadPatient(params) {
  return {
    types: [LOAD_PATIENT, LOAD_PATIENT_SUCCESS, LOAD_PATIENT_FAIL],
    promise: (client, ctx) => client.get('/patient/one', {...ctx, params}),
  };
}

export function loadPatient(params, callback) {
  return (dispatch) => {
    dispatch(_loadPatient(params))
      .then((args) => {
        if (callback) {
          callback(null, args);
        }
      });
  };
}

function _updatePatient(data) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client, ctx) => client.post('/patient/update', {...ctx, data})
  };
}

export function updatePatient(data, callback) {
  return (dispatch) => {
    dispatch(_updatePatient(data))
      .then(() => {
        if (callback) {
          callback();
        }
      });
  };
}

export function _countPatient() {
  return {
    types: [COUNT, COUNT_SUCCESS, COUNT_FAIL],
    promise: (client, ctx) => client.get('/patient/count', ctx)
  };
}
export function countPatient(callback) {
  return (dispatch) => {
    dispatch(_countPatient())
    .then((args) => {
      if (callback) {
        callback(null, args);
      }
    });
  };
}

export function _searchPatient(params) {
  return {
    types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
    promise: (client, ctx) => client.get('/patient/search', {...ctx, params})
  };
}
export function searchPatient(params, callback) {
  return (dispatch) => {
    dispatch(_searchPatient(params)).then(callback);
  };
}

export function getPatientInfo(id, callback) {
  return (dispatch) => {
    dispatch({
      types: [INFO, INFO_SUCCESS, INFO_FAIL],
      promise: (client, ctx) => client.get('/patient/info', {...ctx, params: {id}})
    }).then(callback);
  };
}

export function exportAll() {
  return {
    types: [EXPORT_ALL, EXPORT_ALL_SUCCESS, EXPORT_ALL_FAIL],
    promise: (client, ctx) => client.get('/patient/summary', {...ctx})
  };
}

export function getPatientGrow(callback) {
  return (dispatch) => {
    dispatch({
      types: [GET_GROW, GET_GROW_SUCCESS, GET_GROW_FAIL],
      promise: (client, ctx) => client.get('/patient/growth', {...ctx})
    }).then(callback);
  };
}
