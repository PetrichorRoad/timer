import { defineStore } from 'pinia'
import { router } from '@/router'
import user from '../api/modules/user'
import { all } from 'axios'
// 第一个参数 storeId 是仓库的key 必须独一无二
export const chatStore = defineStore('chat-list', {
    state: () => {
        return {
            chatList:[],
            conversation:{id:null,talk_mode:null},

            chatRecords:[],

            groupInfo:[],
            friendInfo:{},
            friendStatus:{},
        }
    },
    getters: {
        allChatList: (state) => state.chatList,
        friendChatList: (state) => state.chatList.filter(item => item.talk_mode === 1),
        groupChatList: (state) => state.chatList.filter(item => item.talk_mode === 2),
        talkUnreadNum: (state) => state.chatList.reduce((total, item) => total + item.unread_num, 0),

        talkMode: (state) => state.conversation.talk_mode,

        userTalkSession: (state) => {
            let { chatRecords, friendInfo, friendStatus, conversation } = state
            return { chatRecords, friendInfo, friendStatus, conversation }
        },
        groupTalkSession: (state) => {
            let { chatRecords, groupInfo, conversation } = state
            return { chatRecords, groupInfo, conversation }
        }
    },
    actions: {
        async getChatList () {
            let { data} = await user.getChatList({})
            this.chatList = data.items
        },
        setConversation(talk){
            this.conversation = talk
            let { talk_mode } = talk
            switch (talk_mode) {
                case 1:
                    this.getFriendsInfo()
                    this.getFriendsStatus()
                    this.getChatRecords()
                    break;
                case 2:
                    this.getGroupInfo()
                    this.getChatRecords()
                    break;
            }
        },
        async getChatRecords () {
            let { talk_mode, to_from_id } = this.conversation
            let { data } = await user.getTalkRecords({ talk_mode, to_from_id, cursor :0, limit: 30})
            this.chatRecords = data.items
        },
        async getGroupInfo () {
            let { to_from_id } = this.conversation
            let { data } = await user.getGroupInfo({ group_id:to_from_id })
            this.groupInfo = data
        },
        async getFriendsInfo () {
            let { to_from_id } = this.conversation
            let { data } = await user.getFriendsInfo({ user_id:to_from_id })
            this.friendInfo = data
        },
        async getFriendsStatus () {
            let { to_from_id } = this.conversation
            let { data } = await user.getFriendsStatus({ user_id:to_from_id })
            this.friendInfo = data
        },

    }
})