import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import LoginForm from './LoginForm';
import "./LoginFormPage.css"


const LoginFormPage = () => {
  const dispatch = useDispatch()


  return (
    <div className='login-form-page'>
        <div className='login-form-box'>
            <LoginForm />
        </div>
    </div>
  );
};

export default LoginFormPage;
