import React from "react";
import { Accordion, Card, ProgressBar } from "react-bootstrap";
import "./PromessList.scss";

// First we create our class
export default class PromessList extends React.Component {

  async componentDidMount() {
    console.log(this.props.promess);
  }

  render() {
    return (
      <div className="promess-list">
        <h1>{this.props.categorie}</h1>
        <Accordion>
          {this.props.promess &&
            this.props.promess.map(categorie => (
              <Card key={categorie.id}>
                <Accordion.Toggle as={Card.Header} eventKey={categorie.id}>
                  <span>{categorie.description}</span>
                  <ProgressBar now={categorie.progression} />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={categorie.id}>
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
        </Accordion>
      </div>
    );
  }
}
