import { routes } from "@/router/index";
import { h, ref, computed } from "vue";
import { NIcon, NEllipsis } from "naive-ui";
import { RouterLink } from "vue-router";
import { useStore } from "@/store/index";
import { BookOutline, PersonOutline, WineOutline } from "@vicons/ionicons5";
import { router } from "@/router/index";
export const iconMap = {
    BookOutline,
    PersonOutline,
    WineOutline,
};
const renderIcon = (icon) => {
    return () => h(NIcon, null, { default: () => h(icon) });
};
const renderTitle = (menu, title) => {
    h(NEllipsis, null, { default: () => title });
};
const getMenuList = (routes) => {
    return routes.map((item) => {
        if (item.children && item.children.length > 0) {
            return {
                key: item.name,
                meta: item.meta,
                name: item.name,
                icon: renderIcon(iconMap[item.icon]),
                label: item.label,
                path: item.path,
                children: getMenuList(item.children),
            };
        } else {
            return {
                key: item.name,
                meta: item.meta,
                name: item.name,
                icon: renderIcon(iconMap[item.icon]),
                label: item.label,
                path: item.path,
            };
        }
    });
};
export const menuListByOther = [
    {
        path: "document",
        name: "document",
        icon: "BookOutline",
        label: "文档",
        meta: {
            Auth: true,
            title: "文档",
        },
        children: [
            {
                path: "document_Vchart",
                name: "document_Vchart",
                icon: "BookOutline",
                label: "Vchart文档",
                component: () => import("@/views/main/other/index.vue"),
                meta: {
                    Auth: true,
                    title: "Vchart文档",
                    link: "https://visactor.com/vchart",
                },
            },
            {
                path: "document_vite",
                name: "document_vite",
                icon: "BookOutline",
                label: "Vite文档",
                component: () => import("@/views/main/other/index.vue"),
                meta: {
                    Auth: true,
                    title: "Vchart文档",
                    link: "https://cn.vitejs.dev/",
                },
            },
            {
                path: "document_NaiveUI",
                name: "document_NaiveUI",
                icon: "BookOutline",
                label: "NaiveUI文档",
                component: () => import("@/views/main/other/index.vue"),
                meta: {
                    Auth: true,
                    title: "NaiveUI文档",
                    link: "https://www.naiveui.com/zh-CN/os-theme/docs/introduction",
                },
            },
        ],
    },
];
export const menuListBySelf = [
    {
        path: "data",
        name: "data",
        icon: "BookOutline",
        label: "数据看板",
        component: () => import("@/views/main/test/test1.vue"),
        meta: {
            Auth: true,
            title: "数据看板",
        },
    },
    {
        path: "user",
        name: "user",
        icon: "BookOutline",
        label: "用户管理",
        component: () => import("@/views/main/test/test2.vue"),
        meta: {
            Auth: true,
            title: "用户管理",
        },
    },
    {
        path: 'power',
        name: 'power',
        icon: "BookOutline", label: '权限管理',
        component: () => import("@/views/main/setting/power.vue"),
        meta: {
            Auth: true, title: '首页', icon: BookOutline
        }
    },
    {
        path: 'menu',
        name: 'menu', icon: "BookOutline", label: '菜单管理',
        component: () => import("@/views/main/setting/menu.vue"),
        meta: {
            Auth: true, title: '菜单管理', icon: BookOutline
        }
    },
    {
        path: 'task',
        name: 'task',
        icon: "BookOutline", label: '任务安排',
        component: () => import("@/views/main/task/work.vue"),
        meta: {
            Auth: true, title: '首页', icon: BookOutline
        }
    },
];
export const menuList = () => {
    const menuList = routes.filter((item) => item.name == "index");
    return [...getMenuList(menuListBySelf), ...getMenuList(menuListByOther)];
};
