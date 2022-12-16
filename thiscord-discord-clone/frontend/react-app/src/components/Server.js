import React, { useState, useEffect } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EditServerModal from "./ServerForm/EditServerModal.js"
import { Modal } from "./context/Modal";
import { fetchOneServer } from "../store/server";
import "../css/SingleServer.css";
import Channel from './Channel'


function Server() {
  // const [server, setServer] = useState({});
  const history = useHistory()
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [channelId, setChannelId] = useState("");
  const [click, setClicks] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const serverObj = useSelector((state) => state.server.servers);
  const { serverId } = useParams();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const serverInfo = useSelector((state) => state.server.server);
  console.log(serverInfo, "SERVERINFOOOO")
  const server = serverInfo?.server;
  // console.log("THE SERVER", server);
  // console.log('users!', server.users)
  // console.log(serverInfo, "SUUUUUUUUUIIIIIIII")
  useEffect(() => {

    // setChannelId(channelIds)

    dispatch(fetchOneServer(serverId))
    .then(() => {
      if (!click && serverInfo?.channels) {
        setChannelId(serverInfo?.channels[0]?.id)
      }
      // console.log(serverObj[serverId].ownerId, "OWNER ID")
    })

    // .then(() => {
    // if(!click && channelIds){
    //   history.push(`/channels/${channelIds}`)

    // }else{history.push(`/channels/${serverInfo?.channels[0]?.id}`)}
    // else if(channelIds && clickedServer){
    //   // setChannelId(channelIds)
    //   history.push(`/channels/${channelIds}`)
    // }
    // })

    // .catch(async res => {
    // const data = await res.json()
    // console.log(data, 'data in FETCH ASYNC!!')
    // if (data && data.errors.length > 0) return null
    // })

    // (async () => {
    // const response = await fetch(`/api/servers/${serverId}`);
    // const responseData = await response.json();

    // setServer(responseData.server);
    //   console.log(responseData.users, 'RESPONSE USER ')
    // setUsers(responseData.users)
    // setChannels(responseData.channels)

    // })();
  }, [dispatch, serverId]);

  useEffect(() => {
    console.log("CHANELLLL ID", channelId)
    if (channelId && serverInfo?.channels) {
      console.log("CHANELLLLLLINHSITORY", channelId)
      history.push(`/channels/${channelId}`)

    }
  }, [channelId])


  if (!server) {
    return null;
  }

  return (
    <div className="main-container">
      <div className="server">
        {/* {serverObj[serverId] === user.id && */}
           <div className='server-title-container' onClick={() => setIsHidden(!isHidden)}>
          <span className='title-text'>
            {server.name}
          </span>
          <span className='settings-button'>
            >
          </span>
        </div>
        {/* } */}


        {!isHidden && (
          <div>
            <button onClick={() => {
              setShowModal(true)
            }}>
              Edit Server</button>
            <button>Delete Server</button>
          </div>
        )}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditServerModal
              setShowModal={setShowModal}
              setIsHidden={setIsHidden}
              showModal={showModal}
            />
          </Modal>
        )}

        <div className="channels-members-container">
          <div className="channels-list">
            <strong>Channels</strong>
            {serverInfo?.channels?.map((channel) => (
              <div key={channel?.id} >
                {console.log("CHANEEL LIKS", channel.id)}
                <NavLink
                  to={`/channels/${channel.id}`}>

                  {channel?.name}
                </NavLink>
              </div>
            ))}
          </div>
          {/* <div className="members-list">
            <strong>Members -</strong>
            {serverInfo?.users?.map((user) => (
              <p id="one-member" key={user?.id}>
                <img
                  id="member-profile"
                  src="https://www.svgrepo.com/show/331368/discord-v2.svg"
                  alt=""
                ></img>
                {user?.username}
              </p>
            ))}
          </div> */}
        </div>
      </div>
      {/* <div className="channel-bar-container">
      <div className="channel-bar">
          <Channel />
        </div>
        </div> */}
    </div>
  );
}
export default Server;
