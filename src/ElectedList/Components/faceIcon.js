import React from 'react';
import './faceIcon.scss'

export default class faceIcon extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {}
		// To use the 'this' keyword, we need to bind it to our function
	}
	
	// A custom function to change the name in our state to match the user input
	render() {
		return (
			<div className="faceIcon" style={{backgroundImage: `url(${this.props.photoUrl})`}}>
                {this.props.name}
			</div>
		)
	}
}