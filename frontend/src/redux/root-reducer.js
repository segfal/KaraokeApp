import {combineReducers} from 'redux';
import RoomReducer from './Room/Room.reducer';



const rootReducer = combineReducers({
    // add reducers here
    room: RoomReducer,
    
});



export default rootReducer;
