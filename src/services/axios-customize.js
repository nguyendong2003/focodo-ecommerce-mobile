import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { API_URL } from './api-config';
import * as RootNavigation from '../routes/navigation/RootNavigation'

const instance = axios.create({
    baseURL: API_URL,
});

const getTokens = async () => {
    try {
        const tokenString = await SecureStore.getItemAsync('token');
        // console.log('tokenString: ', tokenString);

        if (tokenString) {
            return JSON.parse(tokenString);
        } else {
            console.log('No tokenString stored');
        }
    } catch (error) {
        console.error("Failed to access SecureStore: ", error);
    }

    return null;
}

// Add a request interceptor
instance.interceptors.request.use(async function (config) {
    const value = await getTokens();

    if (value) {
        const { access_token } = value;
        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
        }
    }
    return config;

}, function (error) {
    return Promise.reject(error);
});


const handleRefreshToken = async () => {
    const value = await getTokens();
    if (!value) return null;

    const { refresh_token } = value;

    const res = await instance.post(`/api/v1/auth/refreshToken?refreshToken=${refresh_token}`);
    if (res && res.result) {
        const access_token = res.result.access_token;
        const refresh_token = res.result.refresh_token;
        // store new access_token and refresh_token to SecureStore
        await SecureStore.setItemAsync(
            'token',
            JSON.stringify({
                access_token,
                refresh_token,
            }),
        );
        return { access_token, refresh_token }
    } else {
        return null
    }

}

const NO_RETRY_HEADER = 'x-no-retry'

// Add a response interceptor
instance.interceptors.response.use(function (response) {

    return response && response.data ? response.data : response;
}, async function (error) {
    // Nếu gặp lỗi 401 (Unauthorized) thì thực hiện refresh token và retry request
    if (error.config && error.response
        && +error.response.status === 403      // thêm dấu + để chuyển string sang kiểu number
        && !error.config.headers[NO_RETRY_HEADER]  // nếu không có header 'x-no-retry' thì mới thực hiện refresh token và retry request
    ) {
        const value = await handleRefreshToken();
        if (value) {
            const { access_token, refresh_token } = value;
            error.config.headers[NO_RETRY_HEADER] = 'true'    // thêm header 'x-no-retry' vào request để tránh việc request bị lặp lại vô tận
            if (access_token && refresh_token) {

                error.config.headers['Authorization'] = `Bearer ${access_token}`;   // update access token mới vào header của request

                // // store new access_token and refresh_token to SecureStore
                // await SecureStore.setItemAsync(
                //     'token',
                //     JSON.stringify({
                //         access_token,
                //         refresh_token,
                //     }),
                // );

                return instance.request(error.config);      // retry request
                // return instance(error.config);      // retry request
            }
        }
    }

    // Khi refresh token mà server thấy refresh token hết hạn thì chuyển hướng về trang HomePage, logout
    if (
        error.config && error.response
        && +error.response.status === 400
        && error.config.url.includes('/api/v1/auth/refreshToken')
    ) {
        RootNavigation.navigate('HomePage', {
            isDeleteUserLogin: true
        });
    }

    return error?.response?.data ?? Promise.reject(error);
});

export default instance
