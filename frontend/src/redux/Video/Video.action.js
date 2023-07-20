import VideoActionTypes from "./Video.types";
import axios from "axios";
import { SocketContext } from "../../context";
import { useContext } from "react";


export const getVideo = (payload) => ({
    type: VideoActionTypes.GET_VIDEO,
    payload
})

export const syncVideo = (payload) => ({
    type: VideoActionTypes.SYNC_VIDEO,
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
            const response = await axios.post(`http://127.0.0.1:4100/api/video/addmusic/${keyword}`);
            console.log("RESPONSE DATA----: ", response.data);
            socket.emit('get_video', { link: response.data.link, room: roomId});
            socket.emit('vid_info', { link: response.data.link, title: response.data.title, thumbnail: response.data.thumbnail, room: roomId });
            console.log("response.data.link: ", response.data.link, "response.data.roomId: ", roomId, "response.data.title: ", response.data.title);
            console.log("REDUX socket: ", socket);
            dispatch(getVideo(response.data.link));
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
            socket.emit('remove_video', { link: video, room: socket });
        } catch (error) {
            console.log(error)
        }
    }
}
