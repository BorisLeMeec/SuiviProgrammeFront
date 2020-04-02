import React from "react";
import PromessList from "../../PromessList/Views/PromessList";
import { Tabs, Tab, Spinner } from "react-bootstrap";
import axios from "../../axios.js";

export default class PromessTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subCategories: null,
    };
    this.fetchSubCategories = this.fetchSubCategories.bind(this);
  }

  async componentDidMount() {
    await this.fetchSubCategories();
  }

async fetchSubCategories() {
    const res = await axios.get(
        `/api/categories/${this.props.catId}/childs`
    );
    console.log(res.data["hydra:member"]);
    this.setState({ subCategories: res.data["hydra:member"] }); 
}

  handleTabClick(event) {
      console.log(event);
  }

    subCategoriesTabs(subCategories) {
        if (!subCategories) {
            return <Spinner animation="border" />;
        }
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
        this.subCategoriesTabs(this.state.subCategories)
        );
  }
}
