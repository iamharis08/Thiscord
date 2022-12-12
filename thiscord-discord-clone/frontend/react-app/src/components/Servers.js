import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function ServersList() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/servers/');
      const responseData = await response.json();
      console.log("IN USEEFFECT, loading servers -----", responseData.servers)
      setServers(responseData.servers);
    }
    fetchData();
  }, []);

  const serverComponents = servers.map((server) => {
    return (
      <li key={server.id}>
        <NavLink to={`/servers/${server.id}`}>{server.id}&nbsp;{server.name}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1>Servers List: </h1>
      <ul>
        {serverComponents}
      </ul>
    </>
  );
}

export default ServersList;
