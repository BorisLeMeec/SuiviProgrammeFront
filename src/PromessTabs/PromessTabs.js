import React from "react";
import PromessList from "../PromessList/Views/PromessList";
import { Tabs, Tab, Spinner } from "react-bootstrap";
import axios from "../axios.js";
import "./PromessTabs.scss";

export default class PromessTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      categories: null,
      promess: null,
      peopleInfos: null
    };

    this.fetchPromess = this.fetchPromess.bind(this);
    this.fetchPeopleInfos = this.fetchPeopleInfos.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.organizeData = this.organizeData.bind(this);
  }

  async componentDidMount() {
    await this.fetchPeopleInfos();
    await this.fetchPromess();
    await this.organizeData();
  }

 async organizeData() {
    const data = {};

    for (const item of this.state.promess ) {
      for (const category of item.category) {
        if (!data[category]) {
          const res = await axios.get(`${category}`)
          data[category] = res.data;
          data[category].proposals = [];
        }
        data[category].proposals.push(item);
      }
    }
    
    this.setState({ categories: Object.values(data) })
  }

  async fetchPeopleInfos() {
    const res = await axios.get(
      `/api/people/${this.state.id}`
    );
    const peopleInfos = res.data;
    this.setState({ peopleInfos });
  }

  async fetchPromess() {
    const res = await axios.get(
      `/api/people/${this.state.id}/proposals`
    );
    const promess = res.data["hydra:member"];
    this.setState({ promess });
  }

  handleTabClick(event) {
    console.log(event);
  }

  categoriesTabs(categoriesList) {
    if (!categoriesList) {
      return <Spinner animation="border" />;
    }
    const tabs = categoriesList.map(item => (
      <Tab eventKey={item.name} title={item.name} key={item.id}>
        <PromessList promess={item.proposals} categorie={item.name}></PromessList>
      </Tab>
    ));
    return (
      <Tabs
        onSelect={this.handleTabClick}
        defaultActiveKey={categoriesList[0].name}
        id="uncontrolled-tab-example"
      >
        {tabs}
      </Tabs>
    );
  }

  render() {
    return (
      <div className="promess-tabs">
        {this.state.peopleInfos && <h1>{this.state.peopleInfos.name}</h1>}
        {this.categoriesTabs(this.state.categories)}
      </div>
    );
  }
}
