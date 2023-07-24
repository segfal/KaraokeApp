import UserActionTypes from "./User.types";

const initialUserState = {
    singleUser: {},
}

const UserReducer = (state = initialUserState, action) => {

    //TODO: Add switch statement for each action type
    try {
        switch(action.type) {

            case UserActionTypes.SET_USER:
                console.log(action.payload)
                console.log("User Reducer")
                return {
                    ...state,
                    singleUser: action.payload
                }

            
            default:
                return state;
        }

    } catch (error) {
        console.log(error);
        return state;
    }

}




export default UserReducer;
