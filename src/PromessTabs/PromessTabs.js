import React from "react";
import SubCategoriesTabs from "./Components/subCategoriesTabs";
import { Tabs, Tab, Spinner, DropdownItem, Row, Col } from "react-bootstrap";
import axios from "../axios.js";
import "./PromessTabs.scss";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const applicationServerPublicKey =
  "BPkrKBnmja0GlUEiDqjcIpAi54OyQfOn9VcNKrnYlp_PfvtQV4c77rVpOKOepaCUYnXWlDXn_9ImHhLS8Cde8vM";

export default class PromessTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      categories: null,
      promess: null,
      peopleInfos: null,
      selectedCategory: null,
      subscribed: false
    };

    this.fetchPromess = this.fetchPromess.bind(this);
    this.fetchPeopleInfos = this.fetchPeopleInfos.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.askNotificationRight = this.askNotificationRight.bind(this);
    this.urlBase64ToUint8Array = this.urlBase64ToUint8Array.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  async componentDidMount() {
    await this.fetchPeopleInfos();
    await this.fetchCategories();
  }

  async fetchPeopleInfos() {
    const res = await axios.get(`/api/people/${this.state.id}`);
    const peopleInfos = res.data;
    this.setState({ peopleInfos });
  }

  async fetchCategories() {
    const res = await axios.get(`/api/categories`);
    const categories = res.data["hydra:member"];
    this.setState({ categories });
  }

  async fetchPromess() {
    const res = await axios.get(`/api/people/${this.state.id}/proposals`);
    const promess = res.data["hydra:member"];
    this.setState({ promess });
  }

  selectCategory(event, object) {
    this.setState({ selectedCategory: event });
  }

  categoriesTabs(categoriesList) {
    if (!categoriesList) {
      return <Spinner animation="border" />;
    }
    return (
      <DropdownButton
        title="Categorie"
        id="dropdown-menu-align-right"
        onSelect={this.selectCategory}
      >
        {categoriesList.map(item => (
          <DropdownItem key={item.id} eventKey={item.id}>
            {item.name}
          </DropdownItem>
        ))}
      </DropdownButton>
    );
  }

  async subscribe(subscription) {
    await axios.post(`/api/people/${this.state.id}/subscribe/`, {
      token: JSON.stringify(subscription)
    });
    const subscribed = !this.state.subscribed; // TO DO REALLY UNSUBSCRIBE LOL
    this.setState({ subscribed });
  }

  askNotificationRight() {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    var top = this;
    navigator.serviceWorker.ready.then(function(registration) {
      registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: top.urlBase64ToUint8Array(
            applicationServerPublicKey
          )
        })
        .then(function() {
          registration.pushManager
            .getSubscription()
            .then(function(subscription) {
              top.subscribe(subscription);
            });
        });
    });
  }

  urlBase64ToUint8Array(base64String) {
    var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  render() {
    return (
      <div className="promess-tabs">
        {this.state.peopleInfos && (
          <div>
            <h1>{this.state.peopleInfos.name}</h1>
            <Container>
              <Row className={"justify-content-end"}>
                <Col xs={{ size: 5, offset: 7 }}>
                  <a href="#" onClick={this.askNotificationRight}>
                    {this.state.subscribed ? "Se désabonner" : "S'abonner" }
                  </a>
                </Col>
              </Row>
            </Container>
          </div>
        )}
        {this.categoriesTabs(this.state.categories)}
        {this.state.selectedCategory && (
          <SubCategoriesTabs
            person={this.state.id}
            catId={this.state.selectedCategory}
          />
        )}
      </div>
    );
  }
}
