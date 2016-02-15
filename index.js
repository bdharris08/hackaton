import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import DevTools from './containers/DevTools'

const store = configureStore()

render(
  <Provider store={store}>
  	<div>
    	<App store={store} />
    	<DevTools />
	</div>
  </Provider>,
  document.getElementById('root')
)
