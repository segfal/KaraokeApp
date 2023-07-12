import UserActionTypes from "./User.types";

const initialUserState = {
    singleUser: {},
    participants: [],
}

const UserReducer = (state = initialUserState, action) => {

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




export default UserReducer;
