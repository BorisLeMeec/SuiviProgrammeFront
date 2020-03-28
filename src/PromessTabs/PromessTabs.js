import React from "react";
import PromessList from "../PromessList/Views/PromessList";
import { Tabs, Tab, Spinner } from "react-bootstrap";
import './PromessTabs.scss';

export default class PromessTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      categories: null
    };

    this.getAllCategories = this.getAllCategories.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentDidMount() {
    this.getAllCategories();
  }

  getAllCategories() {
    var categories = ["environnement", "culture", "sport", "urbanisme"];
    this.setState({ ...this.state, categories });
  }

  handleTabClick(event) {
    console.log(event);
  }

  categoriesTabs(categoriesList) {
    if (!categoriesList) {
      return <Spinner animation="border" />;
    }
    const tabs = categoriesList.map(item => (
      <Tab eventKey={item} title={item} key={item}>
        <PromessList categorie={item}></PromessList>
      </Tab>
    ));
    return (
      <Tabs onSelect={this.handleTabClick} defaultActiveKey={categoriesList[0]} id="uncontrolled-tab-example">
        {tabs}
      </Tabs>
    );
  }

  render() {
    return (
      <div className="promess-tabs">
        <h1>pressentation elu {this.state.id}</h1>
        {this.categoriesTabs(this.state.categories)}
      </div>
    );
  }
}
