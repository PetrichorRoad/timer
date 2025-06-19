 import moment from "moment";
 import 'moment/locale/zh-cn';
 /**
 * 将时间戳转换为相对时间描述
 * @param {number|string|Date} timestamp - 时间戳（支持毫秒、秒、Date对象或ISO字符串）
 * @param {string} [lang='zh-cn'] - 语言设置，默认中文
 * @returns {string} 相对时间描述（如"5分钟前"）
 */
export const formatTimeAgo = (timestamp, lang = 'zh-cn') => {
    // 自动处理各种时间格式
    const time = moment(timestamp);
    // 返回相对时间
    return time.fromNow();
}