/* eslint-disable no-unused-vars */
import axios from 'axios';
import RoomActionTypes from './Room.types';


export const setCurrentRoom = (payload) => {
    return {
        type: RoomActionTypes.SET_CURRENT_ROOM,
        payload
    }
}

export const fetchRoom = (payload) => {
    return {
        type: RoomActionTypes.FETCH_ROOM,
        payload
    }
}

export const getParticipants = (payload) => {
    return {
        type: RoomActionTypes.GET_PARTICIPANTS,
        payload
    }
}


export const getMusic = (payload) => {
    return {
        type: RoomActionTypes.GET_MUSIC,
        payload
    }
}

export const getRoomId = (payload) => {
    return {
        type: RoomActionTypes.GET_ROOM_ID,
        payload
    }
}


export const isAdmin = (payload) => {
    return {
        type: RoomActionTypes.IS_ADMIN,
        payload
    }
}


export const isSinger = (payload) => {
    return {
        type: RoomActionTypes.IS_SINGER,
        payload
    }
}


export const isViewer = (payload) => {

    return {
        type: RoomActionTypes.IS_VIEWER,
        payload
    }
}


export const setCurrentRoomThunk = (roomId) => {
    return async (dispatch) => {
        try {
        }
        catch (error) {
            console.log(error);
        }
    }
}


export const fetchRoomThunk = (roomId) => {
    return async (dispatch) => {
        try {
        }
        catch (error) {
            console.log(error);
        }
    }
}


export const getParticipantsThunk = (roomId) => {
    return async (dispatch) => {
        try {
        }
        catch (error) {
            console.log(error);
        }
    }
}



export const getMusicThunk = (roomId) => {
    return async (dispatch) => {
        try {
        }
        catch (error) {
            console.log(error);
        }
    }
}



export const getRoomIdThunk = (roomId) => {
    return async (dispatch) => {
        try {
        }
        catch (error) {
            console.log(error);
        }
    }
}







