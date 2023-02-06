import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { fetchMessages } from "../store/message";
import trash from "../css/images/trash.svg"
import { fetchOneChannel } from "../store/channel";
import "../css/Channel.css";

import { Modal } from "./context/Modal.js";
import SearchResultsModal from "./SearchResults/SearchResultsModal";

import { v4 as uuidv4 } from "uuid";

let socket;

function Channel() {
  const dispatch = useDispatch();
  const { channelId } = useParams();

  const allMessages = useSelector((state) => state.channel.messages);
  const the_channel = useSelector((state) => state.channel);
  const user = useSelector((state) => state.session.user);
  const currChannel = useSelector((state) => state.channel.channel);
  const serverInfo = useSelector((state) => state.server.server);

  const [channel, setChannel] = useState({});
  const [messageTime, setMessageTime] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [showOptions, setShowOptions] = useState("");
  const [showEditInput, setShowEditInput] = useState(false);
  const [editInput, setEditInput] = useState('');
  const [editInputIndex, setEditInputIndex] = useState('');
  const [edited, setEdited] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const messageEnd = useRef(null);
  const searchRef = useRef({});
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // SCROLL helper func
  const messageScroll = () => {
    messageEnd.current?.scrollIntoView({ behavior: "smooth" });
  };

  // needs update
  const dateFormatter = (date) => {
    return date;
  };


  // Initializing SocketIO / Chat on load
  useEffect(() => {
    // initial channel message load
    (async () => {
      const response = await fetch(`/api/channels/${channelId}`);
      const responseData = await response.json();

      setChannel(responseData.channel);
      setMessages([...responseData.messages]);
    })();

    // dispatch(fetchOneChannel(channelId))

    // initializing socket.io
    socket = io();
    socket.emit("join", { user: user, room: channelId });
    socket.on("chat", (chat) => {
      const currDate = Date(chat.timestamp);
      const dateStamp = currDate.toString().split("-")[0];
      const res = {
        channelId: +chat.room,
        createdAt: dateStamp,
        message: chat.message,
        liveId: chat.live_id,
        isEdited: chat.is_edited,
        user: { ...chat.user },
      };
      setMessages((messages) => [...messages, res]);
    });

    socket.on("update", (updated_chat) => {
      setEdited(!edited)
      console.log(updated_chat, "UPDATED RETURNEDDD FROM EMIT")
      const res = {
        channelId: +updated_chat.room,
        createdAt: updated_chat.created_at,
        message: updated_chat.message,
        liveId: updated_chat.live_id,
        isEdited: updated_chat.is_edited,
        user: { ...updated_chat.user },
      };
      const index = messages.findIndex(
        (message) => message.liveId === updated_chat.live_id
      );
      let newMessages = messages;
      newMessages[index] = res;
      console.log(newMessages, "NEW MESSAGESSSSSSSSSSSSSSSSS")
      setMessages(newMessages => [...newMessages]);
    });

    socket.on("delete", (delete_chat) => {
      const index = messages.findIndex(
        (message) => message.live_id === delete_chat.live_id
      );
      let newMessages = messages;
      newMessages.splice(index, 1);
      setMessages((newMessages) => [...newMessages]);
    });
    return () => {
      socket.disconnect();
    };
  }, [channelId, currChannel, edited]);

  // dispatching for new channel
  useEffect(() => {
    if (!channelId) {
      return null;
    }
    dispatch(fetchOneChannel(+channelId));
  }, [dispatch, channelId]);

  // SCROLL with useRef
  useEffect(() => {
    messageEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // INPUT length check
  const stringCheck = (str) =>
    str
      .split(" ")
      .filter((c) => c !== "")
      .join("").length >= 1;
  const inputReducer = (str) => str.replace(/\s+/g, " ").trim();

  // CHAT HELPER FUNCS
  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const updateEditInput = (e) => {
    setEditInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();

    if (stringCheck(chatInput)) {
      socket.emit("chat", {
        user: user,
        message: chatInput,
        room: channelId,
        timestamp: new Date(),
        live_id: uuidv4(),
      });
    }

    setChatInput("");
  };

  const sendUpdatedChat = (e, message) => {
    e.preventDefault();

    console.log(message, "EDIT SUBMITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
    if (stringCheck(editInput)) {
      socket.emit("update", {
        id: message.id,
        user: user,
        room: channelId,
        message: editInput,
        is_edited: true,
        created_at: message.createdAt,
        live_id: message.liveId,
      });
    }

    setChatInput("");
  };

  const deleteChat = (e, message) => {
    e.preventDefault();

    socket.emit("delete", {
      user: user,
      room: channelId,
      live_id: message.liveId,
    });

    setChatInput("");
  };

  // SEARCH HELPER FUNCS
  const updateSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const sendSearch = async (e) => {
    e.preventDefault();

    if (stringCheck(searchInput)) {
      // if(searchInput.length) {

      const search = await fetch(`/api/channels/${channelId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: searchInput }),
      });
      const searchRes = await search.json();
      const foundRes = searchRes?.messages;
      setSearchResults(foundRes, "foundRes");
      setShowSearchResults(true);
      setSearchInput("");
    }

    setSearchInput("");
  };

  const searchScroll = (ref) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };



  const messageOptionsComponent = (i, message) => {
    if (message.user.id === user.id) {
      return (
        <div className="message-options-container">
          <div className="message-edit-button" onClick={() => {
            setShowEditInput(true)
            setEditInput(message.message)
            setEditInputIndex(i)
            }}>`<img src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1675642900/this.cord%20images/pencil-solid_tsonqb.svg`} />`</div>
          <div className="message-delete-button"><img src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1675642406/this.cord%20images/trash-can-grey_bpmqlk.svg`} alt="delete" /></div>
        </div>
      );
    } else return null;
  };

  return (
    <div className="channel-container">
      <div className="channel-header-container">
        <span className="channel-hash">
          #<span className="channel-name">{channel?.name}</span>
        </span>
        <div className="search-form-container">
          <form onSubmit={sendSearch} className="search-message-form-form">
            <input
              className="search-message-form-input-container"
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
      <div className="messages-users-container">
        <div className="message-input-container">
          <div className="channel-messages-container">
            {messages?.map((message, i) => (
              <div
                key={i}
                onMouseOver={() => setShowOptions(i)}
                onMouseLeave={() => setShowOptions("")}
                // ref={searchRef  [i]}
                ref={(el) => (searchRef.current[message.id] = el)}
                className="single-message-container"
                id={+i}
              >
                {showOptions === i && messageOptionsComponent(i, message)}
                {message &&
                messages[i - 1]?.user?.id !== messages[i]?.user?.id ? (
                  <>
                    <div className="single-message-user-info">
                      <span className="single-message-username">
                        {" "}
                        {message?.user?.username}{" "}
                      </span>
                      <span className="single-message-user-timestamp">
                        {" "}
                        {message?.createdAt}{" "}
                      </span>
                    </div>
                    {(showEditInput && (editInputIndex === i))  ? null : (<div className="single-message-message-info">
                      {message?.message}
                    </div>) }
                  </>
                ) : (
                  <>
                    <div className="single-message-user-info">
                      <span className="single-message-timestamp">
                        {dateFormatter(message?.createdAt)}
                      </span>
                    </div>

                      {(showEditInput && (editInputIndex === i))  ? null : (<div className="single-message-message-info">
                      {message?.message}
                    </div>) }
                      <div ref={messageEnd} />

                  </>
                )}
                {showEditInput && (editInputIndex === i) &&
                (
                <form onSubmit={(e) => sendUpdatedChat(e, message)} className="message-form-form">
              <input
                className="message-form-input-container"
                value={editInput}
                onChange={updateEditInput}
                placeholder={`Message #${message.message}`}
              />
              <div className="cancel-edit" onClick={() => setShowEditInput(false)}>cancel</div>
            </form>
                )

                }
              </div>
            ))}
          </div>
          <div className="message-form-container">
            <form onSubmit={sendChat} className="message-form-form">
              <input
                className="message-form-input-container"
                value={chatInput}
                onChange={updateChatInput}
                placeholder={`Message #${channel.name}`}
              />
            </form>
          </div>
        </div>
        <div className="members-list">
          <strong>Members - {serverInfo?.users?.length}</strong>
          {serverInfo?.users?.map((user, i) => (
            <NavLink to="/coming-soon">
              <p id="one-member" key={i}>
                <img
                  id="member-profile"
                  src="https://www.svgrepo.com/show/331368/discord-v2.svg"
                  alt=""
                ></img>
                {user?.username}
              </p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Channel;
