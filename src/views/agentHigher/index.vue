<template>
  <div id="agent-sa">
    <h3>上级代理商信息</h3>
    <div class="content">
      <x-table v-if="data">
        <tbody>
          <tr>
            <td>代理商ID</td>
            <td> {{ data.agency_id }}</td>
          </tr>
          <tr>
            <td>代理商名称</td>
            <td> {{ data.nickname }}</td>
          </tr>
          <tr>
            <td>联系方式</td>
            <td> {{ data.telephone }}
            </td>
          </tr>
           <tr>
            <td>代理商星级</td>
            <td> {{ data.level+'星' }}</td>
          </tr>
        </tbody>
      </x-table>
    </div>
  </div>
</template>

<script>
// 引入接口
// import { bindParent } from '../../api/agentModule'
// 引入弹窗交互
import { loadingTips } from '@/utils/messageTips.js'

export default {
  data () {
    return {
      data: ''
    }
  },
  mounted () {
    this.$store.state.headerTitle = '上级代理'
        // ====================1.首次载入默认数据====================
    // loadingTips('加载中')
    this.getList()
  },
  methods: {
        // 获取数据
    getList: function () {
      var _this = this
      // bindParent()
      //           .then(res => {
      //             _this.$vux.loading.hide()
      //             _this.data = res
      //           })
      //           .catch(err => {
      //             _this.$vux.loading.hide()
      //           })
    }
  }
}
</script>

<style lang="scss" scope>
#agent-sa {
  h3 {
    text-align: center;
    margin: 20px 0;
  }
  .content {
    margin-left: 5%;
    width: 90%;
    font-size: 14px;
  }
  tbody {
    tr {
      td:nth-of-type(1) {
        padding-right: 20px;
        width: 40%;
        text-align: right;
      }
    }
  }
}
</style>
