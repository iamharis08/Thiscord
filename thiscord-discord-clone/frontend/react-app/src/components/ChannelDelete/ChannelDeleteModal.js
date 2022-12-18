import React, { useState, useEffect } from "react";
// import { createServer } from "../../store/server";
import { useDispatch } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ChannelDeleteModal.css";
// import { removeServer } from "../../store/server";
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
    //   const channel = useSelector((state) => state.channel.channel)
    const serverInfo = useSelector((state) => state.server.server);
    const [channelName, setChannelName] = useState();
    const [errors, setErrors] = useState([]);
    //   const channel = serverInfo?.channels[channelId]?.name
    const channel = serverInfo.channels.find(channel => channel.id === channelId)


    console.log("DID THE CHANNEL?", channel)
    console.log(serverInfo, "SERVER INFOOOOOOO")

    const handleSubmit = (e) => {
        e.preventDefault();
        if (channelName === channel?.name) {
            return dispatch(removeChannel(channel)).then(() => {
                dispatch(fetchOneServer(serverInfo.server.id))
                setShowDeleteChannelModal(false);
                setUpdateChannels(!updateChannels)
                history.push("/servers")
            });
        }
        // setErrors([]);



        // .catch(async (res) => {
        //   const data = await res.json();
        //   console.log("THE DATA OF THE NEW SERVER", data)
        //   if (data) setErrors(Object.values(data));
        //   else return (<Redirect to={'/servers'} />);
        // });
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
                        // placeholder={`${user.username}'s server`}
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
