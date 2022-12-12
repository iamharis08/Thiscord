import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Channel() {
  const [server, setChannel] = useState({});
  const [message, setMessages] = useState([]);
  const [channel, setChannel] = useState([])
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
      setChannel(responseData.channels)
    })();
  }, [channelId]);

  if (!channel) {
    return null;
  }

  return (
    <>
      <ul>
        <li>
          <strong>Server Id</strong> {channelId}
        </li>
        <li>
          <strong>Server Name</strong> {channel.name}
        </li>
      </ul>

      <div>
        <strong>Channels</strong>
        {channels?.map(channel => (
          <li key={channel?.id}>
            {channel?.name}
          </li>
        ))}
      </div>
      <div>
        <strong>Messages</strong>
        {messages?.map(message => (
          <li key={message?.id}>
            {message?.user_id}&nbsp;{message?.message}
          </li>
        ))}
      </div>
    </>
  );
}
export default Channel;
