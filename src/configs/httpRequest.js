import axios from 'axios';
import { baseURL } from '../reducers/RootReducer';

export let endpoints = {
    menus: '/menus/',
    halls: '/halls/',
    hallDetail: (hallId) => `/halls/${hallId}/`,
    rating: (hallId) => `/halls/${hallId}/rating/`,
    services: '/services/',
    comboService: '/combo-service/',
    banners: '/banners/',
    signUp: '/customers/',
    oauth2Info: '/oauth2-info/',
    signIn: '/o/token/',
    currentCustomer: '/customers/current-user/',
    orders: '/order/',
    comments: '/comments/',
    addComment: '/comment/add-comment/',
};

const httpRequest = axios.create({
    baseURL: `${baseURL}/`,
});

export default httpRequest;
