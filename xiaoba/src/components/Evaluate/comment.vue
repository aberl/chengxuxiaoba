<template>
<div class="container text-center">
<el-tabs type="border-card">
  <el-tab-pane>
    <span slot="label"><i class="el-icon-date"></i> 评价({{evaluationCount}})</span>
    <evaluate :videoId="videoId" @getEvaluationCount="getEvaluationCount"/>
  </el-tab-pane>

  <el-tab-pane>
    <span slot="label"><i class="el-icon-question"></i> 提问</span>
      <question/>
  </el-tab-pane>
    <el-tab-pane>
    <span slot="label"><i class="el-icon-download"></i> 下载</span>
      <attachment :attachment="attachment"/>
  </el-tab-pane>
</el-tabs>
</div>
</template>
<script>
import evaluate from '../../components/Evaluate/evaluate.vue'
import question from '../../components/Evaluate/question.vue'
import attachment from '../../components/Evaluate/attachment.vue'
export default {
  props:{
    videoId: String,
    attachment:Array
  },
  data(){
    return{
      evaluationCount:0
    }
  },
  components: {
    evaluate,
    question,
    attachment
  },
  methods:{
    getEvaluationCount(count){
this.evaluationCount=count;
    }
  }
}
</script>