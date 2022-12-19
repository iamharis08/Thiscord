import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import LiveChat from './components/Livechat/Livechat';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import ImagineAPlace from './components/ImagineAPlace';
import Servers from './components/Servers';
import Server from './components/Server';
import Channel from './components/Channel'
import "./css/App.css"
import ComingSoon from './components/ComingSoon';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <NavBar />
          <ImagineAPlace />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/livechat' exact={true}>
          <LiveChat />
        </Route>
        <Route path='/servers' exact={true}>
          <Servers />
        </Route>
        <Route path='/servers/:serverId' exact={true}>
          <Servers />
        </Route>
        <Route path='/channels/:channelId' exact={true}>
          <div className='app-container'>
            <Servers />
            {/* <div className='channel-app-container'> */}
            <Channel />
            {/* </div> */}
          </div>
        </Route>
        <Route path='/coming-soon' exact={true}>
          <ComingSoon />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
