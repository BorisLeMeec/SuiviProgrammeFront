import React from 'react';
// import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ElectedList from './ElectedList/Views/ElectedList';
import PromessList from './PromessList/Views/PromessList';

function About() {
  return <h2>A propos</h2>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item><Link to="/">Accueil</Link></Nav.Item>
              <Nav.Item><Link to="/about">A propos</Link></Nav.Item>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Rechercher</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path={"/"} component={ElectedList}></Route>
          <Route exact path={"/elected/:id"} component={PromessList}></Route>
          <Route path={"/about"} component={About}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
