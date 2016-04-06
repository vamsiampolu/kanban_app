import AltContainer from 'alt/AltContainer';
import React,{Component} from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import LanesActions from '../actions/LanesActions';
import Editable from './Editable.jsx'
import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteTarget = {
	hover(targetProps,monitor) {
		debugger;
		const targetId = targetProps.lane.id;
		const sourceProps = monitor.getItem();
		const sourceId = sourceProps.id;

		if(!targetProps.lane.notes.length) {
			if(!targetProps.lane.notes.length) {
				LanesActions.attachToLane({
					laneid:targetProps.lane.id,
					noteid:sourceId
				})
			}
		}
	}
};

@DropTarget(ItemTypes.NOTE,noteTarget,(connect) => ({
	connectDropTarget:connect.dropTarget()
}))
export default class Lane extends Component {
	constructor(props) {
		super(props);
		const id = props.lane.id;
		this.addNote = this.addNote.bind(this,id);
		this.editNote = this.editNote.bind(this);
		this.deleteNote = this.deleteNote.bind(this,id);
		this.editName = this.editName.bind(this,id);
	}

	render(){
		const {lane,connectDropTarget, ...props} = this.props;
		return (connectDropTarget(
			<div {...props}>
				<div className="lane-header">
					<div className="lane-add-note">
						<button onClick={this.addNote}>+</button>
					</div>
					<Editable className="lane-name" value={lane.name} onEdit={this.editName}/>
				</div>
				<AltContainer stores={[NoteStore]} inject={ { notes:NoteStore.get(lane.notes)} } >
					<Notes onEdit={this.editNote} onDelete={this.deleteNote}/> 
				</AltContainer>
			</div>
		));
	}

	editName(id,name) {
		console.log('The lane is',id,name);
		name?LanesActions.update({laneid:id,name}):LanesActions.delete(id);
	}

	addNote(laneid) {
		console.log('the lane id is',laneid);
		NoteActions.create({task:'New task'});
		LanesActions.attachToLane({'laneid':laneid});
	}

	editNote(id,task) {
		NoteActions.update({id,task});
	}

	deleteNote(laneid,noteid) {
		LanesActions.detachFromLane({laneid,noteid});
		NoteActions.delete(noteid);
	}
}