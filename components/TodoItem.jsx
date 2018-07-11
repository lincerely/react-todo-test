/*
 * TodoItem.jsx
 * Copyright (C) 2018 lincerely <lincerely@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

class TodoItem extends React.Component {
	constructor(props: any) {
		super(props)

		let { title } = this.props;

		this.state = {editable:false, value:title};
		this.toggleEditMode = this.toggleEditMode.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	toggleEditMode() {
		if(!this.state.editable){
			this.setState({value:this.props.title});
		}
		this.setState({ editable: !this.state.editable });
	}

	handleChange(event) {
		this.setState({value:event.target.value});
	}

	handleKeyDown(event) {
		const { onKeyDown, onSubmitEditing } = this.props;
		const { value } = this.state;

		switch (event.keyCode){
			case 27: //esc
			case 13: //enter
				if(value.trim()){
					onSubmitEditing && onSubmitEditing(value);
				}
				event.preventDefault();
				this.toggleEditMode();
				break;
        }
		onKeyDown && onKeyDown(e);
	}

	render() {

		const { id, completed, onDelete, onToggle, title } = this.props;

		let item = this.state.editable ?
				<input 
					type="text" 
					class="form-control" 
					value={this.state.value} 
					onChange={this.handleChange} 
					onKeyDown={this.handleKeyDown}  
					onBlur={this.toggleEditMode}
					autofocus
				/>
			:
				<input 
					type="text" 
					class="form-control form-control-plaintext" 
					onDoubleClick={this.toggleEditMode}
					value={title} 
					readonly
				/>


		return (
			<li key={id} class="list-group-item">
			<div class="input-group">
				<div class="input-group-prepend">
					<div class="input-group-text" style={checkBoxStyle}>
						<input 
							type="checkbox" 
							checked={completed} 
							onChange={() => onToggle && onToggle(!completed)}
						/>
					</div>
				</div>
				{item}
				 <div class="input-group-append">
					<button 
						type="button" 
						class="btn btn-light" 
						onClick={() => onDelete && onDelete()}
					>x</button>
				</div>
			</div>
			</li>
		);
	}
}

window.App.TodoItem = TodoItem;

var checkBoxStyle ={
	background: 'none',
	border: 'none',
};

TodoItem.defaultProps = {
  key: 0,
  title: 'No title',
  completed: false,
	onDelete: null,
	onToggle: null,
	onSubmitEditing: null,
	onKeyDown: null,
};
