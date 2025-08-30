import VideoActionTypes from './Video.types';

const initialState = {
    queue: [],
    nowPlaying: null
}

const VideoReducer = (state = initialState, action) => {
    switch (action.type) {
        case VideoActionTypes.ADD_TO_QUEUE:
            const exists = state.queue.find(video => video.link === action.payload.link);
            if (exists) return state;
            
            return {
                ...state,
                queue: [...state.queue, action.payload]
            }
            
        case VideoActionTypes.SET_NOW_PLAYING:
            return {
                ...state,
                nowPlaying: action.payload
            }
            
        case VideoActionTypes.ADVANCE_QUEUE:
            const [next, ...remaining] = state.queue;
            return {
                ...state,
                queue: remaining,
                nowPlaying: next || null
            }
            
        case VideoActionTypes.REMOVE_FROM_QUEUE:
            return {
                ...state,
                queue: state.queue.filter(video => video.link !== action.payload)
            }
            
        case VideoActionTypes.CLEAR_QUEUE:
            return {
                ...state,
                queue: [],
                nowPlaying: null
            }

        default:
            return state;
    }
}



export default VideoReducer;