import React,{Component} from 'react';

export default class Editable extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			editing: false
		};

		this.edit = this.edit.bind(this);
		this.renderEdit = this.renderEdit.bind(this);
		this.finishEdit = this.finishEdit.bind(this);
		this.checkEnter = this.checkEnter.bind(this);
		this.renderValue = this.renderValue.bind(this);
	}

	render() {
		const {value,onEdit,...props} = this.props;
		const editing = this.state.editing;
		return (
			<div {...props}>
				{editing? this.renderEdit():this.renderValue()}
			</div>
		);
	}

	renderEdit() {
		return (
			<input type="text" 
				autoFocus={true} 
				defaultValue={this.props.value} 
				onBlur={this.finishEdit} 
				onKeyPress={this.checkEnter}/>
		);
	}

	renderValue(){
		const onDelete = this.props.onDelete;
		return (
			<div onClick={this.edit}>
				<span className="value">{this.props.value}</span>
				{onDelete?this.renderDelete():null}
			</div>
		);
	}

	renderDelete() {
	    return (<button className="delete" onClick={this.props.onDelete}>
	    x</button>);
	}

	edit() {
		this.setState({
			editing:true
		});
	}

	finishEdit(e) {
		this.props.onEdit(e.target.value);
		this.setState({
			editing:false
		});
	}

	checkEnter(e){
		if(e.key === 'Enter') {
			this.finishEdit(e);
		}
	}
}

Editable.propTypes = {
	onEdit:React.PropTypes.func,
	value:React.PropTypes.string,
	onDelete:React.PropTypes.func
};
