
const LOAD_MESSAGES = 'message/LOAD_MESSAGES'
const DELETE_MESSAGE = 'message/DELETE';

// --- ACTIONS --- //

const loadMessages = (channelInfo) => ({
  type: LOAD_MESSAGES,
  channelInfo
});

const deleteMessage = messageId => ({
  type: DELETE_MESSAGE,
  messageId
});


// --- THUNKS --- //
// const deleteMessage = messageId => ({
//   type: DELETE,
//   messageId
// });

export const fetchMessages = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}`,{
    method: 'GET'
  });

  if (response.ok) {
    const channelInfo = await response.json()
    dispatch(loadMessages(channelInfo));
    return channelInfo
  }
};


export const deleteMessageThunk = (messageId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${messageId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteMessage(messageId))
    return response
  }
};

// Nomralizefunction
const normalize = (dataArray) => {   //{'1': message1, '2': message2}
  let newObj = {}
  dataArray.forEach(message => {
  newObj[message.id] = message
})
 return newObj
}


// --- INITIAL STATE --- //

const initialState = {messages: [], message: {}}


// --- REDUCER --- //

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_MESSAGES:{
        let normalizedObj = normalize(action.channelInfo.messages)
        return { messages: {...normalizedObj}}
      }
      case DELETE_MESSAGE:
        const deletedState = { ...state };
        delete deletedState.messages[action.messageId]
        return {...deletedState};
      default:
        return state;
    }
  }
