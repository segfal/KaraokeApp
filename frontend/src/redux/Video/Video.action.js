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

// export const syncVideoThunk = (socket) => {
//     return async (dispatch) => {
//         try {
//             console.log("SYNC VIDEO THUNK FIRING")
//             socket.on('sync_video', (link)=> {
//                 dispatch(syncVideo(link))
//             })
//             return () => {
//                 socket.off('sync_video');
//               };
            
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

export const endVideoThunk = () => {
    return async (dispatch) => {
        try {
            dispatch(endVideo());
        } catch (error) {
            console.log(error)
        }
    }
}
