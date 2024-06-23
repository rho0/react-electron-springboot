import axios, { AxiosInstance } from 'axios';

// 개발 모드일 때
let baseURL = `http://${window.location.host}`;
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:8080';
}

// 빌드 모드일 때
if (process.env.NODE_ENV === 'production') {
    baseURL = `http://${window.location.host}:8080`;
}


const http: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type":"application/json",
        'Access-Control-Allow-Origin': 'http://localhost:8080', // 서버 domain
        'X-AUTH-TOKEN': `${localStorage.getItem('X-AUTH-TOKEN')}`
    },
    withCredentials: true,
});


export default http;