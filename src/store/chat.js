import { defineStore } from 'pinia'
import { router } from '@/router'
import user from '../api/modules/user'
import { all } from 'axios'
// 第一个参数 storeId 是仓库的key 必须独一无二
export const chatStore = defineStore('chat-list', {
    state: () => {
        return {
            chatList:[]
        }
    },
    getters: {
        allChatList: (state) => state.chatList,
        friendChatList: (state) => state.chatList.filter(item => item.talk_mode === 1),
        groupChatList: (state) => state.chatList.filter(item => item.talk_mode === 2),
        talkUnreadNum: (state) => state.chatList.reduce((total, item) => total + item.unread_num, 0)
    },
    actions: {
        async getChatList () {
            console.log('先执行获取聊天列表');
            let { data} = await user.getChatList({})
            this.chatList = data.items
        }
    }
})