<template>
  <div v-loading="loading" class="bs-table-container">
    <el-row v-if="($slots['search-item'] && enableSearch) || $slots['header-btn'] || enableAdd || (enableSearch && searchFields.length)" class="bs-table-topbar">
      <search-form v-if="enableSearch" v-auth="auth.search" :fields="searchFields" style="flex:1" @search="$emit('on-search', $event)">
        <slot name="search-item"></slot>
      </search-form>
      <add :auth="auth" :enableAdd="enableAdd" :addText="addText" @create="onCreate" />
      <extra-top>
        <slot name="header-btn"></slot>
      </extra-top>
    </el-row>
    <el-table
      ref="table"
      :data="renderData"
      :height="height"
      :maxHeight="maxHeight"
      :span-method="spanMethod"
      :stripe="stripe"
      :border="border"
      :header-cell-style="
        Object.assign(
          {
            background: '#F5F6FC',
            borderColor: '#F0F0F0',
            color: '#6B6B6B',
            fontSize: '14px',
            padding: '14px 0'
          },
          headerCellStyle
        )
      "
      :cell-class-name="cellClassName"
      :size="size"
      :fit="fit"
      :showHeader="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :header-row-class-name="headerRowClassName"
      :header-row-style="headerRowStyle"
      :header-cell-class-name="headerCellClassName"
      :empty-text="emptyText"
      :default-expand-all="defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="summaryMethod"
      :select-on-indeterminate="selectOnIndeterminate"
      :indent="indent"
      :lazy="lazy"
      :load="load"
      :tree-props="treeProps"
      @select="onSelect"
      @select-all="onSelectAll"
      @selection-change="onSelectionChange"
      @cell-mouse-enter="onCellMouseEnter"
      @cell-mouse-leave="onCellMouseLeave"
      @cell-click="onCellClick"
      @cell-dblclick="onCellDblClick"
      @row-click="onRowClick"
      @row-contextmenu="onRowContextMenu"
      @row-dblclick="onRowDbClick"
      @header-click="onHeaderClick"
      @header-contextmenu="onHeaderContextmenu"
      @sort-change="onSortChange"
      @filter-change="onFilterChange"
      @current-change="onCurrentChange"
      @header-dragend="onHeaderDragend"
      @expand-change="onExpandChange"
    >
      <!-- 行展开 -->
      <el-table-column v-if="handleValueBoolean(enableExpand)" type="expand">
        <template slot-scope="scope">
          <slot name="expand" :row="scope"></slot>
        </template>
      </el-table-column>
      <!-- 可选 -->
      <el-table-column v-if="handleValueBoolean(enableSelect)" type="selection" />
      <!-- 序号 -->
      <el-table-column v-if="handleValueBoolean(showOrder)" type="index" label="序号" width="60px"></el-table-column>
      <!-- columns -->
      <el-table-column
        v-for="(column, idx) in computedHandleColumns"
        :key="idx"
        :label="handleAttribute(column.title || column.label, '')"
        :width="column.width"
        :show-overflow-tooltip="column['show-overflow-tooltip']"
        :column-key="column['prop']"
        :prop="column['prop']"
        :min-width="column['min-width']"
        :fixed="column['fixed']"
        :sortable="column['sortable']"
        :sort-method="column['sortable'] ? getSortMethod(column) : () => {}"
        :sort-by="column['sort-by']"
        :sort-orders="column['sort-orders']"
        :resizable="column['resizable']"
        :formatter="column['formatter']"
        :align="column['align']"
        :header-align="column['header-align']"
        :class-name="column['class-name']"
        :label-class-name="column['label-class-name']"
        :selectable="column['selectable']"
        :reserve-selection="column['reserve-selection']"
        :filters="column['filters']"
        :filter-placement="column['filter-placement']"
        :filter-multiple="column['filter-multiple']"
        :filter-method="column['filter-method']"
        :filtered-value="column['filtered-value']"
      >
        <template slot="header" slot-scope="scope">
          <format-header :vnode="!!column['render-header'] ? renderHeader(column, scope) : scope.column.label"></format-header>
        </template>
        <template slot-scope="scope">
          <format-cell :render="column.format" :arguments="{ record: scope.row, index: scope.$index, columnIndex: idx, column: column, text: scope.row[column.prop] || '' }"></format-cell>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column v-if="enableOperate" label="操作" :width="actionWidth || calcActionWidth">
        <template slot-scope="scope">
          <action
            :auth="auth"
            :enableUpdate="enableUpdate"
            :parent="parent"
            :enableDelete="enableDelete"
            :rowHandle="rowHandle"
            :scope="scope"
            @afterRender="afterActionRender"
            @want-update="onUpdate"
            @want-delete="onDelete"
          >
          </action>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <page v-if="enablePage" :page="getPage()" :sizes="sizes" @page-change="$emit('page-change', $event)" />
  </div>
