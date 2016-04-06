import React,{Component} from 'react';
import LanesStore from '../stores/LanesStore';
import Lane from './Lane.jsx';

export default class Lanes extends Component {
	constructor(props) {
		super(props);
		this.renderLane = this.renderLane.bind(this);
	}
	
	render() {
		const items = this.props.items;
		return (
			<div>
				{items.map(this.renderLane)}
			</div>
		);
	}

	renderLane(lane) {
		return (
			<Lane className="lane" key={lane.id} lane={lane}/>
		);
	}
}