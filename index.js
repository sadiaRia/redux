const redux = require('redux');
const createStore = redux.createStore;
const BUY_Cake = 'BUY_CAKE';

//action
function buyCake() {
  return {
    type: BUY_Cake,
    info: 'First Redux Action'
  }
}

//reducers 
//(prevState,action) => newState

const initialState = {
  numOfCake: 10
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case BUY_Cake: return {
      ...state,
      numOfCake: state.numOfCake - 1
    }
    default: return state
  }
}

//store
const store = createStore(reducers)
console.log('initial State',store.getState());
const unsubscribe = store.subscribe(()=>console.log('updated State ', store.getState()));
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
unsubscribe()