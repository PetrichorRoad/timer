import { conversationDB } from "@/database/index";
import { useSessionStore } from '@/store/session'
export const getSessionList = async (lang) => {
    return new Promise(async (resolve, reject) => {
        const sessionList = await conversationDB.getAll();
        resolve(sessionList);
    });
}
export const saveSession = async (key, session) => {
    return new Promise(async (resolve, reject) => {
        await conversationDB.saveSession(key, session);
        resolve();
    });
}
export const saveChat = async (key,chatMessage) => {
    await conversationDB.saveChatMessage(key, chatMessage);
}
export const deleteSession = async (key) => {
    return new Promise(async (resolve, reject) => {
        await conversationDB.remove(key);
        resolve();
    });
}
export const getSession = async (key) => {
    return new Promise(async (resolve, reject) => {
        const session = await conversationDB.getChatList(key);
        resolve(session);
    });
}