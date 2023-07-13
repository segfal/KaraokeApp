import axios from 'axios';
import UserActionTypes from './User.types';

export const getUser = (payload) => ({
    type: UserActionTypes.GET_USER,
    payload
});

export const getRole = (payload) => ({
    type: UserActionTypes.GET_ROLE,
    payload
});

export const getId = (payload) => ({
    type: UserActionTypes.GET_ID,
    payload
});

export const isAdmin = (payload) => ({
    type: UserActionTypes.IS_ADMIN,
    payload
});

export const isViewer = (payload) => ({
    type: UserActionTypes.IS_VIEWER,
    payload
});

export const updateRole = (payload) => ({
    type: UserActionTypes.UPDATE_ROLE,
    payload
});

export const updateUser = (payload) => ({
    type: UserActionTypes.UPDATE_USER,
    payload
});

export const updateId = (payload) => ({
    type: UserActionTypes.UPDATE_ID,
    payload
});

export const deleteUser = (payload) => ({
    type: UserActionTypes.DELETE_USER,
    payload
});

export const deleteId = (payload) => ({
    type: UserActionTypes.DELETE_ID,
    payload
});


export const getUserThunk = (id) => {
    return async (dispatch) => {
        try {
            
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

