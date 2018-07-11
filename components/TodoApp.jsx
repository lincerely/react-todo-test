/*
 * TodoApp.jsx
 * Copyright (C) 2018 lincerely <lincerely@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

const {
	TodoHeaderContainer,
	CreateTodoFieldContainer,
	TodoListContainer,
	TodoItem,
	TodoReduxActions,
	TodoStore,
} = window.App;

const { connect } = ReactRedux;

class TodoApp extends React.Component {

	componentDidMount() {
    	this.props.loadTodos();
	}
	render() {
		return (
			<div class="card">
				<div class="card-header">
					<TodoHeaderContainer/>
					<CreateTodoFieldContainer/>
				</div>
				<TodoListContainer/> 
			</div>
		);
	}

}
window.App.TodoApp = connect(undefined, {
	loadTodos: TodoReduxActions.loadTodos
})(TodoApp);
