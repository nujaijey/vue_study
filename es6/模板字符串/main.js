const getImoocCourseList = function () {
  // ajax
  return {
    status: true,
    msg: "获取成功",
    data: [
      {
        id: 1,
        title: "Vue 入门",
        date: "xxxx-01-09",
      },
      {
        id: 2,
        title: "ES6 入门",
        date: "xxxx-01-10",
      },
      {
        id: 3,
        title: "React入门",
        date: "xxxx-01-11",
      },
    ],
  };
};

function foo(val) {
  return val.replace("xxxx", "2021");
}

const { data: listData, status: statuss, msg } = getImoocCourseList();

if (statuss) {
  let arr = [];
  listData.forEach(function ({ title, date }) {
    arr.push(
      `
          // 模板字符串可嵌套使用
            <li><span>${`课程名称：${title}`}</span></li>
            <li><span>课程时间：${foo(date)}</span></li>
        `
    );
  });

  let ul = document.createElement("ul");
  ul.innerHTML = arr.join("");

  document.body.appendChild(ul);
}
