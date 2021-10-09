<template>
  <el-form ref="form" inline :model="form" class="bs-search-form" size="mini">
    <div style="display:flex;">
      <template v-if="Object.keys($slots).length || fields.length">
        <!-- <el-form-item :style="{'margin-right': `${enabledExpand ? 0 : 16}px`}">
          <el-button @click="onSearch" icon="el-icon-search"></el-button>
        </el-form-item> -->
        <el-form-item v-if="enabledExpand" :style="{ margin: !enabledExpand ? 0 : '0 10px' }" trigger="hover">
          <el-popover :content="`${isExpand ? '收起' : '展开'}更多搜索项`">
            <el-button slot="reference" type="text" :icon="`${isExpand ? 'el-icon-arrow-up' : 'el-icon-arrow-down'}`" @click="isExpand = !isExpand"></el-button>
          </el-popover>
        </el-form-item>
      </template>
      <div ref="outFormItems" :class="`bs-search-form__items ${isExpand ? 'bs-search-form__items--expand' : ''}`">
        <div ref="innerFormItems">
          <el-form-item v-for="(field, idx) in fields" :key="idx" :label="field.label" :prop="field.prop" :rules="field.rules">
            <el-input v-if="isComponent(getComponent(field), 'el-input')" v-model="form[field.prop]" :placeholder="field.placeholder" />
            <el-select v-if="isComponent(getComponent(field), 'el-select')" v-model="form[field.prop]" clearable style="width: 174px" :placeholder="field.placeholder">
              <el-option v-for="option in field.options" :key="option.value" :value="option.value" :label="option.text">{{ option.text }}</el-option>
            </el-select>
            <el-autocomplete
              v-if="isComponent(getComponent(field), 'el-autocomplete')"
              v-model="form[field.prop]"
              class="inline-input"
              :fetch-suggestions="field.querySearch"
              :placeholder="field.placeholder"
              @select="field.handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <slot></slot>
        </div>
      </div>
      <el-form-item v-if="Object.keys($slots).length || fields.length" class="bs-search-form__search-btn" :style="{ 'margin-right': `${enabledExpand ? 0 : 16}px` }">
        <el-button icon="el-icon-search" type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: 'BsSearchForm',
  props: {
    /**
     * 组件传参，搜索框字段集合
     * @example :fields='[
     *     {
     *       prop:'prop',                // 字段名
     *       component:'el-select',       // 使用组件
     *       placeholder:'placeholder',  // 占位符
     *       options: [                  // 当组件为 el-select / el-radio / el-radio-group / el-checkbox / el-checkbox-group 时使用
     *         {
     *           label:'label1',
     *           value:'value1'
     *         },
     *         {
     *           label:'label2',
     *           value:'value2'
     *         }
     *       ]
     *     }
     *   ]'
     */
    fields: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      form: {},
      isExpand: false,
      enabledExpand: true
    };
  },
  beforeDestroy() {
    window.onresize = null;
  },
  mounted() {
    this.setEabledExpand();
  },
  methods: {
    /**
     * 判断搜索框是否需要展开/收缩
     * @memberof BsSearchForm
     * @instance
     */
    setEabledExpand() {
      const _set = () => {
        if (this.isExpand) return;
        this.enabledExpand = this.$refs.outFormItems.offsetHeight + 10 < this.$refs.innerFormItems.offsetHeight;
      };
      window.onresize = () => {
        if (this.throttle) return;
        this.throttle = setTimeout(() => {
          this.throttle = null;
          _set();
        }, 30);
      };
      _set();
    },
    /**
     * 获取表单项的组件，默认为输入框
     * @param {Object} [field] 单条表单项数据对象
     * @memberof BsSearchForm
     * @instance
     */
    getComponent(field) {
      return field.component || 'el-input';
    },
    /**
     * 判断是否为指定组件
     * @param {String} [component] 被判断组件名
     * @param {String} [targetComponent] 指定组件名
     * @memberof BsSearchForm
     * @instance
     */
    isComponent(component, targetComponent) {
      return component === targetComponent;
    },
    /**
     * 向父组件传递按钮点击事件，传递参数为表单数据对象
     * @memberof BsSearchForm
     * @instance
     */
    onSearch() {
      this.$refs.form.validate(ok => {
        if (ok) {
          this.$emit('search', Object.assign({}, this.form));
        }
      });
    },
    /**
     * 查询数据清空
     */
    onClear() {
      this.form = {};
    }
  }
};
</script>
<style lang="scss">
.bs-search-form {
  margin-bottom: 0px;
  .el-form-item {
    margin-bottom: 0px;
  }
  &__items {
    overflow: hidden;
  }
  &__items--expand {
    height: auto !important;
  }
}
.bs-serach-delete {
  height: 30px;
}
</style>
