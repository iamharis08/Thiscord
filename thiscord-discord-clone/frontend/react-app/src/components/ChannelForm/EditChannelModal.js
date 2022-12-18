import React, { useState, useEffect } from 'react';
import { fetchUpdateChannel, } from '../../store/channel'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { fetchOneServer } from "../../store/server"
import "../ServerForm/ServerForm.css"

function EditChannelModal({ setShowModal, setIsHidden, setUpdateChannels, updateChannels, channelId }) {

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const serverObj = useSelector((state) => state.server.server);
    const serverInfo = useSelector((state) => state.server.server);
    //   console.log("THIS IS A SERVER OBJ", serverObj)
    const [channelName, setChannelName] = useState();
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        setIsHidden(true);
        const updatedChannel = {
            id: channelId,
            name: channelName,
            serverId: serverInfo.server.id
        }
        return dispatch(fetchUpdateChannel(updatedChannel))
            .then(() => {
                dispatch(fetchOneServer(serverInfo.server.id))
                setShowModal(false)
                setUpdateChannels(!updateChannels)
            })
            .catch(async (res) => {
                const data = await res.json();
                console.log("THE DATA OF THE NEW Channel", data)
                if (data) setErrors(Object.values(data));
                else return (<Redirect to={`/servers/${serverInfo.server.id}`} />);
            });
    }

    return (
        <>
            <div className='create-server-modal'>
                <form className="create-server-form" onSubmit={handleSubmit}>
                    {errors[0] ? (<ul className='errors'>
                        <li>{errors[0]}</li>
                    </ul>) : ''}
                    <div className='create-text'>
                        Customize your channel
                    </div>
                    <div className='create-description'>
                        Give your Channel a personality with a name. You can always change it later
                    </div>
                    <div className='container-and-buttons'>
                        <div className='container'>
                            <div className='input-and-terms'>
                                <label className='input-label'>
                                    <div className='server-name'>
                                        CHANNEL NAME
                                    </div>
                                    <div>
                                        <input className="input"
                                            // placeholder={`${user.username}'s server`}
                                            type="text"
                                            value={channelName}
                                            onChange={(e) => setChannelName(e.target.value)}
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

export default EditChannelModal;
