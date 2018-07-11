/*
 * TodoStore.jsx
 * Copyright (C) 2018 lincerely <lincerely@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

/* 
 * Store:
 * 	- manage logic behind data
 * 	- listen for action
 * 	- provide listener for view
 * 	- provide getter api
 *
 * 	** No Setter Api is allowed !! **
 */

const { ActionTypes, AppDispatcher } = window.App;
const { ReduceStore } = FluxUtils;

const CHANGE_EVENT = 'CHANGE';

const _emitter = new EventEmitter();

let _todos = [];

// logic from Todo App
const _createTodo = (todos, title) => {

	let id = todos[todos.length-1] ? todos[todos.length-1].id + 1 : 0;

	return [
		...todos,
		{
			id,
			title,
			completed:false
		}
	];
};

const _updateTodo = (todos, id, title) =>{
	const idx = todos.findIndex((todo) => todo.id === id);
	if(idx === -1) return todos;

	const newTodos = [...todos];
	newTodos[idx] = {
		...todos[idx],
		title
	};
	return newTodos;
}

const _deleteTodo = (todos, id) => {
	const idx = todos.findIndex((todo) => todo.id === id);
	if (idx === -1) return todos;
	
	const newTodos = [...todos];
	newTodos.splice(idx, 1);
	return newTodos;
};

const _toggleTodo = (todos, id, completed) => {
	const idx = todos.findIndex((todo) => todo.id === id);
	if (idx === -1) return todos;
	
	const newTodos = [...todos];
	newTodos[idx] = {
		...todos[idx],
		completed
	};
	return newTodos;
};

/*
 * Redux's Store API
 * - store.dispatch(action): action --> reducer --> emit event
 * - store.subscribe(listener): for view to listen
 * - store.getState(): get the only state
 */

class TodoStore extends ReduceStore {
	getInitialState() {
		return [];
	}

	
	reduce( state, action ) {
		switch (action.type) {
			case ActionTypes.LOAD_TODOS_SUCCESS:
				return action.todos;
				break;

			case ActionTypes.CREATE_TODO:
				return _createTodo(state, action.title);
				break;

			case ActionTypes.UPDATE_TODO:
				return _updateTodo(state, action.id, action.title);
				break;

			case ActionTypes.TOGGLE_TODO:
				return _toggleTodo(state, action.id, action.completed);
				break;

			case ActionTypes.DELETE_TODO:
				return _deleteTodo(state, action.id);
				break;

			default:
				return state;

		}
	}
}

window.App.TodoStore = new TodoStore(AppDispatcher);
