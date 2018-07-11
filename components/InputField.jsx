/*
 * InputField.jsx
 * Copyright (C) 2018 lincerely <lincerely@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

const { TodoReduxActions } = window.App;
const { connect } = ReactRedux;

class CreateTodoFieldContainer extends React.Component {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<InputField
				placeholder="create a new todo"
				onSubmitEditing={this.props.createTodo}
			/>
		);
	}
}

window.App.CreateTodoFieldContainer = connect( undefined, {
	createTodo: TodoReduxActions.createTodo
})(CreateTodoFieldContainer);


class InputField extends React.Component {
	constructor(props: any) {
		super(props)
		this.handleKeyDown = this.handleKeyDown.bind(this);

	}

	handleKeyDown(e){
		const { onKeyDown, onSubmitEditing } = this.props;
		const { value } = e.target;
	
		switch (e.keyCode)
		{
			case 13: //enter
				if( value.trim()) {
					onSubmitEditing && onSubmitEditing(value);
				}
				e.target.value = '';
				break;
			case 27:
				e.target.value = '';
				break;
		}
		onKeyDown && onKeyDown(e);
	}

	render() {

		const { placeholder } = this.props;
		return (
				<input 
					type="text" class="form-control" 
					name="todo-input" placeholder={ placeholder }
					onKeyDown={this.handleKeyDown} 
				/>
		);
	}
}

InputField.defaultProps = {
  placeholder: 'create a new todo',
	onSubmitEditing: null,
	onKeyDown: null
}

window.App.InputField = InputField;
