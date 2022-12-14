import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../css/Server.css"

function ServersList() {
  const [servers, setServers] = useState([]);
  const [hoveredId, setHoveredId] = useState(-1);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/servers/');
      const responseData = await response.json();
      console.log("IN USEEFFECT, loading servers -----", responseData.servers)
      setServers(responseData.servers);
    }
    fetchData();
  }, []);

  const displayServerName = (serverId) => {
    setHoveredId(serverId);
  };

  const hideServerName = () => {
    setHoveredId(-1);
  };

  const serverComponents = servers.map((server) => {

    return (
      <div className="listItem" key={server.id}>
        <span className='serverIcon'
          onMouseOut={hideServerName}
          onMouseOver={() => displayServerName(server.id)}>
          <NavLink className='link' to={`/servers/${server.id}`}>{server.id}</NavLink>
        </span>
        {hoveredId === server.id &&
          <span>
            <span className='whiteBud'></span>
            <span className='serverNames'>{server.name}</span>
          </span>
          }
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
