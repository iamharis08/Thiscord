import React, { useState, useEffect } from 'react';
import { fetchUpdateServer } from '../../store/server'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import "./ServerForm.css"

function EditServerModal({ setShowModal, setIsHidden }) {

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const serverObj = useSelector((state) => state.server.server);
    //   console.log("THIS IS A SERVER OBJ", serverObj)
    const [serverName, setServerName] = useState(serverObj.server.name);
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        if(stringCheck(serverName)){

            setIsHidden(true);
            const updatedServer = {
                id: serverObj.server.id,
                name: inputReducer(serverName),
                ownerId: user.id
            }
            return dispatch(fetchUpdateServer(updatedServer))
                .then(() => { setShowModal(false) })
        } else {
            setErrors(['Name needs to be at least three characters'])
        }
        // .catch(async (res) => {
        //   const data = await res.json();
        //   console.log("THE DATA OF THE NEW SERVER", data)
        //   if (data) setErrors(Object.values(data));
        //   else return (<Redirect to={'/servers'} />);
        // });
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
                        Give your server a personality with a name. You can always change it later
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
                                            minlength='3'
                                            maxlength='50'
                                            onChange={(e) => setServerName(e.target.value)}
                                            required />
                                    </div>
                                </label>
                                {/* <div className='terms-and-highlight'>
                  <div className='terms'>
                    By creating a server, you agree to This.cord's
                    <NavLink className='purple-highlight' to="/">&nbsp;Community GuideLines</NavLink>
                  </div>
                </div> */}
                            </div>
                        </div>
                        <div className='button-container'>
                            <span className=''>
                                <button className='backButton' type="button" onClick={() => {
                                    setShowModal(false)
                                    setIsHidden(true);
                                }} >
                                    Back
                                </button>
                            </span>
                            <span className=''>
                                <button className='createButton' type="submit">
                                    Update
                                </button>
                            </span>
                        </div>
                    </div>
                </form>
            </div >
        </>
    );
}

export default EditServerModal;
