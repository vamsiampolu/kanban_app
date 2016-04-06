import alt from '../libs/alt';
import uuid from 'node-uuid';
import LanesActions from '../actions/LanesActions';
import NoteStore from '../stores/NoteStore';
import update from 'react/lib/update';

class LanesStore {
	constructor() {
		this.bindActions(LanesActions);
		this.lanes = [];
	}

	create(lane) {
		let lanes = this.lanes;
		lane.id = uuid.v4();
		lane.notes = lane.notes || [];
		this.setState({
			lanes:lanes.concat(lane)
		});
	}

	update({laneid,name}) {
		const lanes = this.lanes;
		const targetId = this.findLane(laneid);
		if(targetId < 0) {
			return;
		}
		lanes[targetId].name = name;
		this.setState({lanes});
	}

	delete(id) {
		const lanes = this.lanes;
		const targetId = this.findLane(laneid);
		if(targetId < 0) {
			return;
		}
		this.setState({
	      lanes: lanes.slice(0, targetId).concat(lanes.slice(targetId + 1))
	    });
	}

	attachToLane({laneid,noteid}) {
		debugger;
		if(!noteid) {
			this.waitFor(NoteStore);
			noteid = NoteStore.getState().notes.slice(-1)[0].id;
		}

		const lanes = this.lanes;
		const targetId = this.findLane(laneid);

		if(targetId < 0) {
			return;
		}

		this.removeNote(noteid);

		const lane = lanes[targetId];

		if(lane.notes.indexOf(noteid) === -1) {
			lane.notes.push(noteid);
			this.setState({lanes});
		}
		else {
			console.warn('Already attached note to lane',lanes);
		}
	}

	detachFromLane({laneid,noteid}) {
		const lanes = this.lanes;
		const targetId = this.findLane(laneid);
		if(targetId < 0) {
			return;
		}

		const lane = lanes[targetId];
		const notes = lane.notes;
		const removeIndex = notes.indexOf(noteid);
		if(removeIndex !== -1)	{
			const endOne = removeIndex;
			const startTwo = removeIndex + 1;
			lane.notes = notes.slice(0,endOne).concat(notes.slice(startTwo));
			this.setState({lanes})
		}
		else {
			console.warn('The note could not be detached from the lane because it was not found',lanes);
		}	
	}

	findLane(id) {
		const lanes = this.lanes;
		const laneIndex = lanes.findIndex(lane => lane.id === id);
		if(laneIndex === -1) {
			console.warn('Could not find lane index',lanes,id);
		}
		return laneIndex;
	}

	move({sourceId,targetId}) {
		debugger;
		const lanes = this.lanes;
		const sourceLane = lanes.filter(lane =>(
			lane.notes.indexOf(sourceId) >=0
		))[0];
		const targetLane = lanes.filter(lane => (
				lane.notes.indexOf(targetId) >=0
		))[0];

		const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
		const targetNoteIndex = targetLane.notes.indexOf(targetId);
		if(sourceLane === targetLane) {
			sourceLane.notes = update(sourceLane.notes,{
				$splice:[
					[sourceNoteIndex,1],
					[targetNoteIndex,0,sourceId]
				]
			});
		}
		else {
			sourceLane.notes.splice(sourceNoteIndex,1);
			targetLane.notes.splice(targetNoteIndex,0,sourceId);
		}
		this.setState({lanes})
	}

	removeNote(noteId) {
	    const lanes = this.lanes;
	    const removeLane = lanes.filter((lane) => {
	      return lane.notes.indexOf(noteId) >= 0;
	    })[0];

	    if(!removeLane) {
	      return;
	    }

	    const removeNoteIndex = removeLane.notes.indexOf(noteId);

	    removeLane.notes = removeLane.notes.slice(0, removeNoteIndex).
	      concat(removeLane.notes.slice(removeNoteIndex + 1));
  }
}

export default alt.createStore(LanesStore,'LanesStore');