<template>
  <div id="app">
    <table>
      <tr>
        <th><input v-model="isChecked" type="checkbox" name="" id="" />全选</th>
        <th>产品名称</th>
        <th>产品单价</th>
        <th>产品数量</th>
        <th>金额</th>
      </tr>
      <tr v-for="(item, index) in products" :key="index">
        <td>
          <input v-model="item.isCheck" type="checkbox" name="" id="" />
        </td>
        <td>{{ item.name }}</td>
        <td>￥{{ item.price }}</td>
        <td>
          <input
            v-model="item.num"
            type="number"
            style="width: 50px"
            name=""
            id=""
            min="0"
            @input="changePri(item.num, index)"
          />
        </td>
        <td>￥{{ item.amount }}</td>
      </tr>
    </table>

    <p style="color: red">总价：￥{{ totalPri }}</p>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      products: [
        { isCheck: false, name: "苹果", price: 10, num: 0, amount: 0 },
        { isCheck: false, name: "香蕉", price: 20, num: 0, amount: 0 },
        { isCheck: false, name: "草莓", price: 30, num: 0, amount: 0 },
      ],
    };
  },
  methods: {
    // 修改对应的金额
    changePri(num, index) {
      this.products[index].amount = this.products[index].price * num;
    },
  },
  computed: {
    // 侦听products中的每一项，如果全被勾选就是全选状态
    isChecked: {
      // 获取侦听
      get() {
        for (var item of this.products) {
          // 只要有一项为false就是没有全选
          if (!item.isCheck) {
            return false;
          }
        }
        // 跳出循环后还没有返回false就是全选
        return true;
      },
      // 设置状态
      set(val) {
        if (val) {
          this.products.map((item) => (item.isCheck = true));
        } else {
          this.products.map((item) => (item.isCheck = false));
        }
      },
    },
    // 计算总价
    totalPri() {
      let totalPrice = 0;
      for (var item of this.products) {
        if (item.isCheck) {
          totalPrice += item.amount;
        }
      }
      return totalPrice;
    },
  },
};
</script>

<style>
table,
tr,
th,
td {
  border-collapse: collapse;
}
th,
td {
  padding: 10px;
}
</style>
