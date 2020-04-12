const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleare = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

const intialState = {
  loading: false,
  users: [],
  error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

//Action
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}
const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}

//reducer

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST: return {
      ...state,
      loading: true
    }
    case FETCH_USERS_SUCCESS: return {
      loading: false,
      users: action.payload,
      error: ''
    }
    case FETCH_USERS_FAILURE: return {
      loading: false,
      users: [],
      error: action.payload
    }
    default: return state
  }
}

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest())
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const users = response.data.map(user => user.id)
        dispatch(fetchUsersSuccess(users))
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchUsersFailure(error.message))
      })
  }
}

//store
const store = createStore(reducer, applyMiddleare(thunkMiddleware));
store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())