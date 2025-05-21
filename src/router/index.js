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
    redirect: '/index/main/user',
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
            icon: "BookOutline", label: '权限管理',
            component: () => import("@/views/main/setting/power.vue"),
            meta: {
              Auth: true, title: '首页', icon: BookOutline
            }
          },
          {
            path: 'data',
            name: 'data', icon: "BookOutline", label: '数据看板',
            component: () => import("@/views/main/test/test1.vue"),
            meta: {
              Auth: true,
              title: '数据看板', icon: BookOutline
            }
          },
          {
            path: 'workbench',
            name: 'workbench', icon: "BookOutline", label: '工作台',
            component: () => import("@/views/main/personal/work-page.vue"),
            meta: {
              Auth: true, title: '工作台', icon: BookOutline
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
          {
            path: 'menu',
            name: 'menu', icon: "BookOutline", label: '菜单管理',
            component: () => import("@/views/main/setting/menu.vue"),
            meta: {
              Auth: true, title: '菜单管理', icon: BookOutline
            }
          },
        ]
      },
      {
        path: 'work',
        name: 'work',
        icon: "BookOutline", label: '工作',
        component: () => import("@/views/main/index.vue"),
        meta: {
          Auth: true,
          title: '工作', icon: BookOutline
        },
        children: [
          {
            path: 'task',
            name: 'task',
            icon: "BookOutline", label: '任务安排',
            component: () => import("@/views/main/task/work.vue"),
            meta: {
              Auth: true, title: '首页', icon: BookOutline
            }
          }
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
