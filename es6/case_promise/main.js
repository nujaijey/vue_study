// 页面中有个模块，需要多张图片加载完之后才能进行显示
const loadImg = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e) => {
      reject(e);
    };
  });
};

const imgs = [
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F1111%2F06041Q43S7%2F1P604143S7-9.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639183125&t=3363e61fa0eb41a8fef58072cb4b946e",
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F1112%2F12251Q15639%2F1Q225115639-7.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639183125&t=8f5d8145d6edda13e0b32867b180a658",
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F1011%2F06011G13H9%2F1F601113H9-1.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639183125&t=a3b028763b21316a478e82b94af799cc",
  "aa",
];

const promises = imgs.map((src) => {
  return loadImg(src);
});

Promise.all(promises)
  .then((arr) => {
    console.log(arr);
    arr.forEach((img) => {
      document.body.appendChild(img);
    });
  })
  .catch((e) => {
    console.log(e);
  });
