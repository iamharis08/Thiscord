import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Server() {
  const [server, setServer] = useState({});
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([])
  const { serverId }  = useParams();

  useEffect(() => {
    if (!serverId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/servers/${serverId}`);
      const responseData = await response.json();
      console.log("IN USEEFECT LOADING SERVER!")
      setServer(responseData.server);
    //   console.log(responseData.users, 'RESPONSE USER ')
      setUsers(responseData.users)
      setChannels(responseData.channels)
    })();
  }, [serverId]);

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
            {channel?.name}
            </li>
            ))}
        </div>
    </>
  );
}
export default Server;
