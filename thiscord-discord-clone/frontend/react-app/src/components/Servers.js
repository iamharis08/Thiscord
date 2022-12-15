import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServers } from '../store/server';
import "../css/Server.css"

function ServersList() {
  const dispatch = useDispatch()
  const [hoveredId, setHoveredId] = useState(-1);
  const user = useSelector(state => state.session.user)
  const serverArr = useSelector(state => state.server)
  console.log(serverArr, 'HERE IS THE SERVERARR!!!!')
  console.log('HERE IS USER in SERVERSLIST!!!', user)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/servers/');
      const responseData = await response.json();
      dispatch(fetchServers(user?.id))
      console.log("IN USEEFFECT, loading servers -----", responseData.servers)
      // setServers(responseData.servers);
    }
    fetchData();
  }, [dispatch]);

  const displayServerName = (serverId) => {
    setHoveredId(serverId);
  };

  const hideServerName = () => {
    setHoveredId(-1);
  };

  const serverComponents = Object.values(serverArr.servers).map((server) => {

    return (
      <div className="listItem" key={server.id}>
        {hoveredId === server.id &&
          <span className='hiddenItems'>
            <span className='whiteNub'></span>
            <span className='textBox'>
              <span className='triangle'></span>
              <span className='serverNames'>
                {server.name}
              </span>
            </span>
          </span>
        }
        <span className='serverIcon'
          onMouseOut={hideServerName}
          onMouseOver={() => displayServerName(server.id)}>
          <NavLink className='link' to={`/servers/${server.id}`}>{server.id}</NavLink>
        </span>
      </div>
    );
  });

  return (
    <div className='bg'>
      {hoveredId === 1000000 &&
        <span className='dmHiddenItems'>
          <span className='dmWhiteNub'></span>
          <span className='dmtTextBox'>
            <span className='dmTriangle'></span>
            <span className='dmServerNames'>
              Direct Messages
            </span>
          </span>
        </span>
      }
      <span className='dm'
        onMouseOut={hideServerName}
        onMouseOver={() => displayServerName(1000000)}>
      </span>
      <div className='line'></div>
      <div className='list'>
        {serverComponents}
      </div>
      {hoveredId === 10000000 &&
        <span className='dmHiddenItems'>
          <span className='textBox'>
            <span className='addServerTriangle'></span>
            <span className='addServerText'>
              Add a Server
            </span>
          </span>
        </span>
      }
      <span className='addServerIcon'
        onMouseOut={hideServerName}
        onMouseOver={() => displayServerName(10000000)}>
        <div className='plus'>
          +
        </div>
      </span>
    </div>
  );
}

export default ServersList;
