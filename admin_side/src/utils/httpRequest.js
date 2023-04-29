import axios from 'axios';
const API_URL = "https://cdf8-2405-4802-7156-30-1dd5-657b-72d9-5ae6.ngrok-free.app";

const request = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});

const requestToken = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    timeout: 5000,
});

export const get = async (url) => {
    try {
        let res = await requestToken.get(url);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const getParam = async (url, params) => {
    try {
        let res = await requestToken.get(url, params);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const post = async (url, data) => {
    try {
        let res;
        if (localStorage.getItem('token')) {
            res = await requestToken.post(url, data);
        } else {
            res = await request.post(url, data);
        }
        return res.data;
    } catch (error) {
        return error.response.data.message;
    }
};

export const postForm = async (url, data) => {
    try {
        let res = await requestToken.post(url, data);
        return res.data;
    } catch (error) {
        return error.response.data.message;
    }
};

export const _delete = async (url) => {
    try {
        let res = await requestToken.delete(url);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const put = async (url, data) => {
    try {
        let res = await requestToken.put(url, data);
        return res.data;
    } catch (error) {
        return error;
    }
}
    