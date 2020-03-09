import React from 'react';
import {
	Accordion,
	Card,
}
from 'react-bootstrap'

// First we create our class
export default class PromessList extends React.Component {
		constructor(props) {
				super(props);
				this.state = {
					id: props.match.params.id,
					categories: null
				};
				
				this.getAllCategories = this.getAllCategories.bind(this);
		}

		componentDidMount() {
			this.getAllCategories();
		}

		getAllCategories() {
			var categories = ['environnement', 'culture', 'sport', 'urbanisme']
			this.setState({...this.state, categories});
		}

		render() {
			return (
				<div>
					<h1>Promess list {this.state.id}</h1>
					<Accordion>		
						{this.state.categories && this.state.categories.map((categories, _) => (
							<Card key={categories}>
								<Accordion.Toggle as={Card.Header} eventKey={categories}>
									{categories}
								</Accordion.Toggle>
								<Accordion.Collapse eventKey={categories}>
									<Card.Body>Hello! I'm the body</Card.Body>
								</Accordion.Collapse>
								</Card>
							))
						}

					</Accordion>
				</div>
			)
		}
}