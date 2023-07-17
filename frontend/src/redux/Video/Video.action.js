import VideoActionTypes from "./Video.types";
import axios from "axios";


export const getVideo = (payload) => ({
    type: VideoActionTypes.GET_VIDEO,
    payload
})


export const getVideoThunk = (keyword) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`http://127.0.0.1:4100/api/video/addmusic/${keyword}`);
            dispatch(getVideo(response.data.link));

        }
        catch (error) {
            console.log(error);
        }
    }
}


