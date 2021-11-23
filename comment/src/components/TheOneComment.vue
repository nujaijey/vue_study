<template>
  <div class="box">
    <div class="left">
      <div class="pic">
        <img :src="'http://' + info.userImage" alt="" />
        <p>{{ info.nickname }}</p>
      </div>
    </div>
    <div class="right">
      <p
        class="star"
        :style="{ 'background-position': -16 * (5 - info.score) + 'px 0px' }"
      ></p>
      <p>{{ info.content }}</p>
      <CommPic :info-content="info"></CommPic>
    </div>
  </div>
</template>

<script>
import CommPic from "./CommPic";
export default {
  props: ["info"],
  components: {
    CommPic,
  },
};
</script>

<style scoped>
.box {
  display: flex;
}
.box .left {
  flex: 1;
}
.box .left .pic {
  width: 50px;
  height: 50px;
  margin: auto 20px;
}
.box .left .pic img {
  border-radius: 50%;
}
.box .right {
  flex: 9;
}
.box .right .star {
  width: 80px;
  height: 14px;
  background: url("../assets/star.png");
}
</style>
