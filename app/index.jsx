import './main.css';
import App from './components/App.jsx';
import React from 'react';
import 'array.prototype.findindex';
import alt from './libs/alt';
import storage from './libs/storage';
import persist from './libs/persist';
main();

function main() {
	persist(alt,storage,'app');
	const app = document.createElement('div');
	document.body.appendChild(app);
	React.render(<App/>,app);
}

