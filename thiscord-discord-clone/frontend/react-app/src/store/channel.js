const LOAD_CHANNELS = 'channel/LOAD_CHANNELS'
const ADD_CHANNEL = 'channel/ADD_CHANNEL'
const DELETE_CHANNEL = 'channel/DELETE_CHANNEL'


// --- ACTIONS --- //

const loadChannels = (channels) => ({
  type: LOAD_CHANNELS,
  channels
});

const addChannel = (channel) => {
  return {
    type: ADD_CHANNEL,
    channel
  }
}

const deleteChannel = (channelId) => {
  return {
    type: DELETE_CHANNEL,
    channelId
  }
}

// --- THUNKS --- //

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


export const createChannel = (channel, serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/channels`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(channel)
  })

  if (response.ok) {
    const newChannel = await response.json()

    dispatch(addChannel(newChannel))
    return newChannel
  }
}


export const updateChannel = (channel) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channel.id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(channel)
  })

  if (response.ok) {
    const updatedChannel = await response.json()

    dispatch(addChannel(updatedChannel))
    return updatedChannel
  }
}


export const removeChannel = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(deleteChannel(channelId))
    return response
  }

  return
}


// --- Initial State --- //

const initialState = { channels: {}, channelList: [], channel: {} }


// --- Reducer --- //

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CHANNELS:
      const loadChannels = { ...state, channels: { ...state.channelList }, channelList: [...state.channels], channel: { ...state.channel } }
      action.channels.forEach((channel) => (loadChannels.channelList[channel.id] = channel))
      return loadChannels;

    case ADD_CHANNEL:
      if (!state.channelList[action.channel.id]) {
        const addChannel = {
          ...state,
          channels: { ...state.channels, [action.channel.id]: action.channel },
          channelList: [...state.channels, ...action.channel],
          channel: { ...state.channel }
        }
        addChannel.channel = action.channel
        return addChannel
      }

      const updateChannel = {
        ...state,
        channels: { ...state.channels, [action.channel.id]: { ...state.channels[action.channel.id], ...action.channel } },
        channelList: [...state.channels],
        channel: { ...state.channel, ...action.channel }
      }
      return updateChannel

    case DELETE_CHANNEL:
      const deleteChannel = { ...state, channels: { ...state.channels }, channel: { ...state.channel }, channelList: [...state.channelList] }
      delete deleteChannel.channels[action.channelId]
      deleteChannel.channel = {}
      deleteChannel.channelList.filter(channel => channel.id !== action.channelId)
      return deleteChannel

    default:
      return state;
  }
}
