// src/utils/request.js

import axios from 'axios';

// 创建axios实例
const service = axios.create({
    // baseURL: import.meta.env.VITE_API_BASE_URL || 'https://restapi.amap.com/v3/', // 设置请求的基地址
    timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        // 例如：添加token到header中
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 对响应数据做些什么
        return response.data;
    },
    error => {
        // 对响应错误做些什么
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 处理未授权的错误
                    console.error('未授权，请重新登录');
                    break;
                case 404:
                    // 处理资源不存在的错误
                    console.error('请求的资源不存在');
                    break;
                default:
                    console.error('请求失败，请稍后再试');
            }
        } else if (error.request) {
            console.error('请求失败，请检查网络连接');
        } else {
            console.error('请求配置错误');
        }
        return Promise.reject(error);
    }
);

export default service;