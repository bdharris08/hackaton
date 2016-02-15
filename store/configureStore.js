import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

const createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(createLogger()),
    DevTools.instrument()
  )(createStore)

export default function configureStore(initialState) {
  /*const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware, createLogger()),
    DevTools.instrument()
  )*/
  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