</template>
<script>
import utils from './utils';
import props from './props';
import propsElement from './propsElement';
import emitMixin from './Mixins/emitMixin';
import methodsMixin from './Mixins/methodsMixin';
import FormatCell from './FormatCell';
import FormatHeader from './FormatHeader';
import SearchForm from './SearchForm';
import Add from './Add';
import ExtraTop from './ExtraTop';
import Page from './Page';
import Action from './Action';
export default {
  name: 'BsTable',
  watch: {
    data: {
      handler(val) {
        this.renderData = val;
      },
      immediate: true
    },
    columns: {
      handler() {
        this.setColumns();
      },
      immediate: true
    }
  },
  created() {
    
  },
  computed: {
    parent() {
      return this;
    },
    computedHandleColumns(){
      return this.handleColumns.filter(column=>{
        return !this.hiddenColumns.includes(column.prop) && !this.hiddenColumns.includes(column.key) && !column.hide
      })
    }
  },
  data() {
    return {
      renderData: [],
      hiddenColumns: [],
      search: {},
      handleColumns: [],
      originData: [],
      throttle: false,
      calcActionWidth: null
    };
  },
  components: { SearchForm, Add, FormatCell, Page, Action, ExtraTop, FormatHeader },
  mixins: [utils, propsElement, props, emitMixin, methodsMixin],
  methods: {
    renderHeader(column, scope){
      return column['render-header'](scope)
    },
    getPage() {
      if (this.enablePage) {
        return this.page;
      } else {
        return {
          index: 1,
          size: 99999999,
          total: 0
        };
      }
    },
    /**
     * 获取表单主体实例
     * @memberof BsTable
     */
    getTableInst() {
      return this.$refs.table;
    },
    /**
     * 设置列配置
     * @memberof BsTable
     */
    setColumns() {
      const transform = value => {
        if (value === undefined || value === null || value === '') return '';
        if (typeof value === 'boolean') return `${value}`;
        if (typeof value === 'object') return JSON.stringify(value);
        return value;
      };
      if (this.columns) {
        this.handleColumns = this.columns.map(column => {
          if (column.key) {
            column.prop = column.key;
          }
          if (!column.format)
            column.format = row => {
              return transform(row[column.prop]) || transform(row[column.key]);
            };
          column.format = column.format.bind(this);
          if (column.formatter) delete column.formatter;
          return column;
        });
      }
    },
    /**
     * 动态隐藏列
     * @param {Object} [prop] 列key值
     * @memberof BsTable
     */
    hideColumn(prop) {
      if (!this.hiddenColumns.includes(prop)) this.hiddenColumns.push(prop);
    },
    /**
     * 动态显示列
     * @param {Object} [prop] 列key值
     * @memberof BsTable
     */
    showColumn(prop) {
      let idx = this.hiddenColumns.indexOf(prop);
      if (idx > -1) {
        this.hiddenColumns.splice(idx, 1);
      }
    },
    getSortMethod(column) {
      let { prop } = column;
      if (column['sort-method']) return column['sort-method'];
      return (a, b) => {
        return a[prop] - b[prop];
      };
    },
    /**
     * 动态设置操作栏宽度
     * @param {Object} [$el] 单元格子内容 Dom 元素
     * @memberof BsTable
     */
    afterActionRender($el) {
      if (!this.calcActionWidth && !this.actionWidth) {
        $el = $el.cloneNode(true);
        let wrap = document.createElement('span');
        wrap.style.position = 'absolute';
        wrap.style.display = 'inline-block';
        wrap.style.width = '999px';
        wrap.style.opacity = 0;
        wrap.appendChild($el);
        document.body.appendChild(wrap);
        this.calcActionWidth = wrap.querySelector('.bs-action').offsetWidth + 22;
        document.body.removeChild(wrap);
      }
    }
  }
};
</script>
<style lang="scss">
.bs-table-container {
  .bs-table-topbar {
    display: flex;
  }
  .cell.el-tooltip {
    > .bs-format-cell {
      > * {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
