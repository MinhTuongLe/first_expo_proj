/**
 * Created by dang.le from 04/09/2018
 */
import * as actionTypes from '../actions/types';

const initialState = {
    isReady: false,
    io: null
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.SOCKET_INIT:
            return {
                ...state,
                isReady: true,
                io: action.payload.io
            };
        default:
            return state;
    }
}