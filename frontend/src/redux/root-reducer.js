import {combineReducers} from 'redux';
import RoomReducer from './Room/Room.reducer';
import VideoReducer from './Video/Video.reducer';

import UserReducer from './User/User.reducer';

const rootReducer = combineReducers({
    // add reducers here
    user: UserReducer,
    room: RoomReducer,
    video: VideoReducer,
    
   
     
});



export default rootReducer;
