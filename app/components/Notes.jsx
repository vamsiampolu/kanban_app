'use strict';
import React,{Component} from 'react';
import Editable from './Editable.jsx';
import Note from './Note.jsx'
import LanesActions from '../actions/LanesActions'

export default class Notes extends Component {

	constructor(props) {
		super(props);
		this.renderNote = this.renderNote.bind(this);
	}

	renderNote(note) {
		console.log(this.props.onEdit);
		
		return (<Note onMove={LanesActions.move} id={note.id} key={`note${note.id}`} className="note">
			<Editable value={note.task} 
				onEdit={this.props.onEdit.bind(null,note.id)}
				onDelete={this.props.onDelete.bind(null,note.id)}
			/>
		</Note>);
	}

	render() {
		return (<ul className="notes">
			{this.props.notes.map(this.renderNote)}
			</ul>);
	}

}