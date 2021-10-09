/**
 * Table Events
 * @page-change         分页修改
 * @want-create         表格右上角新增按钮点击
 * @want-update         行操作栏编辑按钮点击
 * @want-delete         行操作栏删除按钮点击
 * @on-search         表格上方查询表单搜索按钮点击
 * @selection-change    选中行改变时
 * @expand-change       展开行改变时
 * @select              当用户手动勾选数据行的 Checkbox 时触发的事件
 * @select-all          当用户手动勾选全选 Checkbox 时触发的事件
 * @cell-mouse-enter    当单元格 hover 进入时会触发该事件
 * @cell-mouse-leave    当单元格 hover 退出时会触发该事件
 * @cell-click          当某个单元格被点击时会触发该事件
 * @cell-dblclick       当某个单元格被双击击时会触发该事件
 * @row-click           当某一行被点击时会触发该事件
 * @row-contextmenu     当某一行被鼠标右键点击时会触发该事件
 * @row-dblclick        当某一行被双击时会触发该事件
 * @header-click        当某一列的表头被点击时会触发该事件
 * @header-contextmenu  当某一列的表头被鼠标右键点击时触发该事件
 * @sort-change         当表格的排序条件发生变化的时候会触发该事件
 * @filter-change       当表格的筛选条件发生变化的时候会触发该事件
 * @current-change      当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性
 * @header-dragend      当拖动表头改变了列的宽度的时候会触发该事件
 *
 * Custom-Events      配置 rowHandle 属性下任意的事件
 *
 * @memberof BsTable
 * @instance
 */

