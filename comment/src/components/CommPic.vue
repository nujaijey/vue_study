<template>
  <div>
    <img
      v-for="(item, index) in infoContent.images"
      :key="index"
      :src="item.imgUrl"
      alt=""
      @click="changeImg(index)"
    />
    <p class="cur">
      <img :src="infoContent.images[idx].imgUrl" alt="" />
    </p>
    <!-- <p>{{ info.productColor }}</p> -->
  </div>
</template>

<script>
export default {
  props: ["infoContent"],
  data() {
    return {
      idx: 0,
    };
  },
  methods: {
    changeImg(idx) {
      this.idx = idx;
    },
  },
};
</script>

<style scoped>
img {
  width: 60px;
  margin-right: 10px;
  cursor: pointer;
}
.cur img {
  width: 300px;
}
</style>
