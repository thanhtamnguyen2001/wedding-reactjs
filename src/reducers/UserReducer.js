import cookies from 'react-cookies';

const initState = {
    user: cookies.load('customer'),
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'USER_SIGNIN':
            return {
                ...state,
                user: action.payload,
            };
        case 'USER_SIGNOUT':
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export default userReducer;
