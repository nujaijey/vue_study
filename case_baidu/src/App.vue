<template>
  <div id="app">
    <div class="search">
      <img
        src="https://www.baidu.com/img/flexible/logo/pc/result.png"
        alt=""
        class="logo"
      />
      <div class="search-box">
        <input
          v-model="kw"
          type="text"
          name=""
          id=""
          @keydown.prevent.up="up"
          @keydown.prevent.down="down"
          @keydown.enter="toDetail(idx, 2)"
        />
      </div>
      <div class="btn">
        百度一下
      </div>
    </div>
    <!-- 查询出的相关关键字列表 -->
    <div class="info">
      <ul>
        <li
          :class="{ cur: idx == index }"
          v-for="(item, index) in kwArr"
          :key="index"
          @mouseenter="showIdx(index)"
          @click="toDetail(item, 1)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      kw: "", // 查询的关键字
      oldScript: null, // 新的查询jsonp的script
      newScript: null, // 旧的查询jsonp的script
      kwArr: null, // 关键字数组
      idx: -1, // 当前查询关键字数组kwArr的下标，默认为-1
    };
  },
  // 实时监听关键字
  watch: {
    kw(val) {
      // 判断如果有旧的script标签且val存在，清除掉
      if (this.oldScript && val) {
        document.body.removeChild(this.oldScript);
      }
      if (!val) {
        this.kw = "";
        this.kwArr = [];
        return;
      }
      // 请求JSON数据
      this.newScript = document.createElement("script");
      // 给创建的script标签添加src属性，是百度的接口地址
      this.newScript.src =
        "http://suggestion.baidu.com/su?cb=callback&wd=" + val;
      // 上树
      document.body.appendChild(this.newScript);
      // 接收已经上树的script，目的是防止script标签进行累积上树
      this.oldScript = this.newScript;
      this.callbackFun();
    },
  },
  methods: {
    // 回调jsonp函数
    callbackFun() {
      let that = this;
      window.callback = function(data) {
        console.log(data);
        that.kwArr = data.s;
      };
    },
    // 键盘事件
    up() {
      this.idx--;
      // 判断范围
      if (this.idx < -1) this.idx = this.kwArr.length - 1;
    },
    down() {
      this.idx++;
      if (this.idx > this.kwArr.length - 1) this.idx = -1;
    },
    // 点击当前li统一对应的下标
    showIdx(index) {
      this.idx = index;
    },
    // 跳转到详情
    toDetail(val, type) {
      // type是类型，1代表关键字直接搜索，2代表从已有的kwArr获取对应的下标搜索
      let kw = null;
      // if (type == 1) {
      //   kw = val;
      // } else if (type == 2) {
      //   kw = this.kwArr[val];
      // }
      // 三元表达式
      kw = type == 1 ? val : this.kwArr[val];
      window.open("https://www.baidu.com/s?ie=utf-8&wd=" + kw, "_blank");
    },
  },
};
</script>

<style>
.search .logo {
  width: 101px;
  height: 33px;
  margin-right: 5px;
}
.search .search-box {
  display: inline-block;
  width: 590px;
  height: 36px;
  border: 2px solid #c4c7ce;
  border-radius: 10px 0 0 10px;
  border-right: 0;
  overflow: visible;
  vertical-align: middle;
}
.search .search-box input {
  outline: 0;
  width: 523px;
  height: 22px;
  font: 16px/18px arial;
  line-height: 22px;
  margin: 7px 0 0 7px;
  padding: 0;
  background: #fff;
  border: 0;
  outline: 0;
  -webkit-appearance: none;
}
.search .btn {
  display: inline-block;
  cursor: pointer;
  width: 112px;
  height: 40px;
  line-height: 41px;
  line-height: 40px\9;
  background-color: #4e6ef2;
  border-radius: 0 10px 10px 0;
  font-size: 17px;
  box-shadow: none;
  font-weight: 400;
  border: 0;
  outline: 0;
  letter-spacing: normal;
  vertical-align: middle;
  color: #fff;
  text-align: center;
}
.info ul li {
  list-style: none;
  margin-left: 80px;
  line-height: 30px;
  cursor: pointer;
}
.info ul li.cur {
  color: #4e6ef2;
}
</style>
