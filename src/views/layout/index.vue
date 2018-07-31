<template>
  <div class="layout" @click="hideMenu" ref="getmenuHeight">
    <div class="header clearfix">
      <div class="header-left" @click="showMenu">
        <icon name="menu" class="svg-header"></icon>
      </div>
      <h1>{{this.$store.state.headerTitle}}</h1>
      <div class="header-right">
        <icon  name="news" class="svg-header"></icon>
        <div class="notice" v-if='noticeCount!=0'>
            <badge :text="noticeCount"></badge>
        </div>
      </div>
    </div>

<!-- ,height:menuHeight+'px' -->
    <div class="menu clearfix" :style="{opacity:menuOpacity,left: menuLeft+'%'}">
      <h3>首页</h3>
      <ul class="clearfix">
        <li @click='toWhere("home")'>概览</li>
      </ul>
      <h3>我的用户</h3>
      <ul class="clearfix">
        <li @click='toWhere("userList")'>用户列表</li>
        <li @click='toWhere("userCount")'>用户统计</li>
      </ul>
      <h3>我的代理</h3>
      <ul class="clearfix">
        <li  v-if='this.$store.state.roles!="1"' @click='toWhere("agentHigher")'>上级代理</li>
        <li  @click='toWhere("agentLower")'>下级代理</li>
        <!-- <li  @click='goaddAgent'>新增代理</li> -->
        <li  @click='toWhere("agentCount")'>代理统计</li>
        <!-- <li  v-if='this.$store.state.roles!="3"' @click='goagentApproval'>代理审批</li> -->
      </ul>
      <h3>我的收益</h3>
      <ul class="clearfix">
        <li @click='toWhere("incomecount")'>收益汇总</li>
        <li @click='toWhere("incomedetail")'>收益明细</li>
        <li @click='toWhere("cashdetail")'>提现</li>
        <li @click='toWhere("cashoutlay")'>提现明细</li>
      </ul>
      <h3>更多功能</h3>
      <ul class="clearfix">
        <li @click='toWhere("myinfo")'>我的信息</li>
      </ul>
      <div  class="login-out"  @click="loginout">
         <x-button type="warn" mini action-type="button">退出登录</x-button>
      </div>
    </div>

    <div class="menu-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuLeft: -100,
      menuOpacity: 0,
      menuHeight: '',
      noticeCount: 0 // 消息条数
    }
  },
  methods: {
    /*
    setIntervalCount () {
      var _this = this
      var timenow = new Date().getTime()
      var noticeCountTime = sessionStorage.getItem('XWCNT')
      if (!noticeCountTime) {
        _this.getNoticeCount(timenow)
      } else if (noticeCountTime && (timenow - noticeCountTime) >= 300000) {
        _this.getNoticeCount(timenow)
      } else if (sessionStorage.getItem('XWCUR')) {
        _this.noticeCount = sessionStorage.getItem('XWCUR')
      }
    },
            // ====================1.获取消息条数===================
    getNoticeCount (timenow) {
      var _this = this
      noticeCount().then(res => {
        sessionStorage.setItem('XWCNT', timenow)
        sessionStorage.setItem('XWCUR', res.unread)
        _this.noticeCount = res.unread
      }).catch(err => {
        console.log(err)
      })
    },
    */
    // ====================2.菜单====================
    showMenu (event) {
      console.log(1)
      event.cancelBubble = true
      this.menuLeft = this.menuLeft === 0 ? -100 : 0
      this.menuOpacity = this.menuOpacity === 0 ? 1 : 0
    },
    hideMenu () {
      this.menuLeft = -100
      this.menuOpacity = 0
    },
    // 路由导航
    toWhere (val) {
      this.$router.push({name: val})
    },
    // 退出登录
    loginout () {

    }
  },
  mounted () {
    // var _this = this
    // _this.menuHeight = _this.$refs.getmenuHeight.offsetHeight - 56
    // ====================1.定时器获取消息条数====================
    // _this.setIntervalCount()
    // setInterval(function () {
    //   _this.setIntervalCount()
    // }, 60000)
  }
}
</script>

<style lang="scss">
.layout{
  height: 100%;
  // min-height: 500px;
  width: 100%;
  -webkit-box-shadow: 0px 0px 1px #e0e0e0;
  box-shadow: 0px 0px 1px #e0e0e0;
  .header{
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px 0;
    width: 100%;
    height: 50px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: linear-gradient(-45deg, #1574a2, #1e679c);
    z-index: 1;
    .header-left{
      position: absolute;
      top: 10px;
      left: 15px;
    }
    h1{
      text-align: center;
      font-size: 18px;
      color: #fff;
    }
    .header-right{
      position: absolute;
      top: 10px;
      right: 15px;
      .notice{
        position: absolute;
        top: -13px;
        right: -10px;
      }
    }
    .svg-header{
      width: 30px;
      height: 30px;
    }
  }
  .menu{
    position: fixed;
    width: 60%;
    top: 53px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-left: 1%;
    height: 100%;
    background: linear-gradient(-45deg, #cdccb8, #00aed3, #284e7b);
    border-radius: 5px;
    -webkit-transition: all ease-in-out 0.38s;
    transition: all ease-in-out 0.38s;
    z-index: 9999;
    h3{
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      text-align: center;
      color: #fff;
    }
    ul{
      list-style: none;
      li{
        box-sizing: border-box;
        margin-left: 2.5%;
        margin-top: 8px;
        padding: 6px;
        float: left;
        width: 30%;
        font-size: 12px;
        text-align: center;
        color: #20608f;
        border-radius: 5px;
        background-color: #fff;
      }
    }
    .login-out{
      text-align: center;
      margin-top: 20px;
    }
  }
  .menu-box {
        box-sizing: border-box;
        padding-top: 50px;
        height: 100%;
        .weui-dialog {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0;
        }
  }
}
</style>
