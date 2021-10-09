/**
 * 自定义属性
 */
export default {
  props: {
    /**
     * 
     * 表格列配置项，https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes
     * 比较与自带属性，修改了部分功能
     * 1. 删除了formatter， 改为 format 1、支持异步数据 2、支持返回 jsx 或者 vnode 对象 3、支持自定义属性及事件
     * @example :columns="[{
          title:'名字',
          key:'name',
          format(row, commit, { index, columnIndex, column, text }){
            return <el-button>{text}</el-button>
            // or 
            setTimeout(()=>{
              commit(<el-button>{text}</el-button>)
            },300)
            // or
            return {
              children:text,
              attrs:{
                cellname:text
              },
              on:{
                click(){}
              }
            }
          }
        }]"
     */
    columns: {
      type: Array,
      required: false
    },
    /**
     * 表格是否显示默认的编辑按钮
     * @example :enableUpdate="true"
     */
    enableUpdate: {
      type: Boolean,
      default: true
    },
    /**
     * 表格是否显示默认的删除
     * @example :enableDelete="true"
     */
    enableDelete: {
      type: Boolean,
      default: true
    },
    /**
     * 表格是否显示默认的添加那妞
     * @example :enableAdd="true"
     */
    enableAdd: {
      type: Boolean,
      default: false
    },
    /**
     * 为添加按钮设置文字
     * @example addText="添加"
     */
    addText: {
      type: String,
      default: '添加'
    },
    /**
     * 表格是否可选
     * @example addText="添加"
     */
    enableSelect: {
      type: Boolean,
      default: false
    },
    /**
     * 表格行是否可展开
     * @example addText="添加"
     */
    enableExpand: {
      type: Boolean,
      default: false
    },
    /**
     * 自定义行操作栏按钮，如例子所示，父组件可监听到事件 @detail
     * @example :rowHandle="{
        detail: {
          type: 'primary',
          text: '详情',
          size: 'mini'
        }
      }"
     */
    rowHandle: {
      type: Object,
      default() {
        return {};
      }
    },
    /**
     * 表格是否显示操作列
     * @example :enableOperate="true"
     */
    enableOperate: {
      type: Boolean,
      default: false
    },
    /**
     * 表格是否显示搜索栏
     * @example :enableSearch="true"
     */
    enableSearch: {
      type: Boolean,
      default: true
    },
    /**
     * 表格搜索字段集合
     * @example :searchFields="[{prop:'name',placeholder:'请输入名字'}]"
     */
    searchFields: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * 选择当前分页显示多少条数据
     * @example :sizes="[5, 10, 20, 50]"
     */
    sizes: {
      type: Array,
      default() {
        return [5, 10, 20, 50];
      }
    },
    /**
     * 分页信息
     * @example :page="{
        index: 1,
        size: 10,
        total: 0
      }"
     */
    page: {
      type: Object,
      default() {
        return {
          index: 1,
          size: 10,
          total: 0
        };
      }
    },
    /**
     * 分页信息
     * @example :enablePage="false"
     */
    enablePage: {
      type: Boolean,
      default: true
    },
    /**
     * 自定义操作列宽度
     * @example :actionWidth="400"
     */
    actionWidth: String,
    /**
     * 是否显示表格序号
     * @example :showOrder="true"
     */
    showOrder: {
      type: Boolean,
      default: false
    },
    /**
     * 是否自动加载
     * @example :autoLoad="true"
     */
    autoLoad: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    auth: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
