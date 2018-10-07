'use strict';
const lodash = require('lodash');
const crypto = require('crypto');

module.exports = {
  /**
     * 产生随机数
     *
     * @param {Number} n - 指定n位数
     * @return {String} see 返回指定长度的字符串
     */
  randomNumber(n) {
    let str = '';

    for (let i = 0; i < n; i++) {
      str += Math.floor(Math.random() * 10);
    }

    return str;
  },

  /**
   * 数组格式转树状结构
   * @param   {array}     array
   * @param   {String}    id
   * @param   {String}    pid
   * @param   {String}    children
   * @return  {Array}
   */
  arrayToTree(array, id = 'id', pid = 'pid', children = 'children') {
    const data = lodash.cloneDeep(array);
    const result = [];
    const hash = {};
    data.forEach((item, index) => {
      hash[data[index][id]] = data[index];
    });

    data.forEach(item => {
      const hashVP = hash[item[pid]];
      if (hashVP) {
        !hashVP[children] && (hashVP[children] = []);
        hashVP[children].push(item);
      } else {
        result.push(item);
      }
    });
    return result;
  },

  getFilterQuery(query, props = [], isDelete = false) {
    const newQuery = lodash.pick(query, props);
    Object.keys(newQuery).forEach(key => {
      if (!query[key]) {
        delete newQuery[key];
      } else {
        newQuery[key] = newQuery[key].trim();
      }
    });

    if (!isDelete) {
      newQuery.is_delete = 0;
    }

    return newQuery;
  },

  getHashResult(hexString) {
    // 转成16进制，比如 0x4d 0xc9 ...
    hexString = hexString.replace(/(\w{2,2})/g, '0x$1 ').trim();
  
    // 转成16进制数组，如 [0x4d, 0xc9, ...]
    const arr = hexString.split(' ');
  
    // 转成对应的buffer，如：<Buffer 4d c9 ...>
    const buff = Buffer.from(arr);
  
    const hash = crypto.createHash('md5');
  
    // 计算md5值
    const result = hash.update(buff).digest('hex');
  
    return result;
  },

  errorCode: {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '请求的数据不存在',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
    NOTLOGIN: 'notLoginError',
    PERMISSION: 'permissionError',
    CONNECTIONTIMEOUT: 'connectionTimeoutError',
    FORMAT: 'formatError',
    FOUND: 'notFoundError'
  }
};
