import VideoActionTypes  from './Video.types';
const initialState = {
    video: [],
    allVideos: [],
    uniqueVideos: []
}


const VideoReducer = (state = initialState, action) => {
    switch (action.type) {
        case VideoActionTypes.GET_VIDEO:
            return {
                ...state,
                video: action.payload,
                allVideos: [...state.allVideos, action.payload],
                uniqueVideos: [...(new Set([...state.uniqueVideos, action.payload]))]
            }
        case VideoActionTypes.SYNC_VIDEO:


            return {
                ...state,
                video: action.payload,
                allVideos: [...state.allVideos, action.payload],
                uniqueVideos: [...(new Set([...state.uniqueVideos, action.payload]))]
            }
        case VideoActionTypes.END_VIDEO:
            return {
                ...state,
                video: action.payload,
                allVideos: [...state.allVideos, action.payload],
                uniqueVideos: [...(new Set([...state.uniqueVideos, action.payload]))]
            }
        case VideoActionTypes.REMOVE_VIDEO:

            console.log("PAYLOAD: ", action.payload);
            
            return {
                ...state,
                video: action.payload,
                allVideos: state.allVideos.filter(video => video !== action.payload),
                uniqueVideos : state.uniqueVideos.filter(video => video !== action.payload)
            }

        default:
            return state;
    }
}



export default VideoReducer;