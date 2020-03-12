import React from "react";
import { Accordion, Card, ProgressBar } from "react-bootstrap";
import './PromessList.scss'

// First we create our class
export default class PromessList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null
    };

    this.getAllPromess = this.getAllPromess.bind(this);
  }

  componentDidMount() {
    this.getAllPromess();
  }

  getAllPromess() {
    var categories = [
      { name: "promess1", progress: "10" },
      { name: "promess2", progress: "20" },
      { name: "promess3", progress: "50" },
      { name: "promess5", progress: "70" }
    ];
    this.setState({ ...this.state, categories });
  }

  render() {
    return (
      <div class="promess-list">
        <h1>Promess list {this.props.categorie}</h1>
        <Accordion>
          {this.state.categories &&
            this.state.categories.map((categorie) => (
              <Card key={categorie.name}>
                <Accordion.Toggle as={Card.Header} eventKey={categorie.name}>
                  <span>{categorie.name}</span>
                  <ProgressBar now={categorie.progress} />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={categorie.name}>
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
        </Accordion>
      </div>
    );
  }
}
