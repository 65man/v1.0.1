<template>
  <div class="home-container">
    <!-- 总收入 -->
    <div class="home-income">
      <group-title class="item-title">总收入</group-title>
      <grid class="income">
        <grid-item>
          <p slot="label">￥
            <countup :end-val="123456789.88" :duration="1" :decimals="2"></countup>
          </p>
        </grid-item>
      </grid>
    </div>
    <!-- 数据中心 -->
    <div class="home-data">
      <group-title class="item-title">数据中心</group-title>
      <grid :cols="2">
        <grid-item>
          <p slot="label">昨日收益</p>
          <p slot="label" class="data-center-num">￥ 1000</p>
        </grid-item>
        <grid-item>
          <p slot="label" >已提现(截止至昨日)</p>
          <p slot="label" class="data-center-num">￥ 1000</p>
        </grid-item>
        <grid-item>
          <p slot="label">昨日新增用户</p>
          <p slot="label" class="data-center-num">666</p>
        </grid-item>
        <grid-item>
          <p slot="label">昨日活跃用户</p>
          <p slot="label" class="data-center-num">333</p>
        </grid-item>
      </grid>
    </div>
    <!-- 捷径入口 -->
    <div class="home-enter">
      <group-title class="item-title">快捷入口</group-title>
      <grid :cols="2">
        <grid-item link="/layout/cashoutlay">
          <icon  slot="icon"   name="cashout" class="svg-quick" ></icon>
          <span slot="label">提现</span>
        </grid-item>
        <grid-item link="/layout/usercount">
            <icon  slot="icon"   name="datacount" class="svg-quick" ></icon>
          <span slot="label">用户统计</span>
        </grid-item>
        <grid-item link="/layout/loweragent">
           <icon  slot="icon"   name="loweragent" class="svg-quick" ></icon>
          <span slot="label">下级代理</span>
        </grid-item>
        <grid-item link="/layout/shareqrcode">
          <icon  slot="icon"   name="qrcode" class="svg-quick" ></icon>
          <span slot="label">邀请二维码</span>
        </grid-item>
      </grid>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.item-title{
      font-size: 14px;
      padding-left: 15px;
      color: #999;
      height: 40px;
      line-height: 40px;
    }

.home-container{
  .home-income{
    p{
      font-size: 36px;
      font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
      font-weight: 600;
    }
  }
  .home-data{
    .data-center-num{
        font-size: 16px;
        font-weight: 600;
    }
  }
  .home-enter{
    .svg-quick{
      width: 28px;
      height: 28px;
    }
  }
}
</style>
