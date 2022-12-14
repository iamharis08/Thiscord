import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchOneServer } from '../store/server';

function Server() {
  // const [server, setServer] = useState({});
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([])
  const { serverId } = useParams();

  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const serverInfo = useSelector(state => state.server.server)
  const server = serverInfo.server
  console.log('THE SERVER', server)
  // console.log('users!', server.users)

  useEffect(() => {
    if (!serverId) {
      return;
    }

    dispatch(fetchOneServer(serverId))
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
  }, [serverId, dispatch]);

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
          <strong>Server Name</strong> {server?.name}
        </li>
      </ul>
      <div>
        <strong>Users</strong>
        {serverInfo?.users?.map(user => (
          <li key={user?.id}>
            {user?.username}
          </li>
        ))}
      </div>
      <div>
        <strong>Channels</strong>
        {serverInfo?.channels?.map(channel => (
          <li key={channel?.id}>
            <NavLink to={`/channels/${channel.id}`}> {channel?.name}</NavLink>

          </li>
        ))}
      </div>
    </>
  );
}
export default Server;
