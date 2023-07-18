import VideoActionTypes  from './Video.types';
const initialState = {
    video: [],
    allVideos: []
}


const VideoReducer = (state = initialState, action) => {
    switch (action.type) {
        case VideoActionTypes.GET_VIDEO:
            return {
                ...state,
                video: action.payload,
                allVideos: [...state.allVideos, action.payload]
            }
        case VideoActionTypes.SYNC_VIDEO:
            return {
                ...state,
                video: action.payload
                // allVideos: [...state.allVideos, action.payload]
            }
        case VideoActionTypes.END_VIDEO:

        const videos = [...state.allVideos];
        
            return {
                ...state,
                
            }
        default:
            return state;
    }
}



export default VideoReducer;