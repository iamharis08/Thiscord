import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory, NavLink } from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = (e) => {
    e.preventDefault()
    dispatch(logout());
    history.push("/")
  };

  return <NavLink to="/" onClick={onLogout} id="logout-button" >Logout</NavLink>;
};

export default LogoutButton;
