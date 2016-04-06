import React,{Component} from 'react';
import Lanes from './Lanes.jsx';
import uuid from 'node-uuid';
import LanesStore from '../stores/LanesStore.js';
import LanesActions from '../actions/LanesActions.js';
import AltContainer from 'alt/AltContainer';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

@DragDropContext(HTML5Backend)
export default class App extends Component {

	constructor(props) {
		super(props);
		this.addLane = this.addLane.bind(this);
	}

	render() {
		const notes = this.props.notes;

		return (
			<div>
				<button className="add-lane" onClick={this.addLane}>+</button>
				<AltContainer stores={[LanesStore]}
					inject={ { items: () => LanesStore.getState().lanes || [] } } >
				<Lanes />
				</AltContainer>
			</div>
		);
	}

	addLane() {
		LanesActions.create({
			name:'New Lane'
		});
	}
}