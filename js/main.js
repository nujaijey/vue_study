// 稍微复杂的解构条件
const player = {
  nickname: "感情的戏∫我没演技∆",
  master: "东海龙王",
  skill: [
    {
      skillName: "龙吟",
      mp: "100",
      time: 6000,
    },
    {
      skillName: "龙卷雨击",
      mp: "400",
      time: 3000,
    },
    {
      skillName: "龙腾",
      mp: "900",
      time: 60000,
    },
  ],
};

const {
  skill: [skill1, { skillName }, { skillName: skillN }],
} = player;

// 结合扩展运算符
// const obj = {
//   saber: "阿尔托利亚",
//   archer: "卫宫",
//   lancer: "瑟坦达",
// };

// const { saber, ...oth } = obj;

const obj1 = {
  archer: "卫宫",
  lancer: "瑟坦达",
};

const obj = {
  saber: "阿尔托利亚",
  ...obj1,
};

// 默认值
let girlfriend = {
  name: "小红",
  age: undefined,
};

let { name, age = 24, hobby = ["学习"] } = girlfriend;
