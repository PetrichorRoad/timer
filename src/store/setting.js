import { defineStore } from 'pinia'
import { router } from '@/router'
// 第一个参数 storeId 是仓库的key 必须独一无二
export const useStore = defineStore('storeId', {
    state: () => {
        return {
            theme:'overrides1',
            lang:'zh-CN',
            activeMenu: null,
            tabList:[]
        }
    },
    getters: {},
    actions: {
        setTheme(theme) {
            this.theme = theme
            document.documentElement.className = theme;
        },
        setLangs(lang){
            this.lang = lang
        },
        setActiveMenu(activeMenu) {
            console.log(activeMenu);
            router.push({ name: activeMenu.name})
        },
    }
})
