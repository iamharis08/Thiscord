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
      setChannel(responseData.channel);
      //   console.log(responseData.users, 'RESPONSE USER ')
      setMessages(responseData.messages)
      // setChannels(responseData.channels)
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
            {message?.message}
          </li>
        ))}
      </div>
      {/* <div>
<strong>Channels</strong>
        {channels?.map(channel => (
          <li key={channel?.id}>
          {channel?.name}
            </li>
        ))}
</div> */}
    </>
  );
}
export default Channel;
