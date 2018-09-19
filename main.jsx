/*
 * main.jsx
 * Copyright (C) 2018 lincerely <lincerely@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */
const { createStore, combineReducers, applyMiddleware, compose } = Redux;
const { Provider } = ReactRedux;
const { TodoApp, reducers } = window.App;


const thunkMiddleware = ({ dispatch, getState }) => {
	return (next) => (action) => {
		if (typeof action === 'function') { // is thunk
			return action(dispatch, getState);
		} else {
			// pass it to next middleware
			return next(action);
		}
	};
};

const composedReducer = combineReducers(reducers);
const composedEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	composedReducer,
	composedEnhancers(
		applyMiddleware(thunkMiddleware)
	)
);

ReactDOM.render(
	<Provider store={store}>
		<TodoApp />
	</Provider>,
	document.getElementById('app')
);
