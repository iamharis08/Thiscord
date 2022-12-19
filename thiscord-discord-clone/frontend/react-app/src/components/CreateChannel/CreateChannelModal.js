import React, { useState, useEffect } from "react";
import { createServer, fetchOneServer } from "../../store/server";
import { useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import "./CreateChannelModal.css";
import { createChannel } from "../../store/channel";

function CreateChannelModal({ setShowCreateChannelModal }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.server.server.server);
  const [channelName, setChannelName] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    if (stringCheck(channelName)) {

      return dispatch(createChannel({ name: inputReducer(channelName), server_id: server.id }, server.id)).then(() => {
        setShowCreateChannelModal(false);
        dispatch(fetchOneServer(server.id))
      });
    } else {
      setErrors(['Name needs to be at least three characters'])
    }
    // .catch(async (res) => {
    //   const data = await res.json();
    //   console.log("THE DATA OF THE NEW SERVER", data)
    //   if (data) setErrors(Object.values(data));
    //   else return (<Redirect to={'/servers'} />);
    // });
  };

  const stringCheck = str => str.split(' ').filter(c => c !== '').join('').length >= 3
  const inputReducer = str => str.replace(/\s+/g, ' ').trim()



  return (
    <div className="create-channel-modal">
      <form className="server-channel-form" onSubmit={handleSubmit}>
        {errors[0] ? (
          <ul className="errors">
            <li>{errors[0]}</li>
          </ul>
        ) : (
          ""
        )}
        <div className="create-channel-heading">Create Channel</div>
        <div className='create-channel-description'>
          Give your new channel a personality with a name. You can always change it later
        </div>
        <label className="input-label">
          <div className="enter-channel-name">CHANNEL NAME</div>
          <div>
            <input
              className="create-channel-input"
              placeholder={`new-channel`}
              minlength='3'
              malength='50'
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              required
            />
          </div>
        </label>

        <div className="create-button-container">
          <span className="">
            <button
              className="create-channel-back-button"
              type="button"
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
