import React, { useState, useEffect } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EditServerModal from "./ServerForm/EditServerModal.js"
import ServerDeleteModal from "./ServerDelete/ServerDeleteModal"
import EditChannelModal from "./ChannelForm/EditChannelModal.js"
import ChannelDeleteModal from "./ChannelDelete/ChannelDeleteModal.js"
import LogoutButton from "./auth/LogoutButton"
import { Modal } from "./context/Modal";
import { fetchOneServer, fetchServers } from "../store/server";
import "../css/SingleServer.css";
import Channel from './Channel'
import CreateChannelModal from "./CreateChannel/CreateChannelModal.js";
import gear from '../css/images/gear-solid.svg'

function Server({ serverId }) {
  const history = useHistory()
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [channelId, setChannelId] = useState("");
  const [channel, setChannel] = useState("");
  const [click, setClicks] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [channelIsHidden, setChannelIsHidden] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showChannelModal, setShowChannelModal] = useState(false);
  const [showDeleteChannelModal, setShowDeleteChannelModal] = useState(false);
  const [updateServers, setUpdateServers] = useState("false");
  const [updateChannels, setUpdateChannels] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);

  const serverObj = useSelector((state) => state.server.servers);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const serverInfo = useSelector((state) => state.server.server);
  const server = serverInfo?.server;

  useEffect(() => {
    dispatch(fetchOneServer(serverId))
      .then((server) => {
        if (!click && server?.channels) {
          setChannelId(server?.channels[0]?.id)
          return server?.channels[0]?.id
        }
      }).then((channelid) => {
        dispatch(fetchServers(user?.id))
        return channelid
      }
      ).then((channelid) => {
        if (channelid) {
          history.push(`/channels/${channelid}`)
        }
      })

  }, [dispatch, updateServers, serverId]);


  useEffect(() => {
    if (channelId && serverInfo?.channels) {
      history.push(`/channels/${channelId}`)
    }
  }, [channelId])


  if (!server) {
    return null;
  }


  return (
    <div className="main-container">
      <div className="server">
        {serverInfo.server.ownerId === user.id ?
          <div className='server-title-container' onClick={() => setIsHidden(!isHidden)}>
            <span className='title-text'>
              {server.name}
            </span>
            <span className='server-settings-button'>
              {">"}
            </span>
          </div>
          :
          <div className='server-title-container-no-click'>
            <span className='title-text'>
              {server.name}
            </span>
          </div>
        }
        {!isHidden && (
          <div>
            <button onClick={() => {
              setShowModal(true)
            }}>
              Edit Server</button>
            <button onClick={() => {
              setShowDeleteModal(true)
            }}>
              Delete Server</button>
          </div>
        )}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditServerModal
              setShowModal={setShowModal}
              setIsHidden={setIsHidden}
              showModal={showModal}
            />
          </Modal>
        )}
        {showDeleteModal && (
          <Modal onClose={() => setShowDeleteModal(false)}>
            <ServerDeleteModal
              setShowDeleteModal={setShowDeleteModal}
              showDeleteModal={showDeleteModal}
              setIsHidden={setIsHidden}
              setUpdateServers={setUpdateServers}
            />
          </Modal>
        )}
        <div className="channels-members-container">
          <div className="channels-list">

            <div className="channel-list-title">
              <strong>TEXT CHANNELS</strong>
              {user.id === serverInfo.server.ownerId ? (
                <div
                  className="add-channel-button"
                  onClick={() => setShowCreateChannelModal(true)}
                >
                  +
                </div>
              ) : null}
            </div>
            {serverInfo?.channels?.map((channel) => (
              <div key={channel?.id} className="channel-list-item"  onClick={() => {
                setChannelId(channel.id)
                history.push(`/channels/${channel.id}`)
              }
              }>
                <div className="channel-name">
                  <span className=".channel-list-hash">#</span>&nbsp;{channel?.name}
                </div>
                {serverInfo.server.ownerId === user.id &&
                  <span className="channel-settings-button"
                    onClick={() => {
                      setChannelId(channel.id)
                      setChannelIsHidden(!channelIsHidden)
                      setChannel(channel)
                    }}>
                    <img src={gear} alt="settings" />
                  </span>
                }
              </div>
            ))}


            <div className='logout-user-container'>
              <div className="general-bar-user">
                <img
                  id="member-profile"
                  src="https://www.svgrepo.com/show/331368/discord-v2.svg"
                  alt=""
                ></img>
                {user.username}
              </div>
              <div className="logout-button">
                <LogoutButton />
              </div>
            </div>

            {!channelIsHidden && (
              <div>
                <button onClick={() => {
                  setShowChannelModal(true)
                }}>
                  Edit Channel</button>
                <button onClick={() => {
                  setShowDeleteChannelModal(true)
                }}>
                  Delete Channel</button>
              </div>
            )}
            {showChannelModal && (
              <Modal onClose={() => {
                setChannelIsHidden(true)
                setShowChannelModal(false)
              }}>
                <EditChannelModal
                  channel={channel}
                  setShowModal={setShowChannelModal}
                  setIsHidden={setChannelIsHidden}
                  setUpdateChannels={setUpdateChannels}
                  updateChannels={updateChannels}
                  showModal={showModal}
                  channelId={channelId}
                />
              </Modal>
            )}
            {showDeleteChannelModal && (
              <Modal onClose={() => {
                setShowDeleteChannelModal(false)
                setChannelIsHidden(true)
              }}>
                <ChannelDeleteModal
                  setShowDeleteChannelModal={setShowDeleteChannelModal}
                  showDeleteChannelModal={showDeleteChannelModal}
                  setIsHidden={setChannelIsHidden}
                  setUpdateChannels={setUpdateChannels}
                  updateChannels={updateChannels}
                  channelId={channelId}
                />
              </Modal>
            )}
          </div>
        </div>
      </div>
      {showCreateChannelModal && (
        <Modal onClose={() => setShowCreateChannelModal(false)}>
          <CreateChannelModal
            setShowCreateChannelModal={setShowCreateChannelModal}
          />
        </Modal>
      )}
    </div>
  );
}
export default Server;
