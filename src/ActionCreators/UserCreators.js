export function signInUser(payload) {
    return {
        type: 'USER_SIGNIN',
        payload: payload,
    };
}

export function signOutUser(payload = null) {
    return {
        type: 'USER_SIGNOUT',
        payload: payload,
    };
}
