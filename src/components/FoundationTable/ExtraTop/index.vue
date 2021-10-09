<script>
export default {
  data() {
    return {
      slots: []
    };
  },
  render() {
    return (
      <el-form size="mini" inline class="bs-extra-top">
        {this.slots
          ? this.slots.map(slot => {
              return <el-form-item>{slot}</el-form-item>;
            })
          : null}
      </el-form>
    );
  },
  updated() {
    this.slots = this.$slots.default;
  }
};
</script>
<style lang="scss">
.bs-extra-top {
  .el-form-item {
    margin-bottom: 0 !important;
  }
}
</style>
