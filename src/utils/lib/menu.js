import { routes } from "@/router/index";
import { h, ref, computed } from "vue";
import { NIcon, NEllipsis } from "naive-ui";
import { RouterLink } from "vue-router";
import { useStore } from "@/store/index";
import { BookOutline, PersonOutline, WineOutline } from "@vicons/ionicons5";
import {router} from "@/router/index";
const renderIcon = (icon) => {
    const iconMap = {
        BookOutline, PersonOutline, WineOutline
    };
    return () => h(NIcon, null, { default: () => h(iconMap[icon]) });
};
const renderTitle = (menu, title) => {
    h(NEllipsis, null, { default: () => title })
};
const getMenuList = (routes) => {
    return routes.map((item) => {
        if (item.children && item.children.length > 0) {
            return {
                key: item.name,
                meta: item.meta,
                name: item.name,
                // icon: renderIcon(item.icon),
                // label: JSON.stringify(item.meta.title) ,
                label: item.meta.title,
                children: getMenuList(item.children),
            };
        } else {
            return {
                key: item.name,
                meta: item.meta,
                name: item.name,
                // icon: renderIcon(item.icon),
                // label: JSON.stringify(item.meta.title),
                label: item.meta.title,
            };
        }
    })
}
const otherMenu = () => {
    let routeMap = [
        {
            key: 'document',
            label: '文档',
            name: "url",
            children: [
                {
                    key: 'document_Vchart',
                    label: 'Vchart文档',
                    mate: {
                        Auth: false,
                        title: "Vchart文档",
                        link: 'https://visactor.com/vchart'
                    }
                },
                {
                    key: 'document_vite',
                    label: 'Vite文档',
                    mate: {
                        Auth: false,
                        title: "Vite文档",
                        link: 'https://cn.vitejs.dev/'
                    }
                },
                {
                    key: 'document_NaiveUI',
                    label: 'NaiveUI文档',
                    mate: {
                        Auth: false,
                        title: "NaiveUI文档",
                        link: 'https://www.naiveui.com/zh-CN/os-theme/docs/introduction'
                    }
                }
            ]
        }
    ]
    // routeMap.forEach((item) => {
    //     router.addRoute('main', { ...item, name: item.label, path: item.label })
    // })
    return routeMap
}
export const menuList = () => {
    let menu = [{
        key: 'user-center',
        icon: 'BookOutline',
        label: '罪恶王冠',
        link: '/user-center',
        children: [
            {
                key: 'user-center-info',
                label: '听雨书',
                icon: 'BookOutline',
                path: '/user-center/info',
                link:'http://192.168.234.1:8080/test'
            },
            {
                key: 'user-center-password',
                label: '望天湖',
                icon: 'BookOutline',
                path: '/user-center/password',
                link: 'http://192.168.234.1:8080/test2'
            },
            {
                key: 'user-center-word',
                label: '人间寥寥情难诉',
                icon: 'BookOutline',
                path: '/user-center/password',
                link: 'http://192.168.234.1:8080/question'
            },
            {
                key: 'user-center-hero',
                label: '回忆斑斑',
                icon: 'BookOutline',
                path: '/user-center/password',
                link: 'http://192.168.234.1:8080/setting',
                children: [
                    {
                        key: 'user-center-hero-love',
                        label: '留在爱你的路,留在爱你的路,留在爱你的路',
                        icon: 'BookOutline',
                        path: '/user-center/password',
                        link: 'http://192.168.234.1:8080/setting1',
                    },
                ]
            },
        ]
    }];
    const menuList = routes.filter((item) => item.name == "index");
    return [...getMenuList(menuList), ...otherMenu()]
}