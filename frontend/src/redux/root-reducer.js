import {combineReducers} from 'redux';
import RoomReducer from './Room/Room.reducer';
import VideoReducer from './Video/Video.reducer';



const rootReducer = combineReducers({
    // add reducers here
    room: RoomReducer,
    video: VideoReducer,
    
   
     
});



export default rootReducer;
