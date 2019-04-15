<template>
  <div>
      <headerTop/>

<el-row :gutter="10">
  <el-col :xs="6" :sm="6" :md="4" :lg="4"><div class="grid-content bg-purple-light"><leftNavi/></div></el-col>
  <el-col :xs="16" :sm="16" :md="18" :lg="18">新增</el-col>
</el-row>
      <footerGuide/>
  </div>
</template>

<script>    
import headerTop from '../../../components/Admin/Header/adminHeader.vue'
import footerGuide from '../../../components/Footer/footer.vue'
import leftNavi from '../../../components/Admin/Navi/adminLeftNavi.vue'

export default {
  inject: ['reload'],
  methods:{
  },
components:{
    headerTop,
    footerGuide,
    leftNavi
}
}
</script>

<style>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
