import Constants from "expo-constants";

const API_DOMAIN = process.env.EXPO_PUBLIC_API_DOMAIN
const API_EXPO = Constants.expoConfig?.hostUri?.split(':').shift()
const inBrowser = typeof document !== 'undefined';

export const apiDomain =
    API_DOMAIN ? API_DOMAIN
        : API_EXPO ? API_EXPO?.concat(':8080')
            : inBrowser ? document.location.hostname
                : 'unknown';


const protocol = API_DOMAIN ? 'https' : 'http';

const API_URL = `${protocol}://${apiDomain}`;
console.log('API_URL:', API_URL);
console.log('API_EXPO:', API_EXPO);


export { API_URL, API_EXPO };

