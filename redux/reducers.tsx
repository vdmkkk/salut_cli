import { SET_FILTERS, SET_PROFILE } from "./actions";

const initialState = {
    filters: {
        'distance': 0,
        'prices': [],
        'tags': [],
        'activity': {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false
        },
        'location': {'coordinate': [55.752916397098886, 37.62333981692791], 'radius': 2500},
        'cusine': null
    },
    profile: {
        id: null,
        login: null,
        password: null,
        tag: null,
        avatar: null,
        liked: null,
        likedplaylists: null,
        likedroutes: null,
        date: null,
        city: null,
        algorithms: null
    }
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILTERS:
            return {...state, filters: action.payload}
        case SET_PROFILE:
            return {...state, profile: action.payload}
        default:
            return state;
    }
}

export default userReducer;