// 整体思路
// 1初始化一个弹出框
// 2生成dom元素
// 3插到页面中
// 4显示

(function (window, document) {
  let Msg = function (options) {
    this._init(options);
  };

  // 初始化
  Msg.prototype._init = function ({
    content = "",
    confirm = null,
    cancel = null,
    useHTML = false,
    contentStyle = {},
    contentFontSize = "1.5em",
  }) {
    this.content = content;
    this.cancel = cancel;
    this.confirm = confirm;
    this.useHTML = useHTML;
    this.contentStyle = contentStyle;
    this.contentFontSize = contentFontSize;

    this._createElement();
    this._bind([this._el, this._overlay]);
    this._show([this._el, this._overlay]);
  };

  // 生成dom元素
  Msg.prototype._createElement = function () {
    let wrap = document.createElement("div");
    wrap.className = "msg_wrap";
    wrap.innerHTML =
      '\
    <div class="msg-header">\
      <span>确认删除</span>\
      <span class="msg-header-close-button">×</span>\
    </div>\
    <div class="msg-body">\
      <div class="msg-body-icon">\
        <div class="msg-body-icon-info"></div>\
      </div>\
      <div class="msg-body-content"></div>\
    </div>\
    <div class="msg-footer">\
      <button class="msg-footer-btn msg-footer-cancel-button">算了吧</button>\
      <button class="msg-footer-btn msg-footer-confirm-button">好的</button>\
    </div>';

    let contentDOM = wrap.querySelector(".msg-body .msg-body-content");

    const contentStyle = {
      fontSize: this.contentFontSize,
      ...this.contentStyle,
    };

    for (let i in this.contentStyle) {
      if (contentStyle.hasOwnProperty(i)) {
        contentDOM.style[i] = this.contentStyle[i];
      }
    }

    if (this.useHTML) {
      contentDOM.innerHTML = this.content;
      // } else {
      //   contentDOM.innerText = this.content;
    }

    let overlay = document.createElement("div");
    overlay.className = "msg-overlay";

    this._el = wrap;
    this._overlay = overlay;
  };

  // 绑定事件
  Msg.prototype._bind = function ([el, overlay]) {
    const _this = this;

    // 隐藏弹出框
    const hideMsg = function () {
      el.style.transform = "translate(-50%, -50%) scale(0, 0)";
      overlay.style.opacity = "0";

      // 元素只是隐藏了，此时需要移除元素，防止遮罩层仍存在导致无法点击
      setTimeout(function () {
        document.body.removeChild(el);
        document.body.removeChild(overlay);
      }, 300);
    };

    // 取消事件
    const cancel = function (e) {
      _this.cancel && _this.cancel.call(_this, e);
      hideMsg();
    };

    // 确认事件
    const confirm = function (e) {
      _this.confirm && _this.confirm.call(_this, e);
      hideMsg();
    };

    // 为元素添加事件
    overlay.addEventListener("click", cancel);
    el.querySelector(".msg-header .msg-header-close-button").addEventListener(
      "click",
      cancel
    );
    el.querySelector(".msg-footer .msg-footer-cancel-button").addEventListener(
      "click",
      cancel
    );
    el.querySelector(".msg-footer .msg-footer-confirm-button").addEventListener(
      "click",
      confirm
    );
  };
  // 显示弹出框
  Msg.prototype._show = function ([el, overlay]) {
    document.body.appendChild(el);
    document.body.appendChild(overlay);

    // 程序先走完同步任务才会走异步任务，所以可以延时来制造一个过渡的效果
    (function () {
      el.style.transform = "translate(-50%, -50%) scale(1, 1)";
      overlay.style.opacity = "1";
    });
  };
  window.$Msg = Msg;
})(window, document);
