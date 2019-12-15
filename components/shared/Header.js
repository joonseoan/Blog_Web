import React, { useState } from 'react';
import Link from 'next/link';
import Auth0Client from '../../services/auth0';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const BsNavLink = props => {
  const { route, title } = props;
  return (
    <Link href={ route }>
      <a className="nav-link port-navbar-link">{ title }</a>
    </Link>
  );
}

const Login = props => {
  return(
    <span 
      className="nav-link port-navbar-link clickable"
      onClick={ Auth0Client.login }
    >
      Login
    </span>
  )
}

const Logout = props => {
  return(
    <span 
      className="nav-link port-navbar-link clickable"
      onClick={ Auth0Client.logout }
    >
      Logout
    </span>
  )
}

export default props => {

  const [ isOpen, setIsOpen ] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* dark: please find doc */}
      <Navbar className="port-navbar port-default absolute" color="transparent" dark expand="md">
        <NavbarBrand className="port-navbar-brand" href="/">Joon An</NavbarBrand>
        <NavbarToggler onClick={ toggle } />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="port-navbar-item">
              <BsNavLink 
                route="/"
                title="Home"
              />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink 
                route="/about"
                title="About"
              />
            </NavItem>
             <NavItem className="port-navbar-item">
              <BsNavLink 
                route="/portfolio"
                title="Portfolio"
              />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink 
                route="/blogs"
                title="Blog"
              />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink 
                route="/cv"
                title="CV"
              />
            </NavItem>
            {
              !props.isAuthenticated ?  
              (<NavItem className="port-navbar-item">
                <Login />
              </NavItem>) :
              (<NavItem className="port-navbar-item">
                <Logout />
              </NavItem>)
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}