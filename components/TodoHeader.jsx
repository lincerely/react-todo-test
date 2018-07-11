/*
 * TodoHeader.jsx
 * Copyright (C) 2018 lincerely <lincerely@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

const { TodoStore, TodoActions } = window.App;
const { Container } = FluxUtils;
const { connect } = ReactRedux;

class TodoHeaderContainer extends React.Component {

	/*
	static getStores() {
		return [TodoStore];
	}

	static calculateState(prevState) {
		return {
			todos: TodoStore.getState(),
		};
	}
	*/

	constructor(props: any) {
		super(props);

		this.state = {
			todos: [],
			userId: 1,
			username: "Guest"
		};
	}

	componentDidMount() {
			fetch('http://jsonplaceholder.typicode.com/users?id='+this.state.userId)
			.then((response) => response.json())
			.then((user) => this.setState({username: user[0].username}));

	}

	render(){
		return (
			<TodoHeader
				username={ this.state.username }
				todoCount={ this.props.todos.filter((todo) => !todo.completed).size }
			/>
		);
	}
}

window.App.TodoHeaderContainer = connect( 
	(state) => ({ todos: state.todos })
)(TodoHeaderContainer);

class TodoHeader extends React.Component {
	constructor(props: any) {
		super(props)

	}

	render() {
		const {title, username, todoCount} = this.props;
		return (
			<div>
			<h1 class="card-title">{title}</h1>
			<p class="card-text">Hello, {username}: <b>You have {todoCount} todos.</b></p>
			</div>
		);
	}
}
window.App.TodoHeader = TodoHeader;

//TodoHeader.propTypes = {
//  title: React.PropTypes.string,
//  username: React.PropTypes.string,
//  todoCount: React.PropTypes.number
//};

TodoHeader.defaultProps = {
	title: 'Todo List',
	username: 'Guest',
	todoCount: 0
};
