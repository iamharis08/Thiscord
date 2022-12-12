import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Channel() {
  const [channel, setChannel] = useState({})
  const [messages, setMessages] = useState([]);
  const { channelId } = useParams();

  useEffect(() => {
    if (!channelId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/channels/${channelId}`);
      const responseData = await response.json();

      //   console.log(responseData.users, 'RESPONSE USER ')
      setMessages(responseData.messages)
      setChannel(responseData.channel)
    })();
  }, [channelId]);

  if (!channel) {
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
