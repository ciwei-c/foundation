export default {
  methods: {
    /**
     * 用于多选表格，清空用户的选择
     * @memberof BsTable
     * @instance
     */
    clearSelection() {
      this.getTableInst().clearSelection();
    },
    /**
     * 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
     * @param {Object}  [row]      当前操作的行
     * @param {Boolean} [selected] 是否选中
     * @memberof BsTable
     * @instance
     */
    toggleRowSelection(row, selected) {
      this.getTableInst().toggleRowSelection(row, selected);
    },
    /**
     * 用于多选表格，切换所有行的选中状态
     * @memberof BsTable
     * @instance
     */
    toggleAllSelection() {
      this.getTableInst().toggleAllSelection();
    },
    /**
     * 用于可展开表格与树形表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开）
     * @param {Object}  [row]      当前操作的行
     * @param {Boolean} [expanded] 是否展开
     * @memberof BsTable
     * @instance
     */
    toggleRowExpansion(row, expanded) {
      this.getTableInst().toggleRowExpansion(row, expanded);
    },
    /**
     * 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。
     * @param {Object}  [row]  当前操作的行
     * @memberof BsTable
     * @instance
     */
    setCurrentRow(row) {
      this.getTableInst().setCurrentRow(row);
    },
    /**
     * 用于清空排序条件，数据会恢复成未排序的状态
     * @memberof BsTable
     * @instance
     */
    clearSort(row) {
      this.getTableInst().clearSort(row);
    },
    /**
     * 不传入参数时用于清空所有过滤条件，数据会恢复成未过滤的状态，也可传入由columnKey组成的数组以清除指定列的过滤条件
     * @param {String}  [row]  列键值
     * @memberof BsTable
     * @instance
     */
    clearFilter(columnKey) {
      this.getTableInst().clearFilter(columnKey);
    },
    /**
     * 对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法
     * @memberof BsTable
     * @instance
     */
    doLayout() {
      this.getTableInst().doLayout();
    },
    /**
     * 手动对 Table 进行排序。参数prop属性指定排序列，order指定排序顺序
     * @param {String}  [prop]   指定排序列的属性值
     * @param {String}  [order]  指定排序顺序
     * @memberof BsTable
     * @instance
     */
    sort() {
      this.getTableInst().sort();
    }
  }
};
