const redux = require('redux');
const createStore = redux.createStore;
const BUY_Cake = 'BUY_CAKE';
const combineReducers = redux.combineReducers;
const BUY_IceCream = "BUY_ICECREAM";
//action
function buyCake() {
  return {
    type: BUY_Cake,
    info: 'First Redux Action'
  }
}

function buyIceCream() {
  return {
    type: BUY_IceCream,
    info: 'First Redux Action'
  }
}


//reducers 
//(prevState,action) => newState

// const initialState = {
//   numOfCake: 10,
//   numOfIceCream: 10
// };
const CakeInitialState = {
  numOfCake: 10,
};
const IceCreamInitialState = {
  numOfIceCream: 10
};



const CakeReducers = (state = CakeInitialState, action) => {
  switch (action.type) {
    case BUY_Cake: return {
      ...state,
      numOfCake: state.numOfCake - 1
    }
    default: return state
  }
}


const IceCreamReducers = (state = IceCreamInitialState, action) => {
  switch (action.type) {
    case BUY_IceCream: return {
      ...state,
      numOfIceCream: state.numOfIceCream - 1
    }

    default: return state
  }
}

//combine both reducer
const rootReducer = combineReducers({
  cake: CakeReducers,
  iceCream: IceCreamReducers
})

//store
const store = createStore(rootReducer)
console.log('initial State', store.getState());
const unsubscribe = store.subscribe(() => console.log('updated State ', store.getState()));
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe()