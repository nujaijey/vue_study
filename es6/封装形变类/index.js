// 形变类
class Transform {
    constructor(sel) {
        this.el = document.querySelector(sel);
        this._queue = [];
        this._transform = {
            translate: '',
            scale: '',
            rotate: ''
        };
        this.el.style.transition = `all ${.3}s`;
        this.defaultTime = Transform.config.defaultTime;
    }

    // 位移
    translate(value, time) {
        return this._add('translate', value, time)
    }

    // 缩放
    scale(value, time) {
        return this._add('scale', value, time)
    }

    // 形变
    rotate(value, time) {
        return this._add('rotate', value, time)
    }

    // 睡眠
    sleep(time) {
        return this._add('sleep', '', time)
    }

    // 添加动画
    _add(type, value, time = this.defaultTime) {
        this._queue.push({ type, value, time });
        return this;
    }

    // 添加完成 可以开始动画
    done() {
        this._start();
    }

    // 开始动，从队列把动画一个个拿出来
    _start() {
        if (!this._queue.length) return;
        // 先进先出
        setTimeout(() => {
            const info = this._queue.shift();
            console.log(`${info.type} ${info.time / 1000}s`)
            this.el.style.transition = `all ${info.time / 1000}s`;
            this.el.style.transform = this._getTransform(info);
            setTimeout(() => {
                this._start()
            }, info.time);
        }, 0);
    }

    _getTransform({ type, value, time }) {
        const _tsf = this._transform;
        switch (type) {
            case 'translate':
                _tsf.translate = `translate(${value})`;
                break;
            case 'scale':
                _tsf.scale = `scale(${value})`;
                break;
            case 'rotate':
                _tsf.rotate = `rotate(${value}deg)`;
                break;
            case 'sleep':
                break;
        }
        return `${_tsf.translate} ${_tsf.scale} ${_tsf.rotate}`
    }
}

Transform.config = {
    defaultTime: 300
}

Transform.config.defaultTime = 1000;

// 继承
class MultiTransform extends Transform {
    multi(value, time) {
        return this._add('multi', value, time)
    }

    _getTransform({ type, value, time }) {
        const _tsf = this._transform;
        switch (type) {
            case 'translate':
                _tsf.translate = `translate(${value})`;
                break;
            case 'scale':
                _tsf.scale = `scale(${value})`;
                break;
            case 'rotate':
                _tsf.rotate = `rotate(${value}deg)`;
                break;
            case 'sleep':
                break;
            case 'multi':
                value.forEach(item => {
                    this._getTransform(item)
                });
        }
        return `${_tsf.translate} ${_tsf.scale} ${_tsf.rotate}`
    }
}

const mtf = new MultiTransform('.ball');
mtf
    .translate('100px, 100px')
    .scale(2)
    .rotate(180, 2000)
    .sleep()
    .multi([
        {
            type: 'translate',
            value: '200px, 200px'
        },
        {
            type: 'scale',
            value: 1.5,
        },
        {
            type: 'rotate',
            value: 0
        }
    ], 5000)
    .done()
