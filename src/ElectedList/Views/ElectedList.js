import React from "react";
import axios from "../../axios.js";

import FaceIcon from "../Components/faceIcon";
import { Link } from "react-router-dom";
import "./ElectedList.scss";

// First we create our class
export default class ElectedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elected: []
    };
  }

  componentDidMount() {
    axios.get(`/api/people`)
      .then(res => {
        const elected = res.data['hydra:member'];
        this.setState({ elected });
      });
  }

  NumberList(elected) {
    const listItems = elected.map(item => (
      <div key={item.id}>
        <Link to={`elected/${item.id}`}>
          <FaceIcon name={item.name}/>
        </Link>
      </div>
    ));
    return listItems;
  }

  render() {
    return (
      <div>
        <div className="elected-grid">
          {this.NumberList(this.state.elected)}
        </div>
      </div>
    );
  }
}
