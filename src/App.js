import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams} from "react-router-dom";

import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'

import Container from 'react-bootstrap/Container'

import TextField from '@material-ui/core/TextField';
import { Admin } from './Admin';
import { Login } from './Login';


//export const apiendpoint = "http://localhost:4800"
export const apiendpoint ="https://bookmmyshow.herokuapp.com"
function App() {
  return (
    <div className="App">
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto" id="navitems">
                <Link to="/">Home </Link>
                <Link to="/about">About </Link>
                <Link to="/admin">Admin </Link>
                <Link to="/client">Client </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </div>
      <div className="content">
        <Switch>
          <Route path="/about">  <About /> </Route>
          <Route path="/admin">  <Admin /> </Route>
          {/* <Route path="/students">  <Admin /> </Route>
          <Route path="/mentors">  <Admin /> </Route>
          <Route path="/UpdateMultiple">  <Admin /> </Route>
          <Route path="/Filterbymentor">  <Admin /> </Route> */}
          <Route path="/client"> <Login />  </Route>
          <Route exact path="/">  <Home />  </Route>
          <Route path="*"> <Notfound />  </Route>
        </Switch>
      </div>
    </div>
  );
}


function Home() {
  return (
    <div>Inside Home : go to ADMIN PAGE </div>
  )
}

function About() {
  return (
    <div>Inisde About</div>
  )
}

function Notfound() {
  return (
    <h1>Page Not Found</h1>
  )
}



export default App;
