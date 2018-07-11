/*
 * TodoList.jsx
 * Copyright (C) 2018 lincerely <lincerely@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

const { TodoItem, TodoStore, TodoReduxActions } = window.App;
const { Container } = FluxUtils;
const { connect } = ReactRedux;

class TodoListContainer extends React.Component {
	
	/*
	constructor(props: any) {
		super(props);

		this.state = {
			todos: [],
			userId: 1,
			username: "Guest"
		};
	}
	static getStores() {
		return [TodoStore];
	}

	static calculateState(prevState) {
		return {
			todos: TodoStore.getState(),
		};
	}
	*/

	render() {
		return (
		
			<TodoList 
			todos={this.props.todos} 
			onToggleTodo={ this.props.toggleTodo }
			onUpdateTodo={ this.props.updateTodo }
			onDeleteTodo={ this.props.deleteTodo }/>
		);
	}


}

window.App.TodoListContainer = connect(
	(state) => ({ todos: state.todos}),
	{
		updateTodo: TodoReduxActions.updateTodo,
		toggleTodo: TodoReduxActions.toggleTodo,
		deleteTodo: TodoReduxActions.deleteTodo
	}
)(TodoListContainer);

class TodoList extends React.Component {
  constructor(props: any) {
    super(props)

  }

  render() {

		const { todos, onDeleteTodo, onToggleTodo, onUpdateTodo } = this.props;

		const todoElements = todos.map((todo) => (
			<TodoItem 
				id={todo.id}
				title={todo.title}
				completed={todo.completed}
				onDelete={() => onDeleteTodo && onDeleteTodo(todo.id) }
				onToggle={(completed) => onToggleTodo && onToggleTodo(todo.id, completed) }
				onSubmitEditing={(title) => onUpdateTodo && onUpdateTodo(todo.id, title) }
			/>
		));

    return (
		<ul class="list-group list-group-flush">
			{todoElements}
		</ul>
    );
  }
}
window.App.TodoList = TodoList;

TodoList.defaultProps = {
	todos:[],
	onDeleteTodo:null,
	onToggleTodo:null,
	onUpdateTodo:null,

}
