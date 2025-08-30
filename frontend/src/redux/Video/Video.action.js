import VideoActionTypes from "./Video.types";
import axios from "axios";

const backend_url = import.meta.env.VITE_BACKEND_URL

export const addToQueue = (payload) => ({
    type: VideoActionTypes.ADD_TO_QUEUE,
    payload
})

export const setNowPlaying = (payload) => ({
    type: VideoActionTypes.SET_NOW_PLAYING,
    payload
})

export const advanceQueue = () => ({
    type: VideoActionTypes.ADVANCE_QUEUE
})

export const removeFromQueue = (payload) => ({
    type: VideoActionTypes.REMOVE_FROM_QUEUE,
    payload
})

export const clearQueue = () => ({
    type: VideoActionTypes.CLEAR_QUEUE
})

export const addVideoThunk = (keyword, socket, roomId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${backend_url}/api/video/addmusic/${keyword}`);
            const videoData = {
                link: response.data.link,
                title: response.data.title,
                thumbnail: response.data.thumbnail
            };
            
            dispatch(addToQueue(videoData));
            socket.emit('vid_info', { ...videoData, room: roomId });
            socket.emit('add_to_queue', { roomId });
        } catch (error) {
            console.log(error);
        }
    }
}

export const playNextThunk = (socket, roomId) => {
    return async (dispatch) => {
        try {
            dispatch(advanceQueue());
            socket.emit('queue_updated', { roomId });
        } catch (error) {
            console.log(error);
        }
    }
}

export const removeVideoThunk = (videoLink, socket, roomId) => {
    return async (dispatch) => {
        try {
            dispatch(removeFromQueue(videoLink));
            socket.emit('remove_from_queue', { roomId });
        } catch (error) {
            console.log(error);
        }
    }
}