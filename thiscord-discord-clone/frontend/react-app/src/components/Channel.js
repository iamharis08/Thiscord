import React, { useState, useEffect, useRef } from 'react';
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


  const messageEnd = useRef(null);


  const messageScroll = () => {
    messageEnd.current?.scrollIntoView({ behavior: "smooth" })
  }


  const dateFormatter = (date) => {

    // let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    // console.log(`Yesterday (oneliner)\n${yesterday}`);


    // let yesterday2 = new Date(Date.now() - 86400000)
    // console.log(yesterday2, 'YESTERDAY 2')

    // let yesterday3 = new Date(date.setDate(date.getDate() -1))
    console.log()


    return date
  }



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

      // setMessageTime(chat.timestamp)


      const currDate = Date(chat.timestamp)
      console.log(currDate, 'CUR DATE')




      console.log(Date(chat.timestamp), 'HERE IS CHAT')



      // const options = { weekday: 'short', }
      const dateStamp = currDate.toString().split('-')[0]
      // testing formatting
      // const dateStamp = currDate.toString()
      console.log(dateStamp, 'HERE IS OUR DATESTAMP!!')
      // console.log(dateStamp, 'SPLIT!')
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

  useEffect(() => {
    messageEnd.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])


  const updateChatInput = (e) => {
    setChatInput(e.target.value)
  };


  const sendChat = (e) => {
    e.preventDefault()
    // console.log('SENDING:::', { user: user, message: chatInput, room: channelId, timestamp: new Date() })
    socket.emit("chat", { user: user, message: chatInput, room: channelId, timestamp: new Date() });
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
            {/* {console.log(message, 'IN JSX!!')} */}
            {message && messages[i - 1]?.user?.id !== messages[i]?.user?.id ? (
              <>
                <div className='single-message-user-info'>
                  <span className='single-message-username'> {message?.user?.username} </span>
                  <span className='single-message-user-timestamp'> {message?.createdAt} </span>
                </div>
                <div className='single-message-message-info'>
                  {message?.message}
                </div>
              </>
            )
              : (
                <>
                  <div className='single-message-user-info'>
                    <span className='single-message-timestamp'>{dateFormatter(message?.createdAt)}</span>
                    {/* <div>
                      {dateFormatter(message?.createdAt)}
                    </div> */}
                  </div>
                  <div className='single-message-message-info'>
                    {message?.message}
                  </div>
                </>
              )}
            <div ref={messageEnd} />
          </div>
        ))}
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
