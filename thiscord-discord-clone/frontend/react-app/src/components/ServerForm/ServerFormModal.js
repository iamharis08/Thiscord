import React, { useState, useEffect } from 'react';
import { createServer } from '../../store/server'
import { useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./ServerForm.css"

function ServerFormModal({ setShowModal }) {

  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const [serverName, setServerName] = useState(`${user.username}'s server`);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(createServer({ name: serverName }))
      .then(() => { setShowModal(false) })
    // .catch(async (res) => {
    //   const data = await res.json();
    //   console.log("THE DATA OF THE NEW SERVER", data)
    //   if (data) setErrors(Object.values(data));
    //   else return (<Redirect to={'/servers'} />);
    // });
  }

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
                      // placeholder={`${user.username}'s server`}
                      type="text"
                      value={serverName}
                      onChange={(e) => setServerName(e.target.value)}
                      required />
                  </div>
                </label>
                <div className='terms-and-highlight'>
                  <div className='terms'>
                    By creating a server, you agree to This.cord's
                    <NavLink className='purple-highlight' to="/">&nbsp;Community GuideLines</NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className='button-container'>
              <span className=''>
                <button className='backButton' type="submit" onClick={() => setShowModal(false)} >
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
