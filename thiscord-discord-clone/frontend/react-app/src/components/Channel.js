import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { fetchMessages } from '../store/message';
// import {socket} from '../components/socketInstance.js'

import { fetchOneChannel } from '../store/channel';
import '../css/Channel.css'



let socket;

function Channel() {
  const dispatch = useDispatch()
  const allMessages = useSelector(state => state.message.messages)
  const the_channel = useSelector(state => state.channel.channel)
  // console.log(the_channel, 'HERE IS OUR ALLMESSAGGES INFO!!!!')

  const user = useSelector(state => state.session.user)
  const [channel, setChannel] = useState({})
  const [messageTime, setMessageTime] = useState('')
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const { channelId } = useParams();

  const currChannel = useSelector(state => state.channel)
  // console.log(currChannel, 'CURRENT CHANNEL!!')

  console.log(messageTime, 'HERE IS MESSAGE TIME!')
  useEffect(() => {
    // listen for chat events
    (async () => {
      const response = await fetch(`/api/channels/${channelId}`);
      const responseData = await response.json();
      // dispatch()
      // console.log(responseData, "INITIAL RESPONSE DATA")


      setChannel(responseData.channel)
      setMessages([...responseData.messages])

    })();

    // dispatch(fetchOneChannel(channelId))

    socket = io();
    socket.emit('join', { "user": user, 'room': channelId })

    socket.on("chat", (chat) => {

      console.log(chat, "HERE IS OUR CHAT OBJ")
      // outputChat(chat)
      console.log(user, 'OUR USER')
      setMessageTime(chat.timestamp)
      console.log(messages, 'HERE ARE MESSAGES IN ON!!')
      const currDate = Date()
      const dateStamp = currDate.split('-')[0]
      console.log(dateStamp, 'SPLIT!')
      const res = { channelId: +chat.room, createdAt: dateStamp, message: chat.message, user: { ...chat.user } }
      console.log(res, "RES RES RES RES RES")

      setMessages(messages => [...messages, res]);


    })
    return (() => {
      socket.disconnect()

    })

  }, [])

  // dispatching for new channel
  useEffect(() => {
    if (!channelId) {
      return null
    }
    dispatch(fetchOneChannel(+channelId))
  }, [dispatch, channelId])

  //


  // const outputChat = (chat) => {
  //   console.log('in OUTPUT CHATT!', chat)
  //   return (
  //     <>
  //       <>
  //         <div className='single-message-user-info'>
  //           <span className='single-message-username'> {chat?.user?.username} </span> {" "} <span className='single-message-user-timestamp'> {chat?.timestamp} </span>
  //         </div>
  //         <div className='single-message-message-info'>
  //           {chat?.message}
  //         </div>
  //       </>
  //     </>
  //   )
  // }


  const updateChatInput = (e) => {
    setChatInput(e.target.value)
  };


  const sendChat = (e) => {
    e.preventDefault()
    socket.emit("chat", { user: user, message: chatInput, room: channelId, timestamp: Date.now() });
    setChatInput("")
  }

  // if (!channel) {
  //   return null;
  // }

  return (
    <div className='channel-container'>
      <div className='channel-header-container'>
        <span className='channel-hash'>
          <strong># {" "}</strong>
        </span>
        <span className='channel-name'>
          {channel?.name}
        </span>
      </div>
      <div className='channel-messages-container'>
        {messages?.map((message, i) => (
          <div key={i} className='single-message-container'>
            {message && messages[i - 1]?.user?.id !== messages[i]?.user?.id ? (
              <>
                <div className='single-message-user-info'>
                  <span className='single-message-username'> {message?.user?.username} </span> <span className='single-message-user-timestamp'> {message?.createdAt} </span>
                </div>
                <div className='single-message-message-info'>
                  {message?.message}
                </div>
              </>
            )
              : (
                <>
                  <div className='single-message-user-info'>
                    <span className='single-message-timestamp'>{message?.createdAt}</span>
                  </div>
                  <div className='single-message-message-info'>
                    {message?.message}
                  </div>
                </>
              )}
          </div>
        ))}
        <div>
          {/* {outputChat} */}
        </div>
      </div>
      <div className='message-form-container'>
        <form onSubmit={sendChat} className='message-form-form'>
          <input
            className='message-form-input-container'
            value={chatInput}
            onChange={updateChatInput}
            placeholder={`Message #${channel.name}`}
          />
        </form>
      </div>
    </div>
  );
}
export default Channel;
