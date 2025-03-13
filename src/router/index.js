import { createRouter, createWebHistory } from "vue-router";
import { BookOutline, PersonOutline, WineOutline } from "@vicons/ionicons5";
import { getToken } from "@/utils/lib";
import { menuListByOther } from "@/utils/lib/menu";
export const routes = [
  {
    path: "/",
    name: 'base',
    redirect: '/index',
    meta: {
      Auth: false,
      title: ''
    }
  },
  {
    path: "/login",
    name: 'login',
    component: () => import("@/views/login/login.vue"),
    meta: {
      Auth: false,
      title: "登录"
    }
  },
  {
    path: '/index',
    name: 'index',
    icon: "BookOutline",
    redirect: '/index/main/test',
    label: '六合萧条',
    meta: {
      Auth: true,
      title: '首页', icon: BookOutline,
    },
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: 'main',
        name: 'main',
        icon: "BookOutline", label: '万径踪灭',
        component: () => import("@/views/main/index.vue"),
        meta: {
          Auth: true,
          title: '主体', icon: BookOutline
        },
        children: [
          {
            path: 'user',
            name: 'user',
            icon: "BookOutline", label: '用户管理',
            component: () => import("@/views/main/setting/user.vue"),
            meta: {
              Auth: true, title: '首页', icon: BookOutline
            }
          },
          {
            path: 'power',
            name: 'power',
            icon: "BookOutline", label: '用户管理',
            component: () => import("@/views/main/setting/power.vue"),
            meta: {
              Auth: true, title: '首页', icon: BookOutline
            }
          },
          {
            path: 'test',
            name: 'test', icon: "BookOutline", label: '血刃仇敌',
            component: () => import("@/views/main/test/test1.vue"),
            meta: {
              Auth: true,
              title: '主体', icon: BookOutline
            }
          },
          {
            path: 'test2',
            name: 'test2', icon: "BookOutline", label: '听雨书',
            component: () => import("@/views/main/test/test2.vue"),
            meta: {
              Auth: true, title: '首页', icon: BookOutline
            }
          },
          {
            path: 'question',
            name: 'question', icon: "BookOutline", label: '望天湖',
            component: () => import("@/views/main/question/index.vue"),
            meta: {
              Auth: true, title: '首页', icon: BookOutline
            }
          },
        ]
      },
      {
        path: 'home',
        name: 'home', icon: "BookOutline", label: '回忆斑斑',
        component: () => import("@/views/home/index.vue"),
        meta: {
          Auth: true, title: '首页', icon: BookOutline
        }
      },
    ]
  },

];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
menuListByOther.forEach((item) => {
  router.addRoute('main',item);
});
router.beforeEach((to, from, next) => {
  const login = getToken(); // 检查用户是否已登录
  if (to.meta.Auth && !login) {
    next('/login'); // 重定向到登录页面
  } else {
    next(); // 继续导航
  }
});
