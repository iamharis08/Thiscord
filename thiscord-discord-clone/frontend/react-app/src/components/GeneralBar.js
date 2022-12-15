import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOneServer, fetchServers } from '../store/server';
import { fetchChannels } from '../store/channel';



function GeneralBar() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const server = useSelector(state => state.server.server)
  const channels = useSelector(state => state.channel.channels)
  const serverArr = useSelector(state => state.server)
  const { serverId } = useParams();

  useEffect(() => {
   dispatch(fetchChannels(serverId))

  }, [dispatch]);

  return(
    <div className="general-bar">
        <div className='title-container'>
            <div className='title-text'>
                {server.name}
            </div>
        </div>
    </div>
  )

}
export default GeneralBar;
