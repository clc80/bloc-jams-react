import React from 'react';
import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#"> EIS </a>
          </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey = {1} href="#">Home</NavItem>
          <NavItem eventKey = {2} href="#">Portfolio</NavItem>
          <NavItem eventKey = {3} href="#">Services</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
  }
}
export default NavigationBar;
