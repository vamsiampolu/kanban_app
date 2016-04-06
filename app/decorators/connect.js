import React from 'react';

const connect = (Component,Store) => {
	return class Connect extends React.Component {
		constructor(props){
			super(props);
			this.storeChanged = this.storeChanged.bind(this);
			this.state = Store.getState();
			Store.listen(this.storeChanged);
		}

		componentWillUnmount() {
			Store.unlisten(this.storeChanged);
		}

		storeChanged() {
			this.setState(Store.getState());
		}

		render(){
			return (<Component {...this.props} {...this.state}/>);
		}	
	}
};

export default (store) => {
	return (target) => connect(target,store);
};