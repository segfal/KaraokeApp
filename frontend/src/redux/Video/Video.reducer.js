import VideoActionTypes  from './Video.types';
import { SocketContext } from '../../context';
const initialState = {
    video: [],
    allVideos: [],
    uniqueVideos: [],
    vidInfo: []
}


const VideoReducer = (state = initialState, action) => {
    switch (action.type) {
        case VideoActionTypes.GET_VIDEO:
            return {
                ...state,
                video: action.payload,
                allVideos: [...state.allVideos, action.payload.link].filter((payloads) => payloads !== null && typeof payloads !== 'undefined'),
                uniqueVideos: [...(new Set([...state.uniqueVideos, action.payload.link]))].filter((payloads) => payloads !== null && typeof payloads !== 'undefined'),
                vidInfo: [...state.vidInfo, action.payload].filter((payloads) => typeof payloads !== 'string')
            }
        case VideoActionTypes.SYNC_VIDEO:


            return {
                ...state,
                video: action.payload,
                allVideos: [...state.allVideos, action.payload.link].filter((payloads) => payloads !== null && typeof payloads !== 'undefined'),
                uniqueVideos: [...(new Set([...state.uniqueVideos, action.payload.link]))].filter((payloads) => payloads !== null && typeof payloads !== 'undefined'),
                vidInfo: [...state.vidInfo, action.payload].filter((payloads) => typeof payloads !== 'string')
            }
        case VideoActionTypes.END_VIDEO:
            return {
                ...state,
                video: action.payload,
                allVideos: [...state.allVideos, action.payload.link].filter((payloads) => payloads !== null && typeof payloads !== 'undefined'),
                uniqueVideos: [...(new Set([...state.uniqueVideos, action.payload.link]))].filter((payloads) => payloads !== null && typeof payloads !== 'undefined'),
                vidInfo: [...state.vidInfo, action.payload]
            }
        case VideoActionTypes.REMOVE_VIDEO:

            
            
            return {
                ...state,
                video: action.payload,
                allVideos: state.allVideos.filter(video => video !== action.payload),
                uniqueVideos : state.uniqueVideos.filter(video => video !== action.payload),
                vidInfo: state.vidInfo.filter(video => video.link !== action.payload)
                
            }

        default:
            return state;
    }
}



export default VideoReducer;