<template>
  <div id="app">
    <TheOneComment
      v-for="(item, index) in commentsArr"
      :key="index"
      :info="item"
    ></TheOneComment>
  </div>
</template>

<script>
import TheOneComment from "./components/TheOneComment.vue";
import comments from "./comments";
export default {
  name: "App",
  components: {
    TheOneComment,
  },
  data() {
    return {
      commentsArr: comments,
    };
  },
};
</script>

<style></style>
