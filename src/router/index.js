import { createRouter, createWebHistory } from "vue-router";
import { BookOutline, PersonOutline, WineOutline } from "@vicons/ionicons5";
import { getToken } from "@/utils/lib";
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
    redirect: '/index/main',
    meta: {
      Auth: true,
      title: '首页', icon: BookOutline,
    },
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: 'main',
        name: 'main',
        component: () => import("@/views/main/index.vue"),
        meta: {
          Auth: true,
          title: '主体', icon: BookOutline
        },
        children: [
          {
            path: 'setting',
            name: 'setting',
            component: () => import("@/views/main/setting/index.vue"),
            meta: {
              Auth: true, title: '首页', icon: BookOutline
            }
          },
          {
            path: 'test',
            name: 'test',
            component: () => import("@/views/main/test/test1.vue"),
            meta: {
              Auth: true,
              title: '主体', icon: BookOutline
            }
          },
          {
            path: 'test2',
            name: 'test2',
            component: () => import("@/views/main/test/test2.vue"),
            meta: {
              Auth: true, title: '首页', icon: BookOutline
            }
          },
          {
            path: 'question',
            name: 'question',
            component: () => import("@/views/main/question/index.vue"),
            meta: {
              Auth: true, title: '首页', icon: BookOutline
            }
          },
          {
            path: 'url',
            name: 'url',
            component: () => import("@/views/main/other/index.vue"),
            meta: {
              Auth: true, title: '首页', icon: BookOutline
            }
          },
        ]
      },
      {
        path: 'home',
        name: 'home',
        // redirect: '/index/home/test',
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

router.beforeEach((to, from, next) => {
  const login = getToken(); // 检查用户是否已登录
  if (to.meta.Auth && !login) {
    next('/login'); // 重定向到登录页面
  } else {
    next(); // 继续导航
  }
});
