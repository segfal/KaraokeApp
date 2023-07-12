import VideoActionTypes  from './Video.types';
const initialState = {
    video: []
}


const VideoReducer = (state = initialState, action) => {
    switch (action.type) {
        case VideoActionTypes.GET_VIDEO:
            return {
                ...state,
                video: action.payload
            }
        default:
            return state;
    }
}



export default VideoReducer;