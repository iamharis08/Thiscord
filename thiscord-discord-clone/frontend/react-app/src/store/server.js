const LOAD_SERVERS = 'server/LOAD_SERVERS'
const ADD_SERVER = 'server/ADD_SERVER'
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

const deleteServer = (server) => ({
  type: DELETE_SERVER,
  server
})

// --- THUNKS --- //

export const fetchServers = (userId) => async (dispatch) => {
  const response = await fetch(`/api/servers`, {
    method: 'GET'
  });

  if (response.ok) {

    const data = await response.json()
    dispatch(loadServers(data));
    return data
  }
};


export const fetchOneServer = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`, {
    method: "GET"
  });

  if (response.ok) {
    const data = await response.json()
    dispatch(loadServers(data))
    return data
  }
}


export const createServer = (server) => async (dispatch) => {
  const response = await fetch(`/api/servers/`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(server)
  })

  if (response.ok) {
    const newServer = await response.json()

    dispatch(addServer(newServer))
    return newServer
  }
}

export const updateServer = (server) => async (dispatch) => {
  const response = await fetch(`/api/servers/${server.id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(server)
  })

  if (response.ok) {
    const updatedServer = await response.json()

    dispatch(addServer(updatedServer))
    return updatedServer
  }
}


export const removeServer = (server) => async (dispatch) => {
  const response = await fetch(`/api/servers/${server.id}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(deleteServer(server.id))
    return server
  }
}

// --- INITIAL STATE --- //

const initialState = { servers: {}, serversList: [], server: {} }


// --- REDUCER --- //

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SERVERS:
      const loadServers = { ...state, servers: { ...state.servers },
       serversList: [ ...state.serversList ],
        server: { ...state.server } }
        action.servers.forEach((server) => (loadServers.servers[server.id] = server))
        return loadServers

    case ADD_SERVER:
      if (!state.servers[action.server.id]) {
        const addServer = {
          ...state,
          servers: { ...state.servers, [action.server.id]: action.server },
          serversList: [...state.serversList, action.server],
          server: { ...state.server }
        }
        addServer.server = action.server
        return addServer
      }

      const updateServer = {
        ...state,
        servers: {...state.servers, [action.server.id]: { ...state.servers[action.server.id], ...action.server}},
        serversList: [...state.serversList],
        server: { ...state.server, ...action.server }
      }

    default:
      return state;
  }
}
