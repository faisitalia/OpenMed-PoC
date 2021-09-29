const debug = false

import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './lib/redux/reducers';

const reduxMiddlewares = [thunk];
if (debug) {
	const reduxLogger = createLogger(
		{
			duration: true,
			timestamp: false,
			level: 'log',
			logErrors: true
		});
	reduxMiddlewares.push(reduxLogger);
}

function svelteStoreEnhancer(createStoreApi) {
	return function (reducer, initialState) {
		const reduxStore = createStoreApi(
			reducer, initialState
		);
		return {
			...reduxStore,
			subscribe(fn) {
				fn(reduxStore.getState());

				return reduxStore.subscribe(() => {
					fn(reduxStore.getState());
				});
			}
		}
	}
}

export default createStore(
	reducers,
	undefined,
	compose(svelteStoreEnhancer, applyMiddleware(...reduxMiddlewares))
);
