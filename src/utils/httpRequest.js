import axios from 'axios';
import { baseURL } from '../reducers/RootReducer';

const httpRequest = axios.create({
    baseURL: `${baseURL}/`,
});
