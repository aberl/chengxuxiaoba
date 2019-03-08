<template>
  <div>
    <headerTop/>
    <main role="main">
      <section class="jumbotron text-center">
        <div class="container">
          <p class="lead text-muted">JAVA 课程分为初级和高级2部分，大概80节课时，建议在初级学完之后再学习高级课程。</p>
        </div>
        <video width="520" height="440" controls>
        <source src="../../common/video/test.mp4"  type="video/mp4">
        </video>
      </section>
    </main>
    <comment/>
    <footerGuide/>
  </div>
</template>

<script>
import headerTop from "../../components/Header/header.vue";
import footerGuide from "../../components/Footer/footer.vue";
import comment from '../../components/Evaluate/comment.vue'
export default {
  components: {
    headerTop,
    footerGuide,
    comment
  }
};
</script>

<style>
</style>
