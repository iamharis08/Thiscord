import React, { useState, useEffect } from "react";
import { createServer, fetchOneServer } from "../../store/server";
import { useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import "../ServerForm/ServerForm.css";
import { createChannel } from "../../store/channel";

function CreateChannelModal({ setShowCreateChannelModal }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.server.server.server);
  const [channelName, setChannelName] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(createChannel({name:channelName, server_id: server.id}, server.id)).then(() => {
      setShowCreateChannelModal(false);
      dispatch(fetchOneServer(server.id))
    });
    // .catch(async (res) => {
    //   const data = await res.json();
    //   console.log("THE DATA OF THE NEW SERVER", data)
    //   if (data) setErrors(Object.values(data));
    //   else return (<Redirect to={'/servers'} />);
    // });
  };

  return (
<div className="server-channel-modal">
    <form className="server-channel-form" onSubmit={handleSubmit}>
          {errors[0] ? (
            <ul className="errors">
              <li>{errors[0]}</li>
            </ul>
          ) : (
            ""
          )}
          <div className="create-text">Create Channel</div>


                <label className="input-label">
                  <div className="server-name">CHANNEL NAME</div>
                  <div>
                    <input
                      className="input"
                      // placeholder={`${user.username}'s server`}
                      type="text"
                      value={channelName}
                      placeholder="new-channel"
                      onChange={(e) => setChannelName(e.target.value)}
                      required
                    />
                  </div>
                </label>

            <div className="button-container">
              <span className="">
                <button
                  className="backButton"
                  type="submit"
                  onClick={() => setShowCreateChannelModal(false)}
                >
                  Back
                </button>
              </span>
              <span className="">
                <button className="createButton" type="submit">
                  Create
                </button>
              </span>
            </div>
    </form>
</div>

  );
}

export default CreateChannelModal;
