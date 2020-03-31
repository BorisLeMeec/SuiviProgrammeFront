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
    this.fetchCategories = this.fetchCategories.bind(this);
    this.fetchSubCategories = this.fetchSubCategories.bind(this);
  }

  async componentDidMount() {
    await this.fetchPeopleInfos();
    await this.fetchCategories();
  }

  async fetchPeopleInfos() {
    const res = await axios.get(
      `/api/people/${this.state.id}`
    );
    const peopleInfos = res.data;
    this.setState({ peopleInfos });
  }

    async fetchCategories() {
        const res = await axios.get(
            `/api/categories`
        );
        const categories = res.data["hydra:member"];
        this.setState({ categories });
    }

    async fetchSubCategories(cat) {
        const res = await axios.get(
            `/api/categories/` + cat + '/childs'
        );
        return res.data["hydra:member"];
    }

  async fetchPromess() {
    const res = await axios.get(
      `/api/people/${this.state.id}/proposals`
    );
    const promess = res.data["hydra:member"];
    this.setState({ promess });
  }

  handleTabClick(event) {
      this.fetchSubCategories(event);
  }

    categoriesTabs(categoriesList) {
        if (!categoriesList) {
            return <Spinner animation="border" />;
        }
        return (
            <Tabs
                defaultActiveKey={categoriesList[0].name}
                id="uncontrolled-tab-example">
                {categoriesList.map(item => (
                    <Tab eventKey={item.id} title={item.name} key={item.id}>
                        {this.subCategoriesTabs(await this.fetchSubCategories(item.id))}
                    </Tab>
                ))}
            </Tabs>
        );
    }
    subCategoriesTabs(subCategories) {
        if (!subCategories) {
            return <Spinner animation="border" />;
        }
        console.log(subCategories);return;
        const tabs = subCategories.map(item => (
            <Tab eventKey={item.id} title={item.name} key={item.id}>
                <PromessList promess={item.proposals} categorie={item.name}/>
            </Tab>
        ));
        return (
            <Tabs
                onSelect={this.handleTabClick}
                defaultActiveKey={subCategories[0].name}
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
