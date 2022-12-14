
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import '../css/Navbar.css'

const NavBar = () => {
  return (
    <nav>
      <div className="home-navbar">
          <NavLink className="thiscord-home-btn" to='/' exact={true} activeClassName='active'>
            <img id='thiscord-logo' alt='' src='https://pnggrid.com/wp-content/uploads/2021/05/Black-and-white-Discord-Logo.png'></img>
            This.cord
          </NavLink>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        {/*
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink> */}
          <LogoutButton />
        </div>
    </nav>
  );
}

export default NavBar;
