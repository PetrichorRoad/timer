import http from "./index";

export const ServCustomizeEmoticonList = () => {
    return http({ url: '/api/v1/emoticon/customize/list', method: 'POST' });
}
export const ServCustomizeEmoticonUpload = (data) => {
    return http({ url: '/api/v1/emoticon/customize/upload', method: 'POST', data });
}

export const ServCustomizeEmoticonDelete = (data) => {
    return http({ url: '/api/v1/emoticon/customize/delete', method: 'POST', data });
}

export const ServCustomizeEmoticonCreate = (data) => {
    return http({ url: '/api/v1/emoticon/customize/create', method: 'POST', data });
}
