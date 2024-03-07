// src/features/postsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { Constants } from '@videosdk.live/react-sdk';




const streamingSlice = createSlice({
  name: 'meeting',
  initialState: {
    meeting_id:"",
    config:{
      meetingId:"",
      micEnabled: true,
      webcamEnabled: true,
      name: `Guest`,
      mode: Constants.modes.CONFERENCE,
    }
  },
  reducers: {
    setMeeting: (state, action) => {
        state.meeting_id = action.payload.meeting_id
    },
    clearMeeting:(state) => {
        state.meeting_id = "";
    },
    setConfig:(state,action) => {
      state.config = action.payload
    }
  },
 
});

export default streamingSlice.reducer;
export const  {clearMeeting, setMeeting,setConfig} = streamingSlice.actions
