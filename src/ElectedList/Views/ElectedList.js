import React from "react";
import axios from 'axios';

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
    axios.get(`https://caenestou.osc-fr1.scalingo.io/api/people`)
      .then(res => {
        console.log(res.data['hydra:member']);
        const elected = res.data['hydra:member'];
        this.setState({ elected });
      })
  }

  NumberList(elected) {
    const listItems = elected.map(item => (
      <div key={item.id}>
        <Link to={`elected/${item.id}`}>
          <FaceIcon name={item.name} photoUrl={'https://via.placeholder.com/500'} />
        </Link>
      </div>
    ));
    return listItems;
  }

  render() {
    return (
      <div>
        <section className="ElectedList">
          <p>
            {this.state.greeting} {this.state.name}
          </p>
        </section>
        <div className="elected-grid">
          {this.NumberList(this.state.elected)}
        </div>
      </div>
    );
  }
}
