<template>
  <div class="bs-table-page">
    <el-pagination
      background
      :layout="handleAttribute(null, 'total, sizes, prev, pager, next, jumper, ->')"
      :total="handleAttribute(page.total, 0)"
      :page-sizes="sizes"
      :page-size="handleAttribute(page.size, 10)"
      :current-page="handleAttribute(page.index, 1)"
      @current-change="handlePaginationChange"
      @size-change="handlePageSizeChange"
    ></el-pagination>
  </div>
</template>
<script>
import utils from '../utils';
export default {
  name: 'BsPage',
  mixins: [utils],
  props: {
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
    }
  },
  methods: {
    /**
     * 当前分页索引改变
     * @param {Object} [index] 当前页码
     * @memberof BsPage
     * @instance
     */
    handlePaginationChange(index) {
      this.handlePageChange({ index });
    },
    /**
     * 当前分页条数改变
     * @param {Object} [size] 当前条数
     * @memberof BsPage
     * @instance
     */
    handlePageSizeChange(size) {
      this.handlePageChange({ size });
    },
    /**
     * 向父组件传递分页改变事件
     * @param {Object} [data] 当前分页数据
     * @memberof BsPage
     * @instance
     */
    handlePageChange(data) {
      this.page = Object.assign(this.page, data);
      this.$emit('page-change', Object.assign({}, this.page));
    }
  }
};
</script>
<style lang="scss" scoped>
.bs-table-page {
  margin-top: 10px;
}
</style>
