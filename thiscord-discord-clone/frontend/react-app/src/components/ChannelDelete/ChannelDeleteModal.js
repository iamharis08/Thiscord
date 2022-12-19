import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ChannelDeleteModal.css";
import { fetchChannels, removeChannel } from "../../store/channel"
import { fetchOneServer } from "../../store/server"

function ChannelDeleteModal({
    setShowDeleteChannelModal,
     setIsHidden,
     setUpdateChannels,
     updateChannels,
     channelId
    }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector((state) => state.session.user);
    const serverInfo = useSelector((state) => state.server.server);
    const [channelName, setChannelName] = useState();
    const [errors, setErrors] = useState([]);
    const channel = serverInfo.channels.find(channel => channel.id === channelId)


    const handleSubmit = (e) => {
        e.preventDefault();
        if (channelName === channel?.name) {
            return dispatch(removeChannel(channel)).then(() => {
                dispatch(fetchOneServer(serverInfo.server.id))
                setShowDeleteChannelModal(false);
                setUpdateChannels(!updateChannels)
                history.push(`/channels/${serverInfo?.channels[0]?.id}`)
            });
        }
    };


    return (
        <div className="delete-server-modal">
            <div className="delete-server-heading">Delete '{channel?.name}'</div>
            <div className="delete-confirmation">
                <p className="delete-confirmation-detail">
                    Are you sure you want to delete <span>{channel?.name}</span>?
                </p>
                <p className="delete-confirmation-detail">This action cannot be undone.</p>
            </div>
            <form className="create-server-form" onSubmit={handleSubmit}>
                <label className="input-label"></label>
                <div className="enter-server-name">ENTER CHANNEL NAME</div>
                <div>
                    <input
                        className="delete-input"
                        type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        required
                    />
                </div>
                <div className="delete-button-container">
                    <div className="delete-back-button" onClick={() => {
                        setShowDeleteChannelModal(false)
                        setIsHidden(true);
                    }}
                    >back</div>
                    <button className="delete-button" type="submit">Delete Channel</button>
                </div>
            </form>

        </div>
    );
}

export default ChannelDeleteModal;
