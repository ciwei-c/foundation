export default {
  methods: {
    /**
     * 获取当前值，如果当前值不存在则返回默认值
     * @param {String|Number|Boolean} [value]        当前值
     * @param {String|Number|Boolean} [defaultValue] 默认值
     * @memberof BsTable
     * @instance
     */
    handleAttribute(value, defaultValue) {
      if (value === false || value === 0 || value === '') {
        return value;
      }
      return value || defaultValue;
    },
    /**
     * 判断当前的值是true或者false
     * @param {String|Number|Boolean} [value]  当前值
     * @memberof BsTable
     * @instance
     */
    handleValueBoolean(value) {
      return !!value;
    },
    /**
     * 获取icon正确的类名
     * @param {String} [icon]  图标
     * @memberof BsTable
     * @instance
     */
    handleIcon(icon) {
      return (this.handleValueBoolean(icon) && `el-icon-${icon}`) || '';
    },
    /**
     * 获取 disabled 属性值
     * @param {Function} [cb]   回调函数
     * @param {Object}   [row]  行数据
     * @memberof BsTable
     * @instance
     */
    handleDisableAttribute(cb, row) {
      if (typeof cb === 'function') {
        return cb(row) || false;
      }
      return false;
    },
    /**
     * 获取 disabled 属性值
     * @param {Function} [cb]   回调函数
     * @param {Object}   [row]  行数据
     * @memberof BsTable
     * @instance
     */
    handleFormItemBoolean(v, item) {
      return this.handleValueBoolean(v.component) && this.handleValueBoolean(v.component.name) && v.component.name === item;
    },
    /**
     * 隐藏某个按钮
     * @param {Function} [hidden]  隐藏判定条件
     * @param {Object}   [row]     行数据
     * @memberof BsTable
     * @instance
     */
    handleDispalyAttribute(hidden, row) {
      if (hidden === undefined) return true;
      if (typeof hidden !== 'function') return !hidden;
      let ret = hidden(row);
      return !ret;
    },
    /**
     * 深度拷贝
     * @param {Object|Array} [source]  需要拷贝的值
     * @memberof BsTable
     * @instance
     */
    deepClone(source) {
      if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'deepClone');
      }
      const targetObj = source.constructor === Array ? [] : {};
      Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
          targetObj[keys] = this.deepClone(source[keys]);
        } else {
          targetObj[keys] = source[keys];
        }
      });
      return targetObj;
    }
  }
};
