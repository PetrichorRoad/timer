// db.js - IndexedDB 封装类
class LocalizationDB {
  constructor(dbName = 'i18nDB', version = 1) {
    this.dbName = dbName
    this.version = version
    this.db = null
  }

  // 打开或创建数据库
  open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)
      
      request.onerror = (event) => {
        reject(`IndexedDB error: ${event.target.error}`)
      }
      
      request.onsuccess = (event) => {
        this.db = event.target.result
        resolve(this.db)
      }
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result
        if (!db.objectStoreNames.contains('translations')) {
          // 创建存储对象
          const store = db.createObjectStore('translations', { keyPath: 'id' })
          // 创建索引以便按语言查询
          store.createIndex('language', 'language', { unique: false })
        }
      }
    })
  }

  // 存储多语言数据
  async storeTranslations(lang, translations) {
    if (!this.db) await this.open()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['translations'], 'readwrite')
      const store = transaction.objectStore('translations')
      
      // 先删除该语言现有数据
      const clearRequest = store.index('language').openCursor(IDBKeyRange.only(lang))
      
      clearRequest.onsuccess = (event) => {
        const cursor = event.target.result
        if (cursor) {
          store.delete(cursor.primaryKey)
          cursor.continue()
        } else {
          // 存储新数据
          const id = `${lang}_${Date.now()}`
          const request = store.add({
            id,
            language: lang,
            translations,
            timestamp: new Date().getTime()
          })
          
          request.onsuccess = () => resolve()
          request.onerror = (e) => reject(e.target.error)
        }
      }
    })
  }

  // 获取指定语言的数据
  async getTranslations(lang) {
    if (!this.db) await this.open()
    
    return new Promise((resolve) => {
      const transaction = this.db.transaction(['translations'], 'readonly')
      const store = transaction.objectStore('translations')
      const index = store.index('language')
      const request = index.getAll(IDBKeyRange.only(lang))
      
      request.onsuccess = (event) => {
        const results = event.target.result
        if (results.length > 0) {
          // 返回最新的数据
          const latest = results.reduce((prev, current) => 
            prev.timestamp > current.timestamp ? prev : current
          )
          resolve(latest.translations)
        } else {
          resolve(null)
        }
      }
      
      request.onerror = () => resolve(null)
    })
  }

  // 清除指定语言的数据
  async clearLanguage(lang) {
    if (!this.db) await this.open()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['translations'], 'readwrite')
      const store = transaction.objectStore('translations')
      const request = store.index('language').openCursor(IDBKeyRange.only(lang))
      
      request.onsuccess = (event) => {
        const cursor = event.target.result
        if (cursor) {
          store.delete(cursor.primaryKey)
          cursor.continue()
        } else {
          resolve()
        }
      }
      
      request.onerror = (e) => reject(e.target.error)
    })
  }
}

export const i18nDB = new LocalizationDB()