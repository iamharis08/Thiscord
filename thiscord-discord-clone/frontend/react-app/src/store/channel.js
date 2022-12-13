const LOAD_CHANNELS = 'channel/LOAD_CHANNELS'


const loadChannels = (channels) => ({
  type: LOAD_CHANNELS,
  channels
});




export const fetchChannels = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`, {
    method: 'GET'
  });

  if (response.ok) {

    const data = await response.json()
    dispatch(loadChannels(data));
  }
};


export const fetchOneChannel = channelId => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}`, {
    method: "GET"
  });

  if (response.ok) {
    const data = await response.json()
    dispatch(loadChannels(data))
  }
}





const initialState = { channels: [], channel: {} }

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CHANNELS:
      return { channels: [...state.channels, ...action.channels], channel: { ...state.channel, ...action.channel } }
    default:
      return state;
  }
}
