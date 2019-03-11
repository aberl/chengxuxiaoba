<template>
  <div>
    <headerTop/>
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow">资料下载&nbsp;&nbsp;
          <img src="./images/resource64.png">
        <div class="media text-muted pt-3">
          <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong class="d-block text-gray-dark">eclipse version: mars</strong>
          </p>
        </div>
        <div class="media text-muted pt-3">
          <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong class="d-block text-gray-dark">maven version: mars</strong>
          </p>
        </div>
        <div class="media text-muted pt-3">
          <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong class="d-block text-gray-dark">jdk version: mars</strong>
          </p>
        </div>
        <div class="media text-muted pt-3">
          <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong class="d-block text-gray-dark">ideaj version: mars</strong>
          </p>
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

export default {
  methods: {
    watchCourseVideo(id) {
      this.$router.replace("/coursevideo");
    }
  },
  components: {
    headerTop,
    footerGuide,
    MPages
  }
};
</script>

<style>
</style>
