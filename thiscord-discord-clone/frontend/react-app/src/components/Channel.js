import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { fetchMessages } from '../store/message';
// import {socket} from '../components/socketInstance.js'
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



  useEffect(() => {
    // listen for chat events
    (async () => {
      const response = await fetch(`/api/channels/${channelId}`);
      const responseData = await response.json();


      setChannel(responseData.channel)
      setMessages([...responseData.messages])

    })();
    socket = io();
    socket.emit('join', {"user": user, 'room': channelId})
    socket.on("chat", (chat) => {
      // when we recieve a chat, add it into our messages array in state

    // if (chat.user.id !== user.id){


      setMessages(messages => [...messages, chat]);

    // }
    })


     return (() => {
      socket.disconnect()

     })

    }, [])

  // useEffect(() => {




    //  socket.on("chat", (chat) => {
    //   // when we recieve a chat, add it into our messages array in state

    // if (chat.user.id !== user.id){


    //   setMessages(messages => [...messages, chat]);

    // }
    // })


    //  return (() => {
    //   socket.disconnect()

    //  })



  // }, []);





const updateChatInput = (e) => {
  setChatInput(e.target.value)
};


const sendChat = (e) => {
  e.preventDefault()
  // emit a message
  // console.log('BEFORE EMITTING CHAT', { user: user, msg: chatInput, room: channelId })
  socket.emit("chat", { user: user, message: chatInput, room: channelId});
  // clear the input field after the message is sent
  // setMessages(messages => [...messages, { user: user, message: chatInput, room: channelId }])

  setChatInput("")
}

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
        {messages?.map((message, i) => (
          <li key={i}>
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
