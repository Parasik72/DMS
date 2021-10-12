const SET_USER = 'SET_USER';
const LOGOUT_USER = 'LOGOUT_USER';

const defaultState = {
    user: {},
    isAuth: false
}

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuth: true
            };
        case LOGOUT_USER:
            return {
                ...state,
                user: {},
                isAuth: false
            };
        default:
            return state;
    }
}

export const setUser = user => ({type: SET_USER, payload: user});
export const logoutUser = () => ({type: LOGOUT_USER});