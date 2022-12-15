import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import '../css/UsersList.css'

function UsersList({serverInfo}) {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
    );
  });

  return (
    <>
      <div className='members-list'>
              <strong>Members -</strong>
              {serverInfo?.users?.map(user => (
                <p id='one-member' key={user?.id}>
                  <img id='member-profile' src='https://www.svgrepo.com/show/331368/discord-v2.svg' alt=''></img>
                  {user?.username}
                </p>
              ))}
            </div>
    </>
  );
}

export default UsersList;
