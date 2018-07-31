<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
//  @import '@/styles/vux.scss'
</style>


<style lang="less">
@import '~vux/src/styles/reset.less';

#app{
  height: 100%;
  min-height: 500px;
  max-width: 980px;
  margin: 0 auto;
}
body {
  background-color: #fbf9fe;
}
</style>
