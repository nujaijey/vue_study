// 1.对图片进行分类
// 2.生成dom元素
// 3.绑定事件
// 4.显示在页面上

(function (window, document) {
    // 公共方法集合
    const methods = {
        appendChild(parent, ...children) {
            children.forEach(el => {
                parent.appendChild(el);
            });
        },
        $(selector, root = document) {
            return root.querySelector(selector);
        },
        $$(selector, root = document) {
            return root.querySelectorAll(selector);
        }
    };

    // 构造函数
    let Img = function (options) {
        this._init(options);
        this._createElement();
        this._bind();
        this._show()
    }

    // 初始化
    Img.prototype._init = function ({ data, initType, parasitifer }) {
        this.types = ['全部', 'JavaScript']; // 所有的分类
        this.all = []; // 所有的图片元素
        this.classified = { '全部': [] }; // 按照分类分类后的图片
        this.curType = initType; // 当前显示的图片分类
        this.parasitifer = methods.$(parasitifer); // 挂载点
        this._classify(data);
        console.log(this.classified)
    }

    // 对图片进行分类
    Img.prototype._classify = function (data) {
        let srcs = []; // 已经生成过的图片的src
        data.forEach(({ title, type, alt, src }) => {
            // 判断types是否存在这个分类，没有就push
            if (!this.types.includes(type)) {
                this.types.push(type);
            }
            // 判断classified是否存在这个分类
            if (!Object.keys(this.classified).includes(type)) {
                this.classified[type] = [];
            }
            // 判断这个图片是否已经生成过
            if (!srcs.includes(src)) {
                // 图片没有生成过
                // 生成图片
                srcs.push(src);
                let figure = document.createElement('figure');
                let img = document.createElement('img');
                let figcaption = document.createElement('figcaption');
                img.src = src;
                img.setAttribute('alt', alt);
                figcaption.innerText = title;
                methods.appendChild(figure, img, figcaption);
                this.all.push(figure)
                // 添加到对应的分类
                this.classified['全部'].push(this.all.length - 1);
                this.classified[type].push(this.all.length - 1);
            } else {
                // 图片已经生成过
                // 到all（srcs中的索引和all一样）中找找到对应的图片
                // 添加到对应的分类
                this.classified[type].push(srcs.findIndex(s => s === src));
            }

        })
    }

    // 生成dom元素
    Img.prototype._createElement = function () {
        let typeBtn = [];
        for (let type of this.types.values()) {
            typeBtn.push(`
                <li class="__Img__classify__type-btn${type === this.curType ? ' __Img__type-btn-active' : ''}"${type}</li>
                `)
        }
    }

    // 绑定事件
    Img.prototype._bind = function () {

    }

    // 显示在页面上
    Img.prototype._show = function () {

    }
    window.$Img = Img;
})(window, document)