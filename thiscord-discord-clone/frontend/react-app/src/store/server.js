import { createChannel } from "./channel"
const LOAD_SERVERS = 'server/LOAD_SERVERS'
const ADD_SERVER = 'server/ADD_SERVER'
const UPDATE_SERVER = 'server/UPDATE_SERVER'
const DELETE_SERVER = 'server/DELETE_SERVER'


// --- ACTIONS --- //

const loadServers = (servers) => ({
  type: LOAD_SERVERS,
  servers
})
  ;

const addServer = (server) => ({
  type: ADD_SERVER,
  server
})

const updateServer = (server) => ({
  type: UPDATE_SERVER,
  server
})

const deleteServer = (server) => ({
  type: DELETE_SERVER,
  server
})

// --- THUNKS --- //

export const fetchServers = (userId) => async (dispatch) => {
  const response = await fetch(`/api/servers/`, {
    method: 'GET'
  });

  if (response.ok) {

    const data = await response.json()
    console.log("HERE IS FETCHHHHHSERVERS", data);
    console.log(data, "DATAAAAAAAAAAAAAAAA")
    dispatch(loadServers(data));
    return data
  }
};


export const fetchOneServer = (serverId) => async (dispatch) => {

  const response = await fetch(`/api/servers/${serverId}`, {
    method: "GET"
  });

  if (response.ok) {
    const server = await response.json()
    console.log("SERVEERBACKEND", server)
    dispatch(addServer(server))
    return server
  }
}


export const createServer = (server) => async (dispatch) => {
  console.log("IN THE CREATE SERVER THUNK ", server, " WHAT IS THIS?")
  const response = await fetch(`/api/servers/`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(server)
  })

  if (response.ok) {
    // console.log("RESPONSE WAS OK IN CREATE SERVER")
    const newServer = await response.json()
    console.log(newServer, "NEWWWWWWWWWWWWWWWWWWWWW")
    dispatch(addServer(newServer))
    const newChannelObj = {
      name: "general"
    }
    dispatch(createChannel(newChannelObj, newServer.server.id))
    console.log("THE NEW SERVER IS ALIVE ", newServer)
    return newServer
  }
}

export const fetchUpdateServer = (server) => async (dispatch) => {
  const response = await fetch(`/api/servers/${server.id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(server)
  })

  if (response.ok) {
    const updatedServer = await response.json()

    dispatch(updateServer(updatedServer))
    return updatedServer
  }
}


export const removeServer = (server) => async (dispatch) => {
  const response = await fetch(`/api/servers/${server.id}`, {
    method: "DELETE"
  })

  if (response.ok) {
      console.log("HERE IS in DELETEEEEEEFETCHHH",server.id);

    dispatch(deleteServer(server.id))
    return server
  }
}


// --- INITIAL STATE --- //
const normalize = (arr) => {
    let newObj = {}
    arr.forEach((ele) => {
      newObj[ele.id]=ele
    })
    return newObj
}

const initialState = { servers: {}, server: {} }


// --- REDUCER --- //

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case LOAD_SERVERS:
      let normalizedServers = normalize(action.servers.servers)
      // const normalizedServers = action.servers.servers.forEach((server) => (loadServers.servers[server.id] = server))
      // const loadServers = {
      //   ...state, servers: { ...normalizedServers},
      //   server: { ...state.server }
      // }
      return {...state, servers: {...normalizedServers} }

    case ADD_SERVER:
      const addServer = {
        ...state,
        server: { ...action.server }
      }
      console.log("ADDSERVER VARIBLE", addServer)
      console.log("AACTION AACTION AACITON", action)
      addServer.servers[action.server.server.id] = action.server.server
      return addServer

    case UPDATE_SERVER: {
      const updateServer = {
        ...state,
        server: { ...state.server, ...action.server }
      }
      updateServer.servers[action.server.server.id] = action.server.server
      return updateServer
    }

    case DELETE_SERVER: {
      const deleteServer = {
        ...state,
        servers: { ...state.servers },
        server: { ...state.server }
      }
      delete deleteServer.servers[action.server.id]
      deleteServer.server = {}
      return deleteServer
    }

    default:
      return state;
  }
}
