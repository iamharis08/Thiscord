import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, NavLink} from 'react-router-dom';
import { io } from 'socket.io-client';

let socket;

function Server() {
  const user = useSelector(state => state.session.user)
  const [server, setServer] = useState({});
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([])
  const { serverId }  = useParams();

  const joinRoomHandler = (channelId) => {
    socket.emit('join', {"user": user, 'room': channelId})
  }

  useEffect(() => {
    if (!serverId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/servers/${serverId}`);
      const responseData = await response.json();

      setServer(responseData.server);
    //   console.log(responseData.users, 'RESPONSE USER ')
      setUsers(responseData.users)
      setChannels(responseData.channels)
    })();
  }, [serverId]);

  useEffect(() => {

    // create websocket/connect
    socket = io();

    // when component unmounts, disconnect
    // return (() => {
        // socket.disconnect()
    // })
}, [])

  if (!server) {
    return null;
  }

  return (
    <>
        <ul>
            <li>
                <strong>Server Id</strong> {serverId}
            </li>
            <li>
                <strong>Server Name</strong> {server.name}
            </li>
        </ul>
        <div>
            <strong>Users</strong>
                {users?.map(user => (
                    <li key={user?.id}>
                    {user?.username}
                    </li>
                ))}
        </div>
        <div>
            <strong>Channels</strong>
            {channels?.map(channel => (
            <li key={channel?.id}>
                <NavLink to={`/channels/${channel?.id}`} onClick={joinRoomHandler(channel?.id)}> {channel?.name}</NavLink>

            </li>
            ))}
        </div>
    </>
  );
}
export default Server;
