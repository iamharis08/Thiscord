import React, { useState, useEffect } from 'react';
import { createServer } from '../../store/server'
import { useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./ServerForm.css"
import { fetchOneServer } from '../../store/server';

function ServerFormModal({ setShowModal }) {

  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector(state => state.session.user);

  const [serverName, setServerName] = useState(`${user.username}'s server`);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    if (stringCheck(serverName)) {

      return dispatch(createServer({ name: inputReducer(serverName) }))
        .then((newServer) => dispatch(fetchOneServer(newServer?.server?.id)))
        .then((res) => {
          setShowModal(false)
          return res
        })
        .then((res) => {
          if (res) { history.push(`/channels/${res?.channels[0]?.id}`) }
        })
    } else {
      setErrors(['Name needs to be at least three characters'])
    }
  }

  const stringCheck = str => str.split(' ').filter(c => c !== '').join('').length >= 3
  const inputReducer = str => str.replace(/\s+/g, ' ').trim()



  return (
    <>
      <div className='create-server-modal'>
        <form className="create-server-form" onSubmit={handleSubmit}>
          {errors[0] ? (<ul className='errors'>
            <li>{errors[0]}</li>
          </ul>) : ''}
          <div className='create-text'>
            Customize your server
          </div>
          <div className='create-description'>
            Give your new server a personality with a name. You can always change it later
          </div>
          <div className='container-and-buttons'>
            <div className='container'>
              <div className='input-and-terms'>
                <label className='input-label'>
                  <div className='server-name'>
                    SERVER NAME
                  </div>
                  <div>
                    <input className="input"
                      type="text"
                      value={serverName}
                      minlength='3'
                      maxlength='50'
                      onChange={(e) => setServerName(e.target.value)}
                      required
                      autoFocus />
                  </div>
                </label>
                <div className='terms-and-highlight'>
                  <div className='terms'>
                    By creating a server, you agree to This.cord's
                    <NavLink className='purple-highlight' to="/coming-soon">&nbsp;Community GuideLines</NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className='button-container'>
              <span className=''>
                <button className='backButton' type="button" onClick={() => {
                  setShowModal(false)
                }}>
                  Back
                </button>
              </span>
              <span className=''>
                <button className='createButton' type="submit">
                  Create
                </button>
              </span>
            </div>
          </div>
        </form>
      </div >
    </>
  );
}

export default ServerFormModal;
