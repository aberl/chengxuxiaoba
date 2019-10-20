<template>
  <div>
    <ali-player :vid="videoId" :playauth="videoPlayAuth" ref="player"></ali-player>
  </div>
</template>

<script>
import { aliplayer } from "vue-aliplayer";
export default {
  methods: {},
  props: {
    videoId: String,
    videoPlayAuth: String
  },
  components: {
    "ali-player": aliplayer
  }
};
</script>

<style>
</style>
