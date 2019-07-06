<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    this.getCurrentLoginUserInfo();
  },
  provide(){
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    ...mapActions(["getCurrentLoginUserInfo"]),
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive=true;
      });
    }
  },
  components: {}
};
</script>

<style>
</style>
