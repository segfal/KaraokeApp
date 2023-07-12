import RoomActionTypes from "./Room.types";

const initialRoomState = {
    singleRoom: {},
    participants: [],
}

const RoomReducer = (state = initialRoomState, action) => {

    //TODO: Add switch statement for each action type
    try {
        switch(action.type) {
            
            default:
                return state;
        } 

    } catch (error) {
        console.log(error);
        return state;
    }

}




export default RoomReducer;
