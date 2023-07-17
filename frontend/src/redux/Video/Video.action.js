import VideoActionTypes from "./Video.types";
import axios from "axios";
import { SocketContext } from "../../context";
import { useContext } from "react";


export const getVideo = (payload) => ({
    type: VideoActionTypes.GET_VIDEO,
    payload
})


export const getVideoThunk = (keyword,socket,roomId) => {
    return async (dispatch) => {
        try {
            
            const response = await axios.post(`http://127.0.0.1:4100/api/video/addmusic/${keyword}`);
            socket.emit('get_video', { link: response.data.link, room: response.data.roomId });
            console.log("response.data.link: ", response.data.link, "response.data.roomId: ", roomId);
            console.log("REDUX socket: ", socket);
            dispatch(getVideo(response.data.link));

        }
        catch (error) {
            console.log(error);
        }
    }
}


