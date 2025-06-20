export default class TranslationDB {
  constructor(dbName = 'TranslationDB') {
    this.dbName = dbName;
    this.db = null;
  }

  async open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this);
      };
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('translations')) {
          db.createObjectStore('translations'); // 最简结构
        }
      };
    });
  }

  /**
   * 保存翻译（纯值存储）
   * @param {string} key - 作为键但不存储
   * @param {object} translations - 纯翻译对象 { 'zh-CN': '...', 'en-US': '...' }
   */
  async save(key, translations) {
    if (!this.db) await this.open();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['translations'], 'readwrite');
      const store = transaction.objectStore('translations');
      const request = store.put(translations, key); // key作为外部标识

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * 获取翻译
   * @param {string} key - 查询键
   * @returns {object} 纯翻译对象
   */
  async get(key) {
    if (!this.db) await this.open();

    return new Promise((resolve) => {
      const transaction = this.db.transaction(['translations'], 'readonly');
      const store = transaction.objectStore('translations');
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result || {});
      request.onerror = () => resolve({});
    });
  }
  async getAll() {
  if (!this.db) await this.open();

  return new Promise((resolve) => {
    const transaction = this.db.transaction(['translations'], 'readonly');
    const store = transaction.objectStore('translations');
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
}

export const i18nDB = new TranslationDB();