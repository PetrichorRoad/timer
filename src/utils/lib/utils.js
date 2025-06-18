 import moment from "moment";
 /**
 * 将时间戳转换为相对时间描述
 * @param {number|string|Date} timestamp - 时间戳（支持毫秒、秒、Date对象或ISO字符串）
 * @param {string} [lang='zh-cn'] - 语言设置，默认中文
 * @returns {string} 相对时间描述（如"5分钟前"）
 */
export const formatTimeAgo = (timestamp, lang = 'zh-cn') => {
    // 处理不同类型的时间戳输入
    moment.locale(lang);
    // 自动处理各种时间格式
    const time = moment(timestamp);

    // 返回相对时间
    return time.fromNow();
}