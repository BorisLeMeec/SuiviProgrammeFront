import React from "react";
import SubCategoriesTabs from "./Components/subCategoriesTabs"
import {Tabs, Tab, Spinner, DropdownItem, Row, Col} from "react-bootstrap";
import axios from "../axios.js";
import "./PromessTabs.scss";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default class PromessTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        id: props.match.params.id,
        categories: null,
        promess: null,
        peopleInfos: null,
        selectedCategory: null
    };

    this.fetchPromess = this.fetchPromess.bind(this);
    this.fetchPeopleInfos = this.fetchPeopleInfos.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
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

  async fetchPromess() {
    const res = await axios.get(
      `/api/people/${this.state.id}/proposals`
    );
    const promess = res.data["hydra:member"];
    this.setState({ promess });
  }

  selectCategory(event, object) {
      this.setState({selectedCategory: event});
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
                    <DropdownItem key={item.id} eventKey={item.id}>{item.name}
                    </DropdownItem>

                ))}
            </DropdownButton>
        );
    }

  render() {
    return (
      <div className="promess-tabs">
        {this.state.peopleInfos &&
            <div>
                <h1>{this.state.peopleInfos.name}</h1>
                <Container><Row class={"justify-content-end"}><Col xs={{size:5, offset:7}}><a href='#'>S'abonner</a></Col></Row></Container>
            </div>
        }
        {this.categoriesTabs(this.state.categories)}
        {this.state.selectedCategory && <SubCategoriesTabs person={this.state.id} catId={this.state.selectedCategory} />}

      </div>
    );
  }
}
