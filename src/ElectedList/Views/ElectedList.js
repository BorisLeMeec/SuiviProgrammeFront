import React from 'react';
import FaceIcon from '../Components/faceIcon';
import {
	Link
} from "react-router-dom";

// First we create our class
export default class ElectedList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			elected: [
				{ name: 'Nathalie Appéré', id: 1, promessNbr: '5', photoUrl: 'https://www.rennes-infos-autrement.fr/wp-content/uploads/Nathalie_App%C3%A9r%C3%A9_-_F%C3%A9vrier_2013_-_01-810x1215.jpg' },
				{ name: 'Carole Gandon', id: 2, promessNbr: '4', photoUrl: 'https://www.rennes-infos-autrement.fr/wp-content/uploads/th-1.jpeg' },
				{ name: 'Matthieu Theurier', id: 3, promessNbr: '3', photoUrl: 'https://pbs.twimg.com/profile_images/1200133121640976384/rCUvHm8__400x400.jpg' },
				{ name: 'Enora Le Pape', id: 4, promessNbr: '7', photoUrl: 'https://img.20mn.fr/TEDIw1xITKmMpnkYDWC6Fg/640x410_enora-le-pape-tete-de-liste-rennes-en-commun-la-france-insoumise-aux-elections-municipales-2020-a.jpg' }
			]

		}
	}

	NumberList(elected) {

		const listItems = elected.map((item) =>
			<Link to={`elected/${item.id}`}>
				<FaceIcon
					key={item.id}
					name={item.name}
					photoUrl={item.photoUrl}
				/>
			</Link>
		);
		return (
			<ul>{listItems}</ul>
		);
	}

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