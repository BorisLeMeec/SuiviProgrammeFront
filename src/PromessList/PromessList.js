import React from 'react';

// First we create our class
export default class ElectedList extends React.Component {
	
	render() {
		return (
			<div>
                <h1>Promess list {this.props.name}</h1>
			</div>
		)
	}
}