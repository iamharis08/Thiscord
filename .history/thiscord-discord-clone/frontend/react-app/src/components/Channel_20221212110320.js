import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Channel() {
  const [channel, setChannel] = useState({})
  const [messages, setMessages] = useState([]);
  const { channelId } = useParams();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/channels/${channelId}`);
      const responseData = await response.json();

      setMessages(responseData.messages)
      setChannel(responseData.channel)
    })();
  }, [channelId]);

  // if (!channel) {
  //   return null;
  // }

  return (
    <>
      <ul>
        <li>
          <strong>Channel Id</strong> {channel?.id}
        </li>
        <li>
          <strong>Channel Name</strong> {channel?.name}
        </li>
      </ul>

      <div>
        <strong>Messages</strong>
        {messages?.map(message => (
          <li key={message?.id}>
            {message?.user?.username}| &nbsp;{message?.message}
          </li>
        ))}
      </div>
    </>
  );
}
export default Channel;
