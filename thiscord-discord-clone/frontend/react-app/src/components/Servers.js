import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneServer, fetchServers } from "../store/server";
import "../css/Server.css";
import Server from "./Server.js";
import { fetchOneChannel } from "../store/channel";

import { Modal } from "./context/Modal.js";
import ServerFormModal from "./ServerForm/ServerFormModal";

function ServersList() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const serverObj = useSelector((state) => state.server.servers);
  const serverObj2 = useSelector((state) => state.server.server);
  const [clicked, setClick] = useState(false);
  const [hoveredId, setHoveredId] = useState(-1);
  const [serverId, setServerId] = useState("");
  const [channelId, setChannelId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const serverArr = Object.values(serverObj)

  useEffect(() => {
    dispatch(fetchServers(user?.id)).then(() => {
      if (!clicked) {
        setServerId(Object.values(serverObj)[0]?.id);
      }
    });

  }, [dispatch, serverId]);


  const displayServerName = (serverId) => {
    setHoveredId(serverId);
  };

  const hideServerName = () => {
    setHoveredId(-1);
  };

  const abbreviate = (serverName) => {
    let initials = [serverName[0]];

    for (let i = 0; i < serverName.length; i++) {
      serverName[i - 1] === " " && serverName[i] !== " " && initials.push(serverName[i]);
    }

    return initials.length <= 5 ? initials.join("") : initials.slice(0, 5);
  };

  const serverComponents = Object.values(serverObj).map((server, i) => {
    return (
      <div className="listItem" key={i}>
        {hoveredId === server?.id && (
          <span className="hiddenItems">
            <span className="whiteNub"></span>
            <span className="textBox">
              <span className="triangle"></span>
              <span className="serverNames">{server?.name}</span>
            </span>
          </span>
        )}
        <div
          onClick={() => {
            setClick(true);
            setServerId(server?.id);
          }}
          className="serverIcon"
          onMouseOut={hideServerName}
          onMouseOver={() => displayServerName(server?.id)}>
          <div className="link">{server && abbreviate(server?.name)}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="main">
      <div className="bg">
        {hoveredId === 1000000 && (
          <span className="dmHiddenItems">
            <span className="dmWhiteNub"></span>
            <span className="dmtTextBox">
              <span className="dmTriangle"></span>
              <span className="dmServerNames">Direct Messages</span>
            </span>
          </span>
        )}
        <NavLink to="/coming-soon"
          className="dm"
          onMouseOut={hideServerName}
          onMouseOver={() => displayServerName(1000000)}
        ></NavLink>
        <div className="line"></div>
        <div className="list">{serverComponents}</div>
        {hoveredId === 10000000 && (
          <span className="dmHiddenItems">
            <span className="textBox">
              <span className="addServerTriangle"></span>
              <span className="addServerText">Add a Server</span>
            </span>
          </span>
        )}
        <span onClick={() => {
          setShowModal(true)
        }}
          className="addServerIcon"
          onMouseOut={hideServerName}
          onMouseOver={() => displayServerName(10000000)}
        >
          <div className="plus">+</div>
        </span>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <ServerFormModal
              setShowModal={setShowModal}
              showModal={showModal}
            />
          </Modal>
        )}
      </div>
      <div className="general-bar">
        {serverId && <Server serverId={serverId} />}
      </div>
    </div>
  );
}

export default ServersList;
