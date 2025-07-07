import { conversationDB } from "@/database/index";

export const getSessionList = async (lang) => {
    return new Promise(async (resolve, reject) => {
        const sessionList = await conversationDB.getAll();
        resolve(sessionList);
    });
}
export const saveSession = async (key, session) => {
    return new Promise(async (resolve, reject) => {
        await conversationDB.save(key, session);
        resolve();
    });
}
export const deleteSession = async (key) => {
    return new Promise(async (resolve, reject) => {
        await conversationDB.remove(key);
        resolve();
    });
}