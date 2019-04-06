<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    this.getUserInfo();
  },
  methods: {
    ...mapActions(["getUserInfo"])
  },
  components: {}
};
</script>

<style>
</style>
