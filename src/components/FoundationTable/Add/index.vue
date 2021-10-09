<template>
  <el-form v-auth="auth.add" size="mini" inline class="bs-table-add">
    <el-form-item style="margin-bottom:0">
      <el-button v-if="enableAdd" type="primary" icon="el-icon-plus" size="mini" @click="$emit('create')">{{ addText }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'BsAdd',
  props: {
    auth: Object,
    /**
     * 表格是否显示默认的添加那妞
     * @example :enableAdd="true"
     */
    enableAdd: {
      type: Boolean,
      default: true
    },
    /**
     * 为添加按钮设置文字
     * @example addText="添加"
     */
    addText: {
      type: String,
      default: '添加'
    }
  }
};
</script>
<style lang="scss" scoped>
.bs-table-add {
  .el-form-item {
    .el-form-item {
      margin-bottom: 0 !important;
    }
  }
}
</style>
