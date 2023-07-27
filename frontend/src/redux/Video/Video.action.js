import VideoActionTypes from "./Video.types";
import axios from "axios";
import { SocketContext } from "../../context";
import { useContext } from "react";


const backend_url = import.meta.env.VITE_BACKEND_URL

export const getVideo = (payload) => ({
    type: VideoActionTypes.GET_VIDEO,
    payload
})

export const syncVideo = (payload) => ({
    type: VideoActionTypes.SYNC_VIDEO,
    payload
})


export const syncVideoInfo = (payload) => ({
    type: VideoActionTypes.SYNC_VIDEO_INFO,
    payload
})

export const endVideo = (payload) => ({
    type: VideoActionTypes.END_VIDEO,
    payload
})


export const removeVideo = (payload) => ({
    type: VideoActionTypes.REMOVE_VIDEO,
    payload
})






export const getVideoThunk = (keyword,socket,roomId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${backend_url}/video/addmusic/${keyword}`);
            //console.log("RESPONSE DATA----: ", response.data);
            socket.emit('get_video', { link: response.data.link, room: roomId});
            socket.emit('vid_info', { link: response.data.link, title: response.data.title, thumbnail: response.data.thumbnail, room: roomId });
            socket.emit('sync_video', {link: response.data.link});
            dispatch(getVideo({
                
                link:response.data.link,
                title: response.data.title,
                thumbnail: response.data.thumbnail
                
            
            }));
        }
        catch (error) {
            console.log(error);
        }
    }
}


export const endVideoThunk = () => {
    return async (dispatch) => {
        try {
            dispatch(endVideo());
        } catch (error) {
            console.log(error)
        }
    }
}


export const removeVideoThunk = (video,socket) => {
    return async (dispatch) => {
        try {
            console.log("REDUX socket: ", socket);
            console.log("REMOVE VIDEO THUNK");
            dispatch(removeVideo(video));
            // socket.emit('remove_from_queue', { link: video, room: socket });
            socket.emit('remove_from_queue', { link: video });
        } catch (error) {
            console.log(error)
        }
    }
}
