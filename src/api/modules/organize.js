import http from "./index";

export const ServOrganizeDepartmentList = (data) => {
    return http({ url: '/api/v1/organize/department/all', method: 'post', data });
}
export const ServOrganizePersonnelAll = (data) => {
    return http({ url: '/api/v1/organize/personnel/all', method: 'post', data });
}