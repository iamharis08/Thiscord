
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


// state = {messages: [], message: {}}

// export default function reducer(state = initialState, action) {
//     switch (action.type) {
//       case LOAD_MESSAGES:
//         return { messages: [...state.messages]}
//       default:
//         return state;
//     }
//   }
