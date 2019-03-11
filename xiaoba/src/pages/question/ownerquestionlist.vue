<template>
  <div>
    <headerTop/>
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow">
        个人提问&nbsp;&nbsp;
        <img src="./images/question64.png">

        <div class="pt-3">
          <div class="media">
            <p class="media-body text-left">
              <strong class="d-block">JAVA设计模式</strong>
              <strong class="d-block">问题标题</strong>
              超级赞，看到项目组里用这个，我这个新手完全摸不着头脑，看不懂。现在虽然还没看底层代码，但是对Quartz有了一个比较清晰的概念了，谢谢老师的点点滴滴多多多多多
            </p>
          </div>
          <div class="border-bottom">
            <div class="d-flex justify-content-between">
              <small class="text-muted">
                <span class="iconfont ai-iconshangxianjieda" @click="toQuestionList"></span>100个解答
                <span class="iconfont ai-iconliulan"></span>100个浏览
              </small>
              <small class="text-muted">2019/03/08 22:53:22</small>
            </div>
          </div>
        </div>
                <div class="pt-3">
          <div class="media">
            <p class="media-body text-left">
              <strong class="d-block">JAVA设计模式</strong>
              <strong class="d-block">问题标题</strong>
              超级赞，看到项目组里用这个，我这个新手完全摸不着头脑，看不懂。现在虽然还没看底层代码，但是对Quartz有了一个比较清晰的概念了，谢谢老师的点点滴滴多多多多多
            </p>
          </div>
          <div class="border-bottom">
            <div class="d-flex justify-content-between">
              <small class="text-muted">
                <span class="iconfont ai-iconshangxianjieda" @click="toQuestionList"></span>100个解答
                <span class="iconfont ai-iconliulan"></span>100个浏览
              </small>
              <small class="text-muted">2019/03/08 22:53:22</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MPages/>
    <footerGuide/>
  </div>
</template>

<script>
import headerTop from "../../components/Header/header.vue";
import footerGuide from "../../components/Footer/footer.vue";
import MPages from "../../components/Pages/Pages.vue";
import rate from "../../components/Rate/Rate.vue";

export default {
  methods: {
    toQuestionList() {
      this.$router.push({ path: "/questionlist" });
    }
  },
  components: {
    headerTop,
    footerGuide,
    MPages,
    rate
  }
};
</script>

<style>
</style>
