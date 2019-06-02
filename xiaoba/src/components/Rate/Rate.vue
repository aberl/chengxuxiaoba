<template>
  <el-rate :disabled="isDisabled" v-model="score" show-text @change="changeRate"></el-rate>
</template>

<script>
export default {
  props: {
    stars: Number,
    disabled: false
  },
  data() {
    return {
      score: this.stars,
      isDisabled: this.disabled
    };
  },
  methods: {
    changeRate()
    {
      this.$emit('changeRate',this.score);
    }
  }
};
</script>

<style>
</style>
