import http from '@/api/modules/index'
export const ServUploadImage = (data) => { 
    return http({
        url: '/api/v1/upload/media-file',
        method: 'post',
        data
    })
}
