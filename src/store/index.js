import { defineStore } from 'pinia'
import { router } from '@/router'

// 第一个参数 storeId 是仓库的key 必须独一无二
export const useStore = defineStore('storeId', {
    state: () => {
        return {
            theme:'overrides1',
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
        setActiveMenu(activeMenu) {
            this.activeMenu = activeMenu
            router.push({ name: activeMenu.name })
            // 切记顺序不可反
            // let includes = this.tabList.find(item => item.key === activeMenu.key)
            // if (!includes) {
            //     this.tabList.push(activeMenu)
            // }
        },
    }
})
