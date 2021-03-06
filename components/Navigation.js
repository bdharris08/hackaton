//Navigation.js
//the nav bar on top

import React, { Component, PropTypes } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

export default class Navigation extends Component {
  render() {
    return (
      <Navbar inverse className="Navbar">
	    <Navbar.Header>
	      <Navbar.Brand>
	        <a href="#">Pillosophy</a>
	      </Navbar.Brand>
	      <Navbar.Toggle />
	    </Navbar.Header>
	    <Navbar.Collapse>
	      <Nav>
	        <NavItem eventKey={1} href="#">About</NavItem>
	        <NavItem eventKey={2} href="#">Github</NavItem>
	        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
	          <MenuItem eventKey={3.1}>Action</MenuItem>
	          <MenuItem eventKey={3.2}>Another action</MenuItem>
	          <MenuItem eventKey={3.3}>Something else here</MenuItem>
	          <MenuItem divider />
	          <MenuItem eventKey={3.3}>Separated link</MenuItem>
	        </NavDropdown>
	      </Nav>
	      <Nav pullRight>
	        <NavItem eventKey={1} href="#">Log in</NavItem>
	        <NavItem eventKey={2} href="#"></NavItem>
	      </Nav>
	    </Navbar.Collapse>
	  </Navbar>
    )
  }
}

Navigation.propTypes = {
  //posts: PropTypes.array.isRequired
}