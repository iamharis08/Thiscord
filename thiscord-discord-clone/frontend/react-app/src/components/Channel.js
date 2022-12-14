import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { fetchMessages } from '../store/message';
// import {socket} from '../components/socketInstance.js'

import { fetchOneChannel } from '../store/channel';


let socket;

function Channel() {
  const dispatch = useDispatch()
  const allMessages = useSelector(state => state.message.messages)

  const user = useSelector(state => state.session.user)
  const [channel, setChannel] = useState({})
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const { channelId } = useParams();

  const currChannel = useSelector(state => state.channel)
  console.log(currChannel, 'CURRENT CHANNEL!!')

  useEffect(() => {
    // listen for chat events
    (async () => {
      const response = await fetch(`/api/channels/${channelId}`);
      const responseData = await response.json();
      // dispatch()

      setChannel(responseData.channel)
      setMessages([...responseData.messages])

    })();

    // dispatch(fetchOneChannel(channelId))

    socket = io();
    socket.emit('join', { "user": user, 'room': channelId })
    socket.on("chat", (chat) => {



      setMessages(messages => [...messages, chat]);


    })
    return (() => {
      socket.disconnect()

    })

  }, [])
  useEffect(() => {
    if (!channelId) {
      return
    }
    dispatch(fetchOneChannel(+channelId))
  }, [dispatch])

  //




  const updateChatInput = (e) => {
    setChatInput(e.target.value)
  };


  const sendChat = (e) => {
    e.preventDefault()
    socket.emit("chat", { user: user, message: chatInput, room: channelId });
    setChatInput("")
  }

  // if (!channel) {
  //   return null;
  // }

  return (
    <div className='channel-container'>
      <div className='channel-header-container'>
          <span className='channel-hash'>
            <strong>#</strong>
            </span>
            <span className='channel-name'>
             {channel?.name}
            </span>
      </div>
      <div className='channel-messages-container'>
        {messages?.map((message, i) => (
          <div key={i} className='single-message-container'>
            <div className='single-message-user-info'>
              {message?.user?.username} | "(timestamp)"
            </div>
            <div className='single-message-message-info'>
              {message?.message}
            </div>
          </div>
        ))}
      </div>
      <div className='message-form-container'>
        <form onSubmit={sendChat}>
          <input
            value={chatInput}
            onChange={updateChatInput}
          />
        </form>
      </div>
    </div>
  );
}
export default Channel;
