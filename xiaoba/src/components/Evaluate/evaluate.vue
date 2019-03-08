<template>
<div>
<div class="container text-center" v-if="evaluateWindowDisply">
  <h3>您觉得视频怎么样？</h3>
  <form>
    <div class="form-group">
      <rate/>
    </div>
    <div class="form-group">
      <textarea class="form-control" rows="3">请尽可能详细描述您的学习经历，例如学习成果，老师讲课风格等</textarea>
    </div>
    <button type="submit" class="btn btn-primary">提交评价</button>
  </form>
</div>

<div class="p-3">
        <small class="d-block text-right">
          <el-button @click="displayEvaluateWindow" type="primary" round v-if="evaluateSubmitButtonDisplay">我要评价</el-button>
        </small>
  <div>
  <div class="media">
    <img data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1" alt="32x32" class="mr-2 rounded" 
    style="width: 64px; height: 64px;" 
    src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_168f682cf52%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_168f682cf52%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.546875%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true">
    <p class="media-body text-left">
    <strong class="d-block">username</strong><rate/>
    超级赞，看到项目组里用这个，我这个新手完全摸不着头脑，看不懂。现在虽然还没看底层代码，但是对Quartz有了一个比较清晰的概念了，谢谢老师的点点滴滴多多多多多
    </p>
  </div>
  <div class="border-bottom">
  <div class="d-flex justify-content-between">
    <small class="text-muted">
      <span class="iconfont ai-iconzan"></span>100
    </small>
    <small class="text-muted">2019/03/08 22:53:22</small>
  </div>
  </div>
</div>
  <div>
  <div class="media">
    <img data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1" alt="32x32" class="mr-2 rounded" 
    style="width: 64px; height: 64px;" 
    src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_168f682cf52%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_168f682cf52%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.546875%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true">
    <p class="media-body text-left">
    <strong class="d-block">username</strong><rate/>
    超级赞，看到项目组里用这个，我这个新手完全摸不着头脑，看不懂。现在虽然还没看底层代码，但是对Quartz有了一个比较清晰的概念了，谢谢老师的点点滴滴多多多多多
    </p>
  </div>
  <div class="border-bottom">
  <div class="d-flex justify-content-between">
    <small class="text-muted">
      <span class="iconfont ai-iconzan"></span>100
    </small>
    <small class="text-muted">2019/03/08 22:53:22</small>
  </div>
  </div>
</div>
  <div>
  <div class="media">
    <img data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1" alt="32x32" class="mr-2 rounded" 
    style="width: 64px; height: 64px;" 
    src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_168f682cf52%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_168f682cf52%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.546875%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true">
    <p class="media-body text-left">
    <strong class="d-block">username</strong><rate/>
    超级赞，看到项目组里用这个，我这个新手完全摸不着头脑，看不懂。现在虽然还没看底层代码，但是对Quartz有了一个比较清晰的概念了，谢谢老师的点点滴滴多多多多多
    </p>
  </div>
  <div class="border-bottom">
  <div class="d-flex justify-content-between">
    <small class="text-muted">
      <span class="iconfont ai-iconzan"></span>100
    </small>
    <small class="text-muted">2019/03/08 22:53:22</small>
  </div>
  </div>
</div>
</div>
</div>
</template>

<script>
import rate from '../Rate/Rate.vue';

export default {
  data(){
    return {
      evaluateWindowDisply:false,
      evaluateSubmitButtonDisplay:true
      }
  },
  methods: {
    displayEvaluateWindow() {
        this.evaluateWindowDisply=true;
        this.evaluateSubmitButtonDisplay=false
      }
  },
  components: {
    rate
  }
}
</script>

<style>
.ai-iconzan{
  font-size: 18px
}
</style>
