
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  return (
    <nav>
      <ul>
          <NavLink to='/' exact={true} activeClassName='active'>
            Thiscord
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
      </ul>
    </nav>
  );
}

export default NavBar;
