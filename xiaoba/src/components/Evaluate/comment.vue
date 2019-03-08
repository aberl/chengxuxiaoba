<template>
<div class="container text-center">
<el-tabs type="border-card">
  <el-tab-pane>
    <span slot="label"><i class="el-icon-date"></i> 评价</span>
    <evaluate/>
  </el-tab-pane>

  <el-tab-pane>
    <span slot="label"><i class="el-icon-question"></i> 提问</span>
      <question/>
  </el-tab-pane>
</el-tabs>
</div>
</template>
<script>
import evaluate from '../../components/Evaluate/evaluate.vue'
import question from '../../components/Evaluate/question.vue'
export default {
  components: {
    evaluate,
    question
  }
}
</script>