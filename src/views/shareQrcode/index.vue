<template>
  <div class="share" ref="getqrcodeWidth">
      <canvas  width="640" height="640"  ref="mycanvas" v-show='false'/>
      <div  v-if='src!=""' class="share-content">
        <img :src="src" alt=""  class="qrcode"  v-bind:style="{width:qrcodeWidth+'px',height:qrcodeWidth+'px'}">
        <p>长按图片保存到本地，发送给您的好友，识别图片中二维码进行注册即可成为您的下级代理。</p>
        <p  v-clipboard:copy="URL"  v-clipboard:success="onCopy">{{URL}}</p>
        <p>点击上述链接可复制链接到剪贴板，粘贴发送给您的好友，打开链接进行注册即可成为您的下级代理。</p>
      </div>
  </div>
</template>

<script>
import qrcanvas from 'qrcanvas'

// 引入弹窗交互
import {
    alertTips,
    loadingTips,
    confirmTips,
    toastTips
} from '@/utils/messageTips.js'

export default {
  components: {
    qrcanvas
  },
  data () {
    return {
      URL: '',
      qrcodeWidth: '',
      src: ''
    }
  },
  mounted () {
    this.$store.state.headerTitle = '我的推广码'
        // ====================1.获取数据生成链接===================
    // this.URL = `https://m.cs.qp.gzzhongw.net/register?nickname=${this.$route.query.nickname}&code=${this.$route.query.code}`
    this.URL = 'https://doc.vux.li/zh-CN/components/qrcode.html'
    this.getqrCode()
  },
  methods: {
    getqrCode () {
      var _this = this
            // 绘制一个二维码
      var canvasCode = qrcanvas({
        data: this.URL,
        cellSize: 10
      })
            // 绘制图片原始大小的白色幕布
      var ctx = _this.$refs.mycanvas.getContext('2d')
            // 将原图画进去，
      _this.qrcodeWidth = _this.$refs.getqrcodeWidth.offsetWidth * 0.96
      var img = new Image()
      img.src = require('@/assets/img/bg-qrcode.jpg')
      img.onload = function () {
        ctx.drawImage(img, 0, 0, 640, 640)
                // ctx.fillStyle = "#fff";
                // ctx.fillRect(195, 195, 250, 250);
                // ctx.fill();
        ctx.drawImage(canvasCode, 95, 230, 220, 220)
        var strDataURI = _this.$refs.mycanvas.toDataURL('image/jpeg')
        _this.src = strDataURI
      }
    },
    onCopy: function () {
      toastTips('text', '12em', '已复制注册链接到剪贴板')
    }
  }
}
</script>


<style lang="scss" scope>
.share {
  width: 100%;
  height: 100%;
  .qrcode {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 5px;
    max-width: 640px;
    max-height: 640px;
  }
  p {
    padding: 0 3%;
  }
  p:nth-of-type(1) {
    padding-bottom: 5px;
    font-size: 14px;
    border-bottom: 2px solid #c7c7c7;
  }
  p:nth-of-type(2) {
    padding-top: 5px;
    font-size: 14px;
    font-weight: 600;
    word-break: break-all;
  }
  p:nth-of-type(3) {
    font-size: 14px;
  }
}
</style>
