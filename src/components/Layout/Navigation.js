import React from 'react';
import puplanta from '../../img/puplanta_long_name.png';
import { NavLink as NLink } from 'react-router-dom';
import * as ROUTES from '../Routes/Routes';
import { AuthUserContext } from '../Session';
import SignOut from './SignOut';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';



export default class Navigation extends React.Component {
  
  render = () => {

  const toggle = () => {
    this.props.toggleMenu();
  }

  const NavbarNonAuth = () => (
    <Nav>
      <NavItem className='item'>
        <NavLink tag={NLink} to={ROUTES.HOME} >Home</NavLink>
      </NavItem>
      <NavItem className='tem'>
        <NavLink tag={NLink} to={ROUTES.ABOUT} >About</NavLink>
      </NavItem>
      <NavItem className='item'> 
        <NavLink tag={NLink} to={ROUTES.STORES} >Stores</NavLink>
      </NavItem>
      <NavItem className='item'>
        <NavLink tag={NLink} to={ROUTES.PARKS} >Parks</NavLink>
      </NavItem>
      <NavItem  className='item'>
        <NavLink tag={NLink} to={ROUTES.SIGN_IN} >Sign In</NavLink>
      </NavItem>
      <NavItem className='item'>
        <NavLink tag={NLink} to={ROUTES.SIGN_UP} >Sign Up</NavLink>
      </NavItem>
    </Nav>
  );


  const NavbarAuth = ({authUser}) => (
    <Nav>
      <NavItem className='item'>
        <NavLink tag={NLink} to={ROUTES.HOME}>Home </NavLink>
      </NavItem>
      <NavItem className='item'>
        <NavLink tag={NLink} to={ROUTES.ABOUT}>About</NavLink>
      </NavItem>
      <NavItem className='item'>
        <NavLink tag={NLink} to={ROUTES.STORES}>Stores</NavLink>
      </NavItem>
      <NavItem className='item'>
        <NavLink tag={NLink} to={ROUTES.PARKS} >Parks</NavLink>
      </NavItem>
      <NavItem className='item'>
        <NavLink tag={NLink} to={ROUTES.ACCOUNT}>Account</NavLink>
      </NavItem>
      <NavItem className='item'>
        <SignOut tag={NLink} to={ROUTES.HOME}></SignOut>
      </NavItem>
    </Nav>
  );

    return (
      <Navbar light expand="md">
          <NavbarBrand tag ={NLink} to={ROUTES.HOME}><img src={puplanta} className='puplanta-logo' alt='puplanta logo'  /></NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={this.props.menu} navbar>
          <AuthUserContext.Consumer>
            {authUser => (
              authUser ? <NavbarAuth authUser={authUser} /> : <NavbarNonAuth menu={this.props.menu} toggle={toggle}/>
            )
            }
      </AuthUserContext.Consumer>
          </Collapse>
        </Navbar>
    ) 
  }
}

