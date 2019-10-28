<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
    child ==>{{dialogVisible}} // {{this.displayflag}}
  </div>
</template>
<script>
export default {
  props: ["displayflag"],
  data() {
    return {
      dialogVisible: this.displayflag
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
      this.$emit('input', this.dialogVisible)
    },
    handleDisplay() {
      this.dialogVisible = true;
    }
  },
  watch: {
    displayflag: function(newval, oldval) {
      this.dialogVisible = newval;
    }
  }
};
</script>

<style>
</style>