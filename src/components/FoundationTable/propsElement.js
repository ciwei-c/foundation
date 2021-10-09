/**
 * element-ui 自带的表格属性，详细文档地址 https://element.eleme.cn/#/zh-CN/component/table
 */

export default {
  props: {
    /**
     * 表格默认高度设置
     * @example :height="300"
     */
    height: {
      type: Number | String
    },
    /**
     * 表格默认最高高度设置
     * @example :maxHeight="300"
     */
    maxHeight: {
      type: Number | String
    },
    /**
     * 是否显示loading
     * @example :loading="false"
     */
    loading: {
      type: Boolean,
      default: false
    },
    url: String,
    /**
     * 表格数据源
     */
    data: {
      type: Array,
      required: true
    },
    /**
     * 数据列主键
     * @example :rowKey="(record) => record.id" / rowKey="id"
     */
    rowKey: {
      type: String | Function
    },
    /**
     * 表格是否显示边框
     * @example :border="true"
     */
    border: Boolean,
    /**
     * 表格是否显示斑马条纹
     * @example :stripe="true"
     */
    stripe: {
      type: Boolean,
      default: false
    },
    /**
     * 表格尺寸
     * @example size="middle"
     */
    size: String,
    /**
     * 列的宽度是否自撑开
     * @example :fit="true"
     */
    fit: {
      type: Boolean,
      default: true
    },
    /**
     * 是否显示表头
     * @example :showHeader="true"
     */
    showHeader: {
      type: Boolean,
      default: true
    },
    /**
     * 合并行或列的计算方法	Function({ row, column, rowIndex, columnIndex })
     * @example :spanMethod="({ row, column, rowIndex, columnIndex }) {
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
        }
      }"
     */
    spanMethod: {
      type: Function,
      default: () => {}
    },
    /**
     * 是否要高亮当前行
     * @example :highlightCurrentRow="true"
     */
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    /**
     * 当前行的 key，只写属性
     * @example :highlightCurrentRow="true"
     */
    currentRowKey: {
      type: String | Number
    },
    /**
     * 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className
     * @example :rowClassName="row-class" | :rowClassName="({row, rowIndex})=>{return 'row-class'}"
     */
    rowClassName: {
      type: Function | String
    },
    /**
     * 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
     * @example :rowStyle="{'color':'#ccc'}" | :rowStyle="({row, rowIndex})=>{return {'color':'#ccc'}}"
     */
    rowStyle: {
      type: Function | Object
    },
    /**
     * 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
     * @example :cellClassName="cell-class" | :cellClassName="({row, column, rowIndex, columnIndex})=>{return 'cell-class'}"
     */
    cellClassName: {
      type: Function | String
    },
    /**
     * 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
     * @example :cellStyle="{'color':'#ccc'}" | :cellStyle="({row, column, rowIndex, columnIndex})=>{return {'color':'#ccc'}}"
     */
    cellStyle: {
      type: Function | Object,
      default() {
        return {
          'border-color': '#F5F6FC',
          'font-size':'14px',
          color: '#000'
        };
      }
    },
    /**
     * 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
     * @example :headerRowClassName="header-class" | :headerRowClassName="({row, rowIndex})=>{return 'header-class'}"
     */
    headerRowClassName: {
      type: Function | String
    },
    /**
     * 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
     * @example :headerRowStyle="{'color':'#ccc'}" | :headerRowStyle="({row, rowIndex})=>{return {'color':'#ccc'}}"
     */
    headerRowStyle: {
      type: Function | Object
    },
    /**
     * 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
     * @example :headerCellClassName="cell-class" | :headerCellClassName="({row, column, rowIndex, columnIndex})=>{return 'cell-class'}"
     */
    headerCellClassName: {
      type: Function | String
    },
    /**
     * 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
     * @example :headerCellStyle="{'color':'#ccc'}" | :headerCellStyle="({row, column, rowIndex, columnIndex})=>{return {'color':'#ccc'}}"
     */
    headerCellStyle: {
      type: Function | Object,
      default() {
        return {};
      }
    },
    /**
     * 空数据时显示的文本内容，也可以通过 slot="empty" 设置
     * @example emptyText="no data"
     */
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    /**
     * 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
     * @example :defaultExpandAll="true"
     */
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    /**
     * 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
     * @example :expandRowKeys="[]"
     */
    expandRowKeys: {
      type: Array
    },
    /**
     * 默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序 ascending, descending
     * @example :defaultSort="{prop:'id',order:'ascending'}"
     */
    defaultSort: {
      type: Object,
      default() {
        return {
          order: 'ascending'
        };
      }
    },
    /**
     * tooltip effect 属性
     * @example tooltipEffect="light"
     */
    tooltipEffect: {
      type: String,
      default: 'light'
    },
    /**
     * 是否在表尾显示合计行
     * @example :showSummary="true"
     */
    showSummary: {
      type: Boolean,
      default: false
    },
    /**
     * 合计行第一列的文本
     * @example sumText="合计""
     */
    sumText: {
      type: String,
      default: '合计'
    },
    /**
     * 自定义的合计计算方法
     * @example :summaryMethod="({ columns, data })=>{ return }"
     */
    summaryMethod: {
      type: Function
    },
    /**
     * 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行
     * @example :selectOnIndeterminate="true"
     */
    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },
    /**
     * 展示树形数据时，树节点的缩进
     * @example :indent="16"
     */
    indent: {
      type: Number,
      default: 16
    },
    /**
     * 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息	
     * @example :load="(row, treeNode, resolve)=>{setTimeout(() => {
          resolve([
            {
              id: 31,
              date: '2016-05-01',
              name: 'name'
            }
          ])
        }, 1000)}"
     */
    load: {
      type: Function
    },
    /**
     * 是否懒加载子节点数据
     * @example :lazy="false"
     */
    lazy: {
      type: Boolean
    },
    /**
     * 渲染嵌套数据的配置选项
     * @example :treeProps="{ hasChildren: 'hasChildren', children: 'children' }"
     */
    treeProps: {
      type: Object,
      default() {
        return { hasChildren: 'hasChildren', children: 'children' };
      }
    }
  }
};
