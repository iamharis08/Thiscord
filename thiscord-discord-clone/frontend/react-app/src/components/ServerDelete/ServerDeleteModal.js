import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ServerDeleteModal.css";
import { removeServer } from "../../store/server";



function ServerDeleteModal({ setShowDeleteModal, setUpdateServers, setIsHidden }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.server.server.server)
  const [serverName, setServerName] = useState();
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (serverName === server?.name) {
      return dispatch(removeServer(server)).then(() => {
        setShowDeleteModal(false);
        setUpdateServers("true")
        history.push("/servers")
      });
    }
  };



  return (
    <div className="delete-server-modal">
      <div className="delete-server-heading">Delete '{server?.name}'</div>
      <div className="delete-confirmation">
        <p className="delete-confirmation-detail">
          Are you sure you want to delete <span>{server?.name}</span>?
        </p>
        <p className="delete-confirmation-detail">
          This action cannot be undone.</p>
      </div>
      <form className="create-server-form" onSubmit={handleSubmit}>
        <label className="input-label"></label>
        <div className="enter-server-name">
          ENTER SERVER NAME
        </div>
        <div>
          <input
            className="delete-input"
            type="text"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            required
          />
        </div>
        <div className="delete-button-container">
          <div className="delete-back-button" onClick={() => {
            setShowDeleteModal(false)
            setIsHidden(true);
          }}
          >back</div>
          <button className="delete-button" type="submit">Delete Server</button>
        </div>
      </form>

    </div>
  );
}

export default ServerDeleteModal;
