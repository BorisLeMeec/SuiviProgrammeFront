import React from 'react';
import './faceIcon.scss'

export default class faceIcon extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		return (
			<div className="faceIcon" style={{backgroundImage: `url(${this.props.photoUrl})`}}>
                {this.props.name}
			</div>
		)
	}
}