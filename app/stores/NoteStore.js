import alt from '../libs/alt';
import actions from '../actions/NoteActions';
import uuid from 'node-uuid';

class NoteStore {
	constructor() {
		this.bindActions(actions);
		this.notes = [];
	
		this.exportPublicMethods({
			get: this.get.bind(this)
		});
	}

	create(note) {
		let notes = this.notes;
		note.id = uuid.v4();
		this.setState({
			notes: notes.concat(note)
		});

	}

	update({id,task}) {
		const index = this.findNote(id);
		let notes = this.notes;	
	
		if(index < 0) {
			console.warn('Note could not be found',id);
			return;
		}
		notes[index].task = task;
		this.setState({notes});
	}

	//how are we allowed to use,despite it being a reserved keyword,
	//maybe it makes it a string,
	delete(id) {
		const index = this.findNote(id);
		if(index < 0) {
			console.warn('Note could not be found',id);
		}
		let notes = this.notes;
		const res = notes.slice(0,index).concat(this.notes.slice(index+1));


		this.setState({
			notes:res
		});
	}

	findNote(id) {
		const notes = this.notes;
		return notes.findIndex((note) => note.id === id);
	}

	get(ids) {
		ids = Array.isArray(ids) && ids.length?ids:[];
    	const res = ids.map(id => {
      		const index = this.findNote(id);
      		const note = this.notes[index];
      		return note;
    	}).filter(a => a);
		return res;
	}
}

//assigning a label to the store is not mandatory but it protects code upon minification and provides for a better debugging experience
export default alt.createStore(NoteStore,'NoteStore');