import { REMOVE_USER } from "./session"

const LOAD_CHANNELS = 'channel/LOAD_CHANNELS'
const ADD_CHANNEL = 'channel/ADD_CHANNEL'
const UPDATE_CHANNEL = 'channel/UPDATE_CHANNEL'
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

const updateChannel = (channel) => ({
  type: UPDATE_CHANNEL,
  channel
})

const deleteChannel = (channelId) => {
  return {
    type: DELETE_CHANNEL,
    channelId
  }
}

export const clearChannelsState = () => ({
  type: REMOVE_USER,

})
// --- THUNKS --- //

export const fetchChannels = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`, {
    method: 'GET'
  });

  if (response.ok) {

    const data = await response.json()

    dispatch(loadChannels(data));
    return data
  }
};


export const fetchOneChannel = channelId => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}`, {
    method: "GET"
  });

  if (response.ok) {
    const data = await response.json()
    console.log('data in THUNK OK', data)

    dispatch(addChannel(data))
    return data
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


export const fetchUpdateChannel = (channel) => async (dispatch) => {
  console.log("we got a channel update", channel)
  const response = await fetch(`/api/channels/${channel.id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(channel)
  })

  if (response.ok) {
    const updatedChannel = await response.json()
    console.log("WAS THE CHANNEL UPDATE OK?", updatedChannel)

    dispatch(updateChannel(updatedChannel))
    return updatedChannel
  }
}


export const removeChannel = (channel) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channel.id}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(deleteChannel(channel.id))
    return response
  }

  return
}


// --- INITIAL STATE --- //

const initialState = { channels: {}, channel: {} }


// --- REDUCER --- //

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case LOAD_CHANNELS:
      console.log('HERE IN LOAD CHANNELS', action)
      const loadChannels = {
        ...state, channels: { ...state.channels },
        channel: { ...state.channel }
      }
      action.channels.forEach((channel) => (loadChannels.channels[channel.id] = channel))
      return loadChannels;

    case ADD_CHANNEL:
      const addChannel = {
        ...state,
        channel: { ...state.channel }
      }
      addChannel.channel = action.channel.channel
      console.log(addChannel, 'ADD CHANNEL!')
      return addChannel

    case UPDATE_CHANNEL:
      const updateChannel = {
        ...state,
        channel: { ...state.channel, ...action.channel }
      }
      return updateChannel

    case DELETE_CHANNEL:
      const deleteChannel = {
        ...state,
        channels: { ...state.channels },
        channel: { ...state.channel }
      }
      delete deleteChannel.channels[action.channelId]
      deleteChannel.channel = {}
      return deleteChannel

      case REMOVE_USER: {
        return initialState
      }
    default:
      return state;
  }
}
