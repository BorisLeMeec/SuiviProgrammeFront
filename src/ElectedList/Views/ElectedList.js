import React from 'react';
import FaceIcon from '../Components/faceIcon';

// First we create our class
export default class ElectedList extends React.Component {

	// Then we add our constructor which receives our props
	constructor(props) {
		super(props);
		// Next we establish our state
		this.state = {
			elected: [
				{ name: 'Nathalie Appéré', id: 1, promessNbr: '5', photoUrl: 'https://www.rennes-infos-autrement.fr/wp-content/uploads/Nathalie_App%C3%A9r%C3%A9_-_F%C3%A9vrier_2013_-_01-810x1215.jpg' },
				{ name: 'Carole Gandon', id: 2, promessNbr: '4', photoUrl: 'https://www.rennes-infos-autrement.fr/wp-content/uploads/Nathalie_App%C3%A9r%C3%A9_-_F%C3%A9vrier_2013_-_01-810x1215.jpg' },
				{ name: 'Matthieu Theurier ', id: 3, promessNbr: '3', photoUrl: 'https://www.rennes-infos-autrement.fr/wp-content/uploads/Nathalie_App%C3%A9r%C3%A9_-_F%C3%A9vrier_2013_-_01-810x1215.jpg' },
				{ name: 'Enora Le Pape', id: 4, promessNbr: '7', photoUrl: 'https://www.rennes-infos-autrement.fr/wp-content/uploads/Nathalie_App%C3%A9r%C3%A9_-_F%C3%A9vrier_2013_-_01-810x1215.jpg' }
			]
		}
		// To use the 'this' keyword, we need to bind it to our function
		this.onChange = this.onChange.bind(this);
	}

	NumberList(elected) {
		const listItems = elected.map((item) =>
			<FaceIcon
				key={item.id}
				name={item.name}
				photoUrl={item.photoUrl}
			/>
		);
		return (
			<ul>{listItems}</ul>
		);
	}

	// A custom function to change the name in our state to match the user input
	onChange(e) {
		this.setState({
			name: e.target.value
		})
	}
	// The render function, where we actually tell the browser what it should show
	render() {
		return (
			<div>
				<section className="ElectedList">
					<p>{this.state.greeting} {this.state.name}</p>
				</section>
				<div>
					{this.NumberList(this.state.elected)}
				</div>
			</div>
		)
	}
}