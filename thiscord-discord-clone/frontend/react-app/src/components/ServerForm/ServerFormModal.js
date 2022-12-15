import React, { useState, useEffect } from 'react';
import { createServer } from '../../store/server'
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./ServerForm.css"
// import '../button.css';

function ServerFormModal({ setShowModal }) {

  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const [serverName, setServerName] = useState(`${user.username}'s server`);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(createServer({ serverName }))
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data) setErrors(Object.values(data));
        else return (<Redirect to="/servers" />);
      });
  }

  return (
    <>
      <div className='create-server-form'>
        <form onSubmit={handleSubmit}>
          {errors[0] ? (<ul className='errors'>
            <li>{errors[0]}</li>
          </ul>) : ''}
          <div className='container'>
            <div>
              <label>
                <input
                  className="input top"
                  // placeholder={`${user.username}'s server`}
                  type="text"
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className='signupLogInButtonDiv'>
              <div className='signupLogInButtonDiv'>
                <button className='submitForm' type="submit">
                  Create
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ServerFormModal;
