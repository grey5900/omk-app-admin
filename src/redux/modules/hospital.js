/**
 * Created by isaac on 16/2/28.
 */
/**
 * Created by isaac on 16/2/28.
 */
const FETCH = 'uhs/hospital/FETCH_ALL';
const FETCH_SUCCESS = 'uhs/hospital/FETCH_ALL_SUCCESS';
const FETCH_FAIL = 'uhs/hospital/FETCH_ALL_FAIL';

const initialState = {
  loading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.result.data[0]
      };
    case FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.msg
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.hospital && globalState.hospital.current;
}

export function fetchCurrentHospital() {
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: (client, ctx) => client.get('/hospital/all', ctx)
  };
}
