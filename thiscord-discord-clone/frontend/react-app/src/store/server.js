const LOAD_SERVERS = 'server/LOAD_SERVERS'


const loadServers = (servers) => ({
  type: LOAD_SERVERS,
  servers
});




export const fetchServers = (userId) => async (dispatch) => {
  const response = await fetch(`/api/servers`, {
    method: 'GET'
  });

  if (response.ok) {

    const data = await response.json()
    dispatch(loadServers(data));
  }
};


export const fetchOneServer = serverId => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`, {
    method: "GET"
  });

  if (response.ok) {
    const data = await response.json()
    dispatch(loadServers(data))
  }
}




state = { servers: [], server: {} }

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_Servers:
      return { servers: [...state.servers, ...action.servers], server: { ...state.server, ...action.server } }
    default:
      return state;
  }
}
