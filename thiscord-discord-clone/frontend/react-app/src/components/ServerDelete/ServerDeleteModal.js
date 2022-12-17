import React, { useState, useEffect } from "react";
import { createServer } from "../../store/server";
import { useDispatch } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ServerDeleteModal.css";
import { removeServer } from "../../store/server";



function ServerDeleteModal({ setShowDeleteModal, setUpdateServers }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.server.server.server)
  const [serverName, setServerName] = useState();
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (serverName === server?.name){
        return dispatch(removeServer(server)).then(() => {
            setShowDeleteModal(false);
            setUpdateServers("true")
            history.push("/servers")
          });
    }
    // setErrors([]);



    // .catch(async (res) => {
    //   const data = await res.json();
    //   console.log("THE DATA OF THE NEW SERVER", data)
    //   if (data) setErrors(Object.values(data));
    //   else return (<Redirect to={'/servers'} />);
    // });
  };



  return (
    <div className="delete-server-modal">
      <div className="delete-server-heading">Delete '{server?.name}'</div>
      <div className="delete-confirmation">
        <p>
          Are you sure you want to delete <span>{server?.name}</span>?
        </p>
        <p>This action cannot be undone</p>
      </div>
      <form className="create-server-form" onSubmit={handleSubmit}>
        <label className="input-label"></label>
          <div className="enter-server-name">ENTER SERVER NAME</div>
          <div>
            <input
              className="input"
              // placeholder={`${user.username}'s server`}
              type="text"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              required
            />
          </div>
          <div className="delete-footer">
        <div className="cancel">Cancel</div>
        <button className="delete-button" type="submit">Delete Server</button>
      </div>
      </form>

    </div>
  );
}

export default ServerDeleteModal;
