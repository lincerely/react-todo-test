/*
 * todos.jsx
 * Copyright (C) 2018 lincerely <lincerely@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

const {ActionTypes} = window.App;
const { List, Record } = Immutable;


const TodoRecord = Record({
	id: undefined,
	title: undefined,
	completed: false
});

// logic from Todo App
const _findIdxById = (todos, id) => todos.findIndex((todo) => todo.id === id);

const _createTodo = (todos, title) => 
	todos.push( new TodoRecord({
		id: todos[todos.length-1] ? todos[todos.length-1].id + 1 : 0,
		title,
		completed:false
	}));

const _updateTodo = (todos, id, title) => 
	todos.setIn([ _findIdxById(todos, id), 'title' ], title);

const _deleteTodo = (todos, id) => 
	todos.delete( _findIdxById(todos, id));

const _toggleTodo = (todos, id, completed) => 
	todos.setIn([ _findIdxById(todos, id), 'completed' ], completed);

window.App.reducers.todos = (state = new List(), action) => {
	switch (action.type) {
		case ActionTypes.LOAD_TODOS_SUCCESS:
			return  new List(action.todos).map((todo) => new TodoRecord(todo));
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
};

