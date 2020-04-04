import React from "react";
import PromessList from "../../PromessList/Views/PromessList";
import {Tabs, Tab, Spinner, DropdownItem} from "react-bootstrap";
import axios from "../../axios.js";
import DropdownButton from "react-bootstrap/DropdownButton";

export default class PromessTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        subCategories: null,
        selectedSubCategory:null
    };
    this.fetchSubCategories = this.fetchSubCategories.bind(this);
    this.selectSubCategory = this.selectSubCategory.bind(this);
  }

  async componentDidMount() {
    await this.fetchSubCategories();
  }

  async componentWillReceiveProps(props) {
      await this.fetchSubCategories()
  }

    async fetchSubCategories() {
    const res = await axios.get(
        `/api/categories/${this.props.catId}/childs`
    );
    this.setState({ subCategories: res.data["hydra:member"] });
}

  selectSubCategory(event) {
      this.setState({selectedSubCategory:event});
  }

  render() {
    if (!this.state.subCategories) {
      return <Spinner animation="border" />;
    }
    return (
        <div>
            <DropdownButton
                title="Sous catégorie"
                id="dropdown-menu-align-right"
                onSelect={this.selectSubCategory}
            >
                {this.state.subCategories.map(item => (
                    <DropdownItem key={item.id} eventKey={item.id}>{item.name}
                    </DropdownItem>

                ))}
            </DropdownButton>
            {this.state.selectedSubCategory &&
                <PromessList person={this.props.person} categorie={this.state.selectedSubCategory}/>
            }
        </div>
    )
  }
}
