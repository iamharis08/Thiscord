import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { logout } from '../../store/session';
import '../../css/SingleServer.css'

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };
  return (
  <NavLink id='logout-button' onClick={onLogout} to='/'>
    Logout
  </NavLink>
  )
};

export default LogoutButton;
