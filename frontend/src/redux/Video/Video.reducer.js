import VideoActionTypes  from './Video.types';
import { SocketContext } from '../../context';
const initialState = {
    video: [],
    allVideos: [],
    uniqueVideos: [],
    vidInfo: [],
    uniqueVidInfo: []
}


const VideoReducer = (state = initialState, action) => {
    switch (action.type) {
        case VideoActionTypes.GET_VIDEO:
            return {
                ...state,
                video: action.payload,
                allVideos: [...state.allVideos, action.payload.link],
                uniqueVideos: [...(new Set([...state.uniqueVideos, action.payload.link]))].filter((payloads) => typeof payloads === 'string'),
                vidInfo: [...state.vidInfo, action.payload].filter((payloads) => typeof payloads !== 'string'),
                uniqueVidInfo: [...(new Set([...state.uniqueVidInfo, action.payload]))].filter((item,index,self) => index === self.findIndex((t) => (t.link === item.link)))
            }
        case VideoActionTypes.SYNC_VIDEO:


            return {
                ...state,
                video: action.payload,
                allVideos: [...state.allVideos, action.payload],
                uniqueVideos: [...(new Set([...state.uniqueVideos, action.payload]))].filter((payloads) => typeof payloads === 'string')
            }
        case VideoActionTypes.SYNC_VIDEO_INFO:
            return {
                ...state,
                video: action.payload,
                vidInfo: [...state.vidInfo, action.payload],
                uniqueVidInfo: [...(new Set([...state.uniqueVidInfo, action.payload]))].filter((item,index,self) => index === self.findIndex((t) => (t.link === item.link)))
            }
        case VideoActionTypes.END_VIDEO:
            return {
                ...state,
                video: action.payload,
                allVideos: [...state.allVideos, action.payload.link].filter((payloads) =>  payloads === 'string'),
                uniqueVideos: [...(new Set([...state.uniqueVideos, action.payload.link]))].filter((payloads) => typeof payloads === 'string'),
                vidInfo: [...state.vidInfo, action.payload],
                uniqueVidInfo: [...(new Set([...state.uniqueVidInfo, action.payload]))]
            }
        case VideoActionTypes.REMOVE_VIDEO:

            console.log("In remove_video reducer")
            
            return {
                ...state,
                video: action.payload,
                allVideos: state.allVideos.filter(video => video !== action.payload),
                uniqueVideos : state.uniqueVideos.filter(video => video !== action.payload),
                vidInfo: state.vidInfo.filter(video => video.link !== action.payload),
                // vidInfo: [...state.vidInfo, action.payload],
                uniqueVidInfo: state.uniqueVidInfo.filter(video => video.link !== action.payload)
            }

        default:
            return state;
    }
}



export default VideoReducer;