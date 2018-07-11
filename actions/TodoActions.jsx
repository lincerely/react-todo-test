/*
 * TodoActions.jsx
 * Copyright (C) 2018 lincerely <lincerely@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

const { ActionTypes, AppDispatcher } = window.App;

window.App.TodoActions = {
	createTodo(title) {
		AppDispatcher.dispatch({
			type: ActionTypes.CREATE_TODO,
			title
		});
	},
	loadTodos() {	
		// http://jsonplaceholder.typicode.com/todos?userId=1
		fetch('http://jsonplaceholder.typicode.com/todos?userId=1')
			.then((response) => response.json())
			.then((todos) => AppDispatcher.dispatch({
				type:ActionTypes.LOAD_TODOS_SUCCESS,
				todos
			}));
	},
	updateTodo(id, title){
		AppDispatcher.dispatch({
			type: ActionTypes.UPDATE_TODO,
			id,
			title
		});
	},
	toggleTodo(id, completed) {
		AppDispatcher.dispatch({
			type: ActionTypes.TOGGLE_TODO,
			id,
			completed
		});
	},
	deleteTodo(id) {
		AppDispatcher.dispatch({
			type: ActionTypes.DELETE_TODO,
			id
		});
	},
};

window.App.TodoReduxActions = {
	createTodo(title) {
		return {
			type: ActionTypes.CREATE_TODO,
			title
		};
	},
	loadTodos() {	
		/*
		 * loadTodos is an async operation
		 * can't return the action immediately
		 * now we return thrunk, which store all opertations and execute later
		 */
		return (dispatch) => {
			// http://jsonplaceholder.typicode.com/todos?userId=1
			fetch('http://jsonplaceholder.typicode.com/todos?userId=1')
				.then((response) => response.json())
				.then((todos) => dispatch({
					type: ActionTypes.LOAD_TODOS_SUCCESS,
					todos
				}));
		};
	},
	updateTodo(id, title){
		return {
			type: ActionTypes.UPDATE_TODO,
			id,
			title
		};
	},
	toggleTodo(id, completed) {
		return {
			type: ActionTypes.TOGGLE_TODO,
			id,
			completed
		};
	},
	deleteTodo(id) {
		return {
			type: ActionTypes.DELETE_TODO,
			id
		};
	},
};
