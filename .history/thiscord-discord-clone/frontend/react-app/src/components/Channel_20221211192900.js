import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Channel() {
  const [server, setServer] = useState({});
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([])
  const { channelId } = useParams();

  useEffect(() => {
    if (!channelId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/channel/${channelId}`);
      const responseData = await response.json();

      //   console.log(responseData.users, 'RESPONSE USER ')
      setUsers(responseData.messages)
      setChannels(responseData.channels)
    })();
  }, [channelId]);

  if (!channel) {
    return null;
  }

  return (
    <>
      <ul>
        <li>
          <strong>Server Id</strong> {channeld}
        </li>
        <li>
          <strong>Server Name</strong> {serve.name}
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
export default Channel;
