import { useSessionStore } from '@/store/session'
import { getUserInfo } from '@/utils/lib'
export default class conversation {
  constructor() {
    this.db = null;
  }

  async open() {
    return new Promise((resolve, reject) => {
      let { accountId  } = getUserInfo();
      const request = indexedDB.open(accountId);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this);
      };
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("talkSessions")) {
          db.createObjectStore("talkSessions"); // 最简结构
        }
      };
    });
  }

  /**
   * 保存翻译（纯值存储）
   * @param {string} key - 作为键但不存储
   * @param {object} translations - 纯翻译对象 { 'zh-CN': '...', 'en-US': '...' }
   */
  async saveSession(key, translations) {
    if (!this.db) await this.open();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["talkSessions"], "readwrite");
      const store = transaction.objectStore("talkSessions");
      const request = store.put(translations, key); // key作为外部标识

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  async saveChatMessage(key, session) {
    if (!this.db) await this.open();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["talkSessions"], "readwrite");
      const store = transaction.objectStore("talkSessions");

      // 1. 先获取当前 key 对应的数据
      const getRequest = store.get(key);

      getRequest.onsuccess = async  () => {
        const existingData = getRequest.result;
        if (!existingData) {
          await this.saveSession(key, [session])
          resolve() 
          return
        }

        // 2. 检查是否存在 value 数组（根据图片，value 是数组形式）
        // if (!Array.isArray(existingData)) {
        //   reject(new Error('Value is not an array'));
        //   return;
        // }
        // 3. 插入新数据到数组（插入到开头）
        existingData&&existingData.unshift(session);

        // 4. 更新回数据库
        const putRequest = await store.put(existingData, key);
        putRequest.onsuccess = () => resolve( );
        putRequest.onerror = (event) => reject(event.target.error);
      };
      getRequest.onerror = (event) => reject(event.target.error);
    });
  }
  async remove(key) {
    if (!this.db) await this.open();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["talkSessions"], "readwrite");
      const store = transaction.objectStore("talkSessions");
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * 获取翻译
   * @param {string} key - 查询键
   * @returns {object} 纯翻译对象
   */
  async getAll() {
    if (!this.db) await this.open();

    return new Promise((resolve) => {
      const transaction = this.db.transaction(["talkSessions"], "readonly");
      const store = transaction.objectStore("talkSessions");
      const request = store.getAll(); // 获取所有键值对

      request.onsuccess = () => {
        const result = {};
        // 遍历游标获取每条记录的key和value
        store.openCursor().onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            result[cursor.key] = cursor.value; // key作为属性名，value是翻译对象
            cursor.continue();
          } else {
            resolve(result);
          }
        };
      };

      request.onerror = () => resolve({});
    });
  }
  async getChatList(key) {
    if (!this.db) await this.open();

    return new Promise((resolve) => {
      const transaction = this.db.transaction(["talkSessions"], "readonly");
      const store = transaction.objectStore("talkSessions");
      const request = store.get(key); // 获取所有键值对

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => resolve({});
    });
  }
}

export const conversationDB = new conversation();
