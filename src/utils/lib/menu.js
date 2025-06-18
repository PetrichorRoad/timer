import { routes } from "@/router/index";
import { h, ref, computed } from "vue";
import { NIcon, NEllipsis } from "naive-ui";
import { RouterLink } from "vue-router";
import { useStore } from "@/store/index";
import { BookOutline, PersonOutline, WineOutline, ChatbubbleEllipsesSharp } from "@vicons/ionicons5";
import { router } from "@/router/index";
export const iconMap = {
    BookOutline,
    PersonOutline,
    WineOutline,
    ChatbubbleEllipsesSharp
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
        path: "report",
        name: "report",
        icon: "BookOutline",
        label: "公司热点",
        component: () => import("@/views/main/report/index.vue"),
        meta: {
            Auth: true,
            title: "公司热点",
        },
    },
    // {
    //     path: "project",
    //     name: "project",
    //     icon: "BookOutline",
    //     label: "项目管理",
    //     meta: {
    //         Auth: true,
    //         title: "项目管理",
    //     },
    //     children: [
    //         {
    //             path: "my-project",
    //             name: "my-project",
    //             icon: "BookOutline",
    //             label: "我的项目",
    //             component: () => import("@/views/main/project/my-project.vue"),
    //             meta: {Auth: true,title: "我的项目"},
    //         },
    //         {
    //             path: "project-detail",
    //             name: "project-detail",
    //             icon: "BookOutline",
    //             label: "项目详情",
    //             component: () => import("@/views/main/project/project-detail.vue"),
    //             meta: { Auth: true, title: "项目详情" },
    //         },
    //         {
    //             path: "create-project",
    //             name: "create-project",
    //             icon: "BookOutline",
    //             label: "创建项目",
    //             component: () => import("@/views/main/project/create-project.vue"),
    //             meta: { Auth: true, title: "创建项目" },
    //         },
    //     ],
    // },
    {
        path: "personal",
        name: "personal",
        icon: "BookOutline",
        label: "个人中心",
        meta: {
            Auth: true,
            title: "个人中心",
        },
        children: [
            {
                path: "personal-center",
                name: "personal-center",
                icon: "BookOutline",
                label: "工作台",
                component: () => import("@/views/main/personal/workbenches.vue"),
                meta: { Auth: true, title: "工作台" },
            },
        ],
    },
    {
        path: "message",
        name: "message",
        icon: "ChatbubbleEllipsesSharp",
        label: "消息中心",
        component: () => import("@/views/main/message/index.vue"),
        meta: {
            Auth: true,
            title: "消息中心",
        }, 
    },
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
        icon: "BookOutline", label: '日程待办',
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
