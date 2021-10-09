<template>
  <span class="bs-action">
    <el-button v-if="enableUpdate" v-auth="auth.update" size="small" type="primary" @click="$emit('want-update', deepClone(scope.row), scope.$index)">
      编辑
    </el-button>
    <el-button v-if="enableDelete" v-auth="auth.delete" size="small" type="danger" @click="$emit('want-delete', deepClone(scope.row), scope.$index)">
      删除
    </el-button>
    <el-button
      v-for="(v, k) in rowHandle"
      v-show="handleDispalyAttribute(v.hidden, scope.row)"
      :key="k"
      v-auth="auth[k]"
      :icon="handleIcon(v.icon)"
      :type="handleAttribute(v.type, 'default')"
      :size="handleAttribute(v.size, 'small')"
      :disabled="handleDisableAttribute(v.disabled, scope.row)"
      @click="parent.$emit(k, deepClone(scope.row), scope.$index, v)"
    >
      {{ v.text }}
    </el-button>
  </span>
</template>
<script>
import utils from '../utils';
export default {
  name: 'BsAction',
  props: {
    auth: Object,
    parent: Object,
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
     * 行数据
     */
    scope: {
      type: Object,
      required: true
    }
  },
  mixins: [utils],
  mounted() {
    this.$nextTick(() => {
      this.$emit('afterRender', this.$el);
    });
  }
};
</script>
<style lang="scss" scoped></style>
