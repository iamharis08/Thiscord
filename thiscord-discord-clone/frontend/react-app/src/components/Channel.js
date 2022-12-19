import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { fetchMessages } from '../store/message';
// import {socket} from '../components/socketInstance.js'

import { fetchOneChannel } from '../store/channel';
import '../css/Channel.css'

import { Modal } from "./context/Modal.js"
import SearchResultsModal from './SearchResults/SearchResultsModal';

let socket;

function Channel() {
  const dispatch = useDispatch()
  const { channelId } = useParams();

  const allMessages = useSelector(state => state.channel.messages)
  const the_channel = useSelector(state => state.channel)
  const user = useSelector(state => state.session.user)
  const currChannel = useSelector(state => state.channel)
  const serverInfo = useSelector((state) => state.server.server);

  const [channel, setChannel] = useState({})
  const [messageTime, setMessageTime] = useState('')
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [searchInput, setSearchInput] = useState("")


  const messageEnd = useRef(null);
  const searchRef = useRef({})
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)



  // SCROLL helper func
  const messageScroll = () => {
    messageEnd.current?.scrollIntoView({ behavior: "smooth" })
  }

  // needs update
  const dateFormatter = (date) => {

    return date
  }



  // Initializing SocketIO / Chat on load
  useEffect(() => {

    // initial channel message load
    (async () => {
      const response = await fetch(`/api/channels/${channelId}`);
      const responseData = await response.json();

      setChannel(responseData.channel)
      setMessages([...responseData.messages])
    })();

    // dispatch(fetchOneChannel(channelId))

    // initializing socket.io
    socket = io();
    socket.emit('join', { "user": user, 'room': channelId })
    socket.on("chat", (chat) => {

      const currDate = Date(chat.timestamp)
      const dateStamp = currDate.toString().split('-')[0]
      const res = { channelId: +chat.room, createdAt: dateStamp, message: chat.message, user: { ...chat.user } }
      setMessages(messages => [...messages, res]);

    })
    return (() => {
      socket.disconnect()
    })

  }, [channelId])


  // dispatching for new channel
  useEffect(() => {
    if (!channelId) {
      return null
    }
    dispatch(fetchOneChannel(+channelId))
  }, [dispatch, channelId])



  // SCROLL with useRef
  useEffect(() => {
    messageEnd.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])


  // INPUT length check
  const stringCheck = str => str.split(' ').filter(c => c !== '').join('').length >= 1
  const inputReducer = str => str.replace(/\s+/g, ' ').trim()


  // CHAT HELPER FUNCS
  const updateChatInput = (e) => {
    setChatInput(e.target.value)
  };

  const sendChat = (e) => {
    e.preventDefault()

    if (stringCheck(chatInput)) {
      socket.emit("chat", { user: user, message: chatInput, room: channelId, timestamp: new Date() });
    }

    setChatInput("")
  }



  // SEARCH HELPER FUNCS
  const updateSearchInput = (e) => {
    setSearchInput(e.target.value)
  }


  const sendSearch = async (e) => {
    e.preventDefault()

    if (stringCheck(searchInput)) {
    // if(searchInput.length) {

      const search = await fetch(`/api/channels/${channelId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ search: searchInput })
      })
      const searchRes = await search.json()
      const foundRes = searchRes?.messages
      setSearchResults(foundRes, 'foundRes')
      setShowSearchResults(true)
      setSearchInput("")
    }

    setSearchInput("")
  }

  const searchScroll = ref => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    })
  }

  // if (!channel) {
  //   return null;
  // }



  return (
    <div className='channel-container'>

      <div className='channel-header-container'>
        <span className='channel-hash'>
          #
        <span className='channel-name'>
          {channel?.name}
        </span>
        </span>
        <div className='search-form-container'>
          <form onSubmit={sendSearch} className='search-message-form-form'>
            <input
              className='search-message-form-input-container'
              value={searchInput}
              onChange={updateSearchInput}
              placeholder={`Search`}
            />
          </form>
          {showSearchResults && (
            <Modal onClose={() => setShowSearchResults(false)}>
              <SearchResultsModal
                setShowSearchResults={setShowSearchResults}
                showSearchResults={showSearchResults}
                messages={searchResults}
              />
            </Modal>
          )}
        </div>
      </div>
      <div className='messages-users-container'>
        <div className='message-input-container'>
          <div className='channel-messages-container'>
        {messages?.map((message, i) => (
          <div key={i}
            // ref={searchRef  [i]}
            ref={el => (searchRef.current[message.id] = el)}
            className='single-message-container'
            id={+i}
          >

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
                  </div>
                  <div className='single-message-message-info'>
                    {message?.message}
                    <div ref={messageEnd} />
                  </div>

                </>
              )}
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
      <div className="members-list">
            <strong>Members - {serverInfo?.users?.length}</strong>
            {serverInfo?.users?.map((user) => (
              <p id="one-member" key={user?.id}>
                <img
                  id="member-profile"
                  src="https://www.svgrepo.com/show/331368/discord-v2.svg"
                  alt=""
                ></img>
                {user?.username}
              </p>
            ))}
          </div>
      </div>
    </div>
  );
}
export default Channel;
