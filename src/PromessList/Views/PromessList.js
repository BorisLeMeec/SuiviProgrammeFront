import React from "react";
import { Accordion, Card, ProgressBar } from "react-bootstrap";
import "./PromessList.scss";
import axios from "../../axios";

// First we create our class
export default class PromessList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            promesses: null
        };
        this.fetchPromesses = this.fetchPromesses.bind(this);
    }

  async componentDidMount() {
      await this.fetchPromesses();
  }

    async fetchPromesses() {
        const res = await axios.get(
            `/api/proposals?category=${this.props.categorie.id}&person=${this.props.person}`
        );
        this.setState({ promesses: res.data["hydra:member"] });
        console.log(this.state.promesses);
    }

  render() {
    return (
      <div className="promess-list">
        <h1>{this.props.categorie.name}</h1>
        <Accordion>
          {this.state.promesses &&
            this.state.promesses.map(categorie => (
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
