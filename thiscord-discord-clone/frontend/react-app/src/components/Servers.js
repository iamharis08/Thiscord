import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServers } from '../store/server';

function ServersList() {
  const [servers, setServers] = useState([]);
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const serverArr = useSelector(state => state.server)
  console.log(serverArr, 'HERE IS THE SERVERARR!!!!')
  console.log('HERE IS USER in SERVERSLIST!!!', user)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/servers/');
      const responseData = await response.json();
      dispatch(fetchServers(user.id))
      console.log("IN USEEFFECT, loading servers -----", responseData.servers)
      setServers(responseData.servers);
    }
    fetchData();
  }, [dispatch]);

  const serverComponents = Object.values(serverArr.servers).map((server) => {
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
