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

    let yesterday3 = new Date();
    yesterday3.setDate(yesterday3.getDate() - 1)

    console.log(yesterday3.toString().split('G')[0], 'YESTERDAY')
    const now = Date(date).toString().split('G')[0]

    console.log(now, "TODAY")
    // console.log("yest", yesterday3)

    // console.log(Date(yesterday3), '<-- yesterday', new Date(new Date().setDate(now.getDate() - 1), "<--- today")
    // yesterday3 = Date(yesterday3).toString().split(' ')[0]

    // console.log(date.toString().split('-')[0], 'DATE!!', yesterday3, 'YESTERDAY!')

    // let check = new Date();
    // // console.log('CHECK!', check.(new Date().setDate(new Date().getDate() - 1)))
    // let yest = (check.setDate((check.getDate() - 1)))
    // console.log('yest', Date(yest))
    // console.log('setting', Date(check.setDate(check.getDate() - 1)))
    // check = check.setDate((check.getDate() - 1))
    // console.log(Date((check.setDate((check.getDate() - 1))))
    //   .split(' ').splice(0, 4).join(' ')
    //   , 'HERE IS OUR CHECK')
    // check = check.setDate(check.getDate() - 1)
    // console.log('DAAAAATEEEEE', dateO  bj)
    // check = Date(check).split('-')[0]
    // let dateCheck = Date(check).split('')[0]
    // console.log(dateObj, 'OUR DATE IN OBJ')

    // console.log(Date(date).split('-')[0], 'test test test!!!')

    // console.log(date, 'HERE IS CHECK!!!!', dateCheck, 'HERE IS DATE!!!!')
    // console.log(date, 'HERE IS DATE!!!!')

    // if (check.toDateString() === date.toDateString()) {
    //   return `Today at ${date.toLocaleDateString(date, { hour: 'numeric', minute: 'numeric' })}`
    // }
    // else if (date.toDateString() - check.toDateString() === 1) {
    //   return `Yesterday at ${date.toLocaleDateString(date, { hour: 'numeric', minute: 'numeric' })}`
    // }
    // else {
    //   let year = date.getFullYear()
    //   let month = date.getMonth()
    //   let day = date.getDate()
    //   let time = date.toLocaleTimeString()
    //   console.log('FRESH YEAR!!!! OLD YEAR!!!', `${day}/${month}/${year} at ${time}`)
    //   return `${day}/${month}/${year} at ${time}`
    // }

    return ''
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


      const currDate = new Date()




      // console.log(currDate, 'HERE IS CURRDATE')



      // const options = { weekday: 'short', }
      const dateStamp = currDate.toDateString().split('-')[0]
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
                    <span className='single-message-timestamp'>{message?.createdAt}</span>
                    <div>
                      {dateFormatter(message?.createdAt)}
                    </div>
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
