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
  const [showMenu, setShowMenu] = useState(false);
  const [showChannelMenu, setShowChannelMenu] = useState(false);
  const [showSettingIcon, setShowSettingIcon] = useState(-1);
  const serverObj = useSelector((state) => state.server.servers);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const serverInfo = useSelector((state) => state.server.server);
  const server = serverInfo?.server;

  const showSettingsIcon = (channelId) => {
    setShowSettingIcon(channelId)
  }
  const hideSettingsIcon = () => {
    setShowSettingIcon(-1)
  }

  const openMenu = (menu) => {
    if (showMenu) return;
    if (showChannelMenu) return;
    if (!showMenu && menu === "server") {setShowMenu(true);}
    if (!showChannelMenu && menu === "channel") { setShowChannelMenu(true)}
  };


  useEffect(() => {
    if (!showMenu) {return}
    const closeMenu = () => {
      setShowMenu(false);
    };

    // click event listener to whole doc -- if we click on page it will run
    // closeMenu!! -- really sets 'setShowMenu' to false or our slice of state on showing menu
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    if (!showChannelMenu) {return}
    const closeMenu = () => {
      setShowChannelMenu(false);
    };

    // click event listener to whole doc -- if we click on page it will run
    // closeMenu!! -- really sets 'setShowMenu' to false or our slice of state on showing menu
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showChannelMenu]);


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
          <div className='server-title-container' onClick={() => {setIsHidden(!isHidden); openMenu("server")}}>
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
        {showMenu && (
        // {!isHidden && !showMenu && (
          <div className="server-buttons-container">
          <button className="server-button" onClick={() => {
            history.push('/coming-soon')
          }}>
            Server Boost <span className="dropdown-img">
              {/* <img src={} alt='server buttons' /> */}
              </span></button>

          <button className="server-button invite" onClick={() => {
            history.push('/coming-soon')
          }}>
            Invite People <span className="dropdown-img">
              {/* <img src={invite} alt='server buttons' /> */}
              </span></button>

            <button className="server-button edit-server" onClick={() => {
              setShowModal(true)
            }}>
              Edit Server<span className="dropdown-img">
              {/* <img src={gear} alt='server buttons' /> */}
              </span></button>

            <button className="server-button delete-server" onClick={() => {
              setShowDeleteModal(true)
            }}>
              Delete Server<span className="dropdown-img">
              {/* <img src={trashGrey} alt='server buttons' /> */}
              </span></button>

            <button className="server-button" onClick={() => {
            history.push('/coming-soon')
          }}>
            Create Category <span className="dropdown-img">
              {/* <img src={fileplus} alt='server buttons' /> */}
              </span></button>

            <button className="server-button" onClick={() => {
            history.push('/coming-soon')
          }}>
            Create Event <span className="dropdown-img">
              {/* <img src={calendar} alt='server buttons' /> */}
              </span></button>

              <button className="server-button" onClick={() => {
            history.push('/coming-soon')
          }}>
            App Directory <span className="dropdown-img">
              {/* <img src={appdir} alt='server buttons' /> */}
              </span></button>

              <button className="server-button" onClick={() => {
            history.push('/coming-soon')
          }}>
            Notification Settings <span className="dropdown-img">
              {/* <img src={bell} alt='server buttons' /> */}
              </span></button>

              <button className="server-button" onClick={() => {
            history.push('/coming-soon')
          }}>
            Privacy Settings <span className="dropdown-img">
              {/* <img src={shield} alt='server buttons' /> */}
              </span></button>

              <button className="server-button" onClick={() => {
            history.push('/coming-soon')
          }}>
            Hide Muted Channels <span className="dropdown-img">
              {/* <img src={square} alt='server buttons' /> */}
              </span></button>

              <button className="server-button raid" onClick={() => {
            history.push('/coming-soon')
          }}>
            Report Raid <span className="dropdown-img">
              {/* <img src={flag} alt='server buttons' /> */}
              </span></button>



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
                  onClick={() => {setShowCreateChannelModal(true)}}
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
                      openMenu("channel")

                    }}>
                   <img src={gear} alt="settings" />
                  </span>
                }
              </div>
            ))}




            {showChannelMenu && (
            // {!channelIsHidden && !showMenu && (

              <div className="channels-buttons-container">
                <button className="server-button edit-server" onClick={() => {
                  setShowChannelModal(true)
                }}>
                  Edit Channel<span className="dropdown-img">
              {/* <img src={gear} alt='server buttons' /> */}
              </span></button>
                <button className="server-button delete-server"onClick={() => {
                  setShowDeleteChannelModal(true)
                }}>
                  Delete Channel<span className="dropdown-img">
                  {/* <img src={trashGrey} alt='server buttons' /> */}
              </span></button>
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