export default {
  methods: {
    /**
     * 向父组件传递查询事件，并传递查询条件
     * @memberof BsTable
     * @instance
     */
    onCreate() {
      this.$emit('want-create');
    },
    /**
     * 向父组件传递想要更新的事件
     * @param {Object} [row]   行数据
     * @param {Number} [index] 行索引
     * @memberof BsTable
     * @instance
     */
    onUpdate(row, index) {
      this.$emit('want-update', row, index);
    },
    /**
     * 向父组件传递删除该列的事件
     * @param {Object} [row]   行数据
     * @param {Number} [index] 行索引
     * @memberof BsTable
     * @instance
     */
    onDelete(row, index) {
      this.$emit('want-delete', row, index);
    },
    /**
     * 向父组件传递查询事件，并传递查询条件
     * @param {Object} [search] 查询条件
     * @memberof BsTable
     * @instance
     */
    onSearch(search) {
      this.$emit('on-search', search);
    },
    /**
     * 向父组件传递分页修改事件，并传递分页信息
     * @param {Object} [page] 分页信息
     * @memberof BsTable
     * @instance
     */
    onPageChange(page) {
      this.$emit('page-change', page);
    },
    /**
     * 向父组件传递选中事件
     * @param {Array} [selection] 选中行集合
     * @memberof BsTable
     * @instance
     */
    onSelectionChange(selection) {
      this.$emit('selection-change', selection);
    },
    /**
     * 当展开/收缩列时
     * @param {Object} [expandedRow]  当前展开列对象
     * @param {Array}  [expandedRows] 全部展开列对象集合
     * @memberof BsTable
     * @instance
     */
    onExpandChange(expandedRow, expandedRows) {
      this.$emit('expand-change', expandedRow, expandedRows);
    },
    /**
     * 由 rowHandle 设置的自定义事件触发
     * @param {String} [event]    事件名称
     * @param {Object} [...args]  剩余所有参数
     * @memberof BsTable
     * @instance
     */
    onEmit(event, ...args) {
      this.$emit(event, ...args);
    },
    /**
     * 当用户手动勾选数据行的 Checkbox 时触发的事件
     * @param {Array}  [selection] 选中行集合
     * @param {Object} [row]       当前行
     * @memberof BsTable
     * @instance
     */
    onSelect(selection, row) {
      this.$emit('select', selection, row);
    },
    /**
     * 当用户手动勾选全选 Checkbox 时触发的事件
     * @param {Array}  [selection] 选中行集合
     * @memberof BsTable
     * @instance
     */
    onSelectAll(selection) {
      this.$emit('select-all', selection);
    },
    /**
     * 当单元格 hover 进入时
     * @param {Object} [row]    行数据
     * @param {Object} [column] 列数据
     * @param {Object} [cell]   单元格dom
     * @param {Object} [event]  事件对象
     * @memberof BsTable
     * @instance
     */
    onCellMouseEnter(row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event);
    },
    /**
     * 当单元格 hover 退出时
     * @param {Object} [row]    行数据
     * @param {Object} [column] 列数据
     * @param {Object} [cell]   单元格dom
     * @param {Object} [event]  事件对象
     * @memberof BsTable
     * @instance
     */
    onCellMouseLeave(row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event);
    },
    /**
     * 当某个单元格被点击时
     * @param {Object} [row]    行数据
     * @param {Object} [column] 列数据
     * @param {Object} [cell]   单元格dom
     * @param {Object} [event]  事件对象
     * @memberof BsTable
     * @instance
     */
    onCellClick(row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event);
    },
    /**
     * 当某个单元格被双击击时会触发该事件
     * @param {Object} [row]    行数据
     * @param {Object} [column] 列数据
     * @param {Object} [cell]   单元格dom
     * @param {Object} [event]  事件对象
     * @memberof BsTable
     * @instance
     */
    onCellDblClick(row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event);
    },
    /**
     * 当某一行被点击时会触发该事件
     * @param {Object} [row]    行数据
     * @param {Object} [column] 列数据
     * @param {Object} [event]  事件对象
     * @memberof BsTable
     * @instance
     */
    onRowClick(row, column, event) {
      this.$emit('row-click', row, column, event);
    },
    /**
     * 当某一行被鼠标右键点击时会触发该事件
     * @param {Object} [row]    行数据
     * @param {Object} [column] 列数据
     * @param {Object} [event]  事件对象
     * @memberof BsTable
     * @instance
     */
    onRowContextMenu(row, column, event) {
      this.$emit('row-contextmenu', row, column, event);
    },
    /**
     * 当某一行被双击时会触发该事件
     * @param {Object} [row]    行数据
     * @param {Object} [column] 列数据
     * @param {Object} [event]  事件对象
     * @memberof BsTable
     * @instance
     */
    onRowDbClick(row, column, event) {
      this.$emit('row-dblclick', row, column, event);
    },
    /**
     * 当某一列的表头被点击时会触发该事件
     * @param {Object} [column]   列数据
     * @param {Object} [event]    事件对象
     * @memberof BsTable
     * @instance
     */
    onHeaderClick(column, event) {
      this.$emit('header-click', column, event);
    },
    /**
     * 当某一列的表头被鼠标右键点击时触发该事件
     * @param {Object} [column]   列数据
     * @param {Object} [event]    事件对象
     * @memberof BsTable
     * @instance
     */
    onHeaderContextmenu(column, event) {
      this.$emit('header-contextmenu', column, event);
    },
    /**
     * 当表格的排序条件发生变化的时候会触发该事件
     * @param {Object} [data]   排序配置对象
     * @memberof BsTable
     * @instance
     */
    onSortChange({ column, prop, order }) {
      this.$emit('sort-change', { column, prop, order });
    },
    /**
     * 当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。
     * @param {Array} [filters]  过滤集合
     * @memberof BsTable
     * @instance
     */
    onFilterChange(filters) {
      this.$emit('filter-change', filters);
    },
    /**
     * 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性
     * @param {Object} [currentRow]    当前高亮行
     * @param {Object} [oldCurrentRow] 上一次高亮行
     * @memberof BsTable
     * @instance
     */
    onCurrentChange(currentRow, oldCurrentRow) {
      this.$emit('current-change', currentRow, oldCurrentRow);
    },
    /**
     * 当拖动表头改变了列的宽度的时候会触发该事件
     * @param {Number} [newWidth]   新宽度
     * @param {Number} [oldWidth]   旧宽度
     * @param {Object} [column]     列数据
     * @param {Object} [event]      事件对象
     * @memberof BsTable
     * @instance
     */
    onHeaderDragend(newWidth, oldWidth, column, event) {
      this.$emit('header-dragend', newWidth, oldWidth, column, event);
    }
  }
};
