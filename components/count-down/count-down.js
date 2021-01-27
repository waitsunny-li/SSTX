/*
 * @Author: liweilong
 * @Date: 2021-01-27 14:37:11
 */
// components/count-down/count-down.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    endTime: {
      type: Number,
      value: 0,
      observer: '_changeEndtime'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    residueTime: ''
  },

  attached: function () {
    console.log(this.data.endTime);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _changeEndtime(newvalue) {
      this.countDown(newvalue)
    },
    countDown(endTime) { //倒计时函数
      let newTime = new Date().getTime();
      let remainTime = endTime * 1000 - newTime;
      let obj = null;
      let t = '';
      // 如果活动未结束，对时间进行处理
      if (remainTime > 0) {
        let time = remainTime / 1000;
        // 获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = this.formatNumber(day) + '天' + this.formatNumber(hou) + ':' + this.formatNumber(min) + ':' + this.formatNumber(sec)
      }
      t = setTimeout(() => {
        this.setData({
          residueTime: obj
        });
        this.countDown(endTime)
      }, 1000)
      if (remainTime <= 0) {
        clearTimeout(t);
      }
    },

    formatNumber(n){
      n = n.toString()
      return n[1] ? n : '0' + n
    }
  }
})