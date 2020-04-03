import React from "react";
import {Accordion, Alert, Card, ProgressBar} from "react-bootstrap";
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
    }

  render() {
    return (
      <div className="promess-list">
        <h1>{this.props.categorie.name}</h1>
        <Accordion>
          {this.state.promesses &&
            this.state.promesses.map(promesse => (
              <Card key={promesse.id}>
                <Accordion.Toggle as={Card.Header} eventKey={promesse.id}>
                  <span>{promesse.description}</span>
                    <span>
                        {promesse.status === 0 &&
                        <Alert variant={'secondary'}>En attente</Alert>
                        }
                        {promesse.status === 1 &&
                        <Alert variant={'primary'}>En cours</Alert>
                        }
                        {promesse.status === 2 &&
                        <Alert variant={'danger'}>Annulé</Alert>
                        }
                        {promesse.status === 3 &&
                        <Alert variant={'success'}>Fini</Alert>
                        }
                    </span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={promesse.id}>
                  <Card.Body>
                      {promesse.progressionType !== 2 &&
                        <ProgressBar striped
                                     now={promesse.progression}
                                     max={promesse.progressionType === 0 ? 100 : promesse.progressionMax}
                                     label={promesse.progressionType === 0 ? `${promesse.progression}%` : `${promesse.progression}/${promesse.progressionMax}`}/>
                      }
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
        </Accordion>
      </div>
    );
  }
}
