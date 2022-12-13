
const LOAD_MESSAGES = 'message/LOAD_MESSAGES'


const loadMessages = (messages) => ({
  type: LOAD_MESSAGES,
  messages
});

export const fetchMessages = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}`,{
    method: 'GET'
  });

  if (response.ok) {
    const data = await response.json()
    console.log('THUNKMESSAGES', data)
    dispatch(loadMessages(data));
  }
};

// export const fetchCreateMessages = (channelId) => async (dispatch) => {
//   const response = await fetch(`/api/channels/${channelId}`,{
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       user_id,
//       channel_id,
//       message
//     }),
//   });

//   if (response.ok) {
//     const data = await response.json()
//     dispatch(loadMessages(data));
//   }
// };


const initialState = {messages: [], message: {}, channel:{}}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_MESSAGES:
        return { messages: [...state.messages, ...action.data.messages], channels: action.data}
      default:
        return state;
    }
  }
