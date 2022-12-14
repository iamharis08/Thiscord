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

  const serverComponents = Object.values(serverArr.servers).map((server) => {
    const displayServerName = (serverId) => {
      setHoveredId(serverId);
    };

    const hideServerName = () => {
      setHoveredId(-1);
    };

    return (
      <div className="listItem" key={server.id}>
        {hoveredId === server.id &&
        <span className='hiddenItems'>
          <span className='whiteNub'></span>
          <span className='textBox'>
            <span className='triangle'></span>
            <span className='serverNames'>
              {server.name}</span>
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
    <>
      <h1>Servers List: </h1>
      <div className='bg'>
        {serverComponents}
      </div>
    </>
  );
}

export default ServersList;
