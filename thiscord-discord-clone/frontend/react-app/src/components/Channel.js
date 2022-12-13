import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

let socket;
function Channel() {
  const allMessages = useSelector(state => state.message.messages)
  const user = useSelector(state => state.session.user)
  const [channel, setChannel] = useState({})
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const { channelId } = useParams();

  const sendChat = (e) => {
    e.preventDefault()
    // emit a message
    console.log('BEFORE EMITTING CHAT', { user: user, msg: chatInput, room: channelId })
    socket.emit("chat", { user: user, msg: chatInput, room: channelId});
    // clear the input field after the message is sent
    setChatInput("")
  }
  
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/channels/${channelId}`);
      const responseData = await response.json();

      setMessages(responseData.messages)
      setChannel(responseData.channel)
    })();
  }, [channelId]);

  useEffect(() => {

    // create websocket/connect
    socket = io();

    // listen for chat events
    socket.on("chat", (chat) => {
        // when we recieve a chat, add it into our messages array in state
        setMessages([...allMessages])

    })

    // when component unmounts, disconnect
    return (() => {
        socket.disconnect()
    })
}, [])

const updateChatInput = (e) => {
  setChatInput(e.target.value)
};




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
            {message?.user?.username} | &nbsp;{message?.message}
          </li>
        ))}
      </div>
      <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
    </>
  );
}
export default Channel;
