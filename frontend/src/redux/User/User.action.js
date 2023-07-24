import axios from 'axios';

import UserActionTypes from './User.types';

const getLogin = (user) => ({
    type: UserActionTypes.LOGGED_IN,
    payload: user
});

const setUser = (payload) => ({
    type: UserActionTypes.SET_USER,
    payload
});

export const setUserThunk = (user) => {
    return async (dispatch) => {
        dispatch(setUser(user));

    }
}


const getUser = (user) => ({
    type: UserActionTypes.GET_USER,
    payload: user
});



export const loginThunk = (user) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('/auth/login', user);
            dispatch(getLogin(data));
        } catch (error) {
            console.log(error);
        }
    }
}


export const getUserThunk = (id) => {
    return async (dispatch) => {
        try {
            axios.post('localhost:4100/auth/profile', id);
        } catch (error) {
            console.log(error);
        }
    }
}



export const updateUserThunk = (id, user) => {
    return async (dispatch) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteUserThunk = (id) => {
    return async (dispatch) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const updateRoleThunk = (id, role) => {
    return async (dispatch) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const getRoleThunk = (id) => {
    return async (dispatch) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const getIdThunk = (id) => {
    return async (dispatch) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
}

