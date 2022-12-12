import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Channel() {
  const [channel, setChannel] = useState({})
  const [messages, setMessages] = useState([]);
  const { channelId }  = useParams();

  useEffect(() => {
    if (!channelId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/channels/${channelId}`);
      const responseData = await response.json();
      setChannel(responseData.channel);
    //   console.log(responseData.users, 'RESPONSE USER ')
      setUsers(responseData.users)
      // setChannels(responseData.channels)
    })();
  }, [serverId]);

  if (!server) {
    return null;
  }

  return (
    <>
    <ul>
      <li>
        <strong>Channel Id</strong> {channelId}
      </li>
      <li>
        <strong>Channel Name</strong> {channel.name}
      </li>
        </ul>
      <div>
        <strong>messages</strong>
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
