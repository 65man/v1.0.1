<template>
  <div class="agentcount">
    <!-- 导航头 -->
    <div class="dc-fixed">
      <div class="dc-nav">
        <button-tab :value="tableRight">
          <button-tab-item @on-item-click="navIndex(0)">活跃用户</button-tab-item>
          <button-tab-item @on-item-click="navIndex(1)">新增用户</button-tab-item>
          <button-tab-item @on-item-click="navIndex(2)">游戏数据</button-tab-item>
        </button-tab>
      </div>

      <!-- 日期查询 -->
      <div class="cd-date">
        <group>
          <datetime
            title="点击选择月份查询"
            :value="dateMonth"
            @on-change="changeMonth"
            :min-year="2018"
            format="YYYY-MM"
            year-row="{value}年"
            month-row="{value}月"
          >
          </datetime>
        </group>
      </div>

      <!-- 表头 -->
      <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" class="tableIndex-0">
        <thead>
          <tr style="background-color: #F7F7F7">
            <th>日期</th>
            <th v-if="tableRight == 0">活跃用户数(个)</th>
            <th v-if="tableRight == 1">新增用户</th>
            <th v-if="tableRight == 2">每天玩一局以上用户数(个)</th>
          </tr>
        </thead>
      </x-table>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dateMonth: '',
      tableRight: 0
    }
  },
  methods: {
    navIndex (val) {
      this.tableRight = val
    },
    changeMonth () {}
  }
}
</script>


<style lang="scss">
  .agentcount {
      .dc-fixed {
          position: fixed;
          top: 50px;
          width: 100%;
          max-width: 980px;
          background-color: #fbf9fe;
          z-index: 2;
          /* 头部 */
          .dc-nav {
              .vux-button-group {
                  background: #fff;
                  >a.vux-button-group-current {
                      color: #1296db;
                      border-bottom: 2px solid #1296db;
                  }
                  a {
                      height: 40px;
                      line-height: 40px;
                      background: #fff;
                  }
                  >a.vux-button-tab-item-middle,
                  >a.vux-button-tab-item-first,
                  >a.vux-button-tab-item-last {
                      &:after {
                          border: none;
                      }
                  }
                  >a.vux-button-tab-item-first,
                  a.vux-button-tab-item-last {
                      border-bottom-left-radius: 0;
                      border-bottom-right-radius: 0;
                  }
              }
          }
          /* 表头 */
          .vux-table {
              font-size: 12px;
              &:after {
                  border-top: none;
              }
              .weui-cells {
                  margin-top: 0;
                  background-color: #f7f7f7;
                  &:before {
                      border-top: none;
                  }
                  &:after {
                      border-bottom: none;
                  }
                  .weui-select {
                      padding-right: 20px;
                      padding-left: 5px;
                      width: auto;
                      height: 38px;
                      line-height: 38px;
                      font-size: 12px;
                  }
                  .weui-cell__bd:after {
                      right: 10px;
                      border-width: 0px 2px 2px 0px;
                  }
              }
          }
      }
      /* 表格 */
      .dc-table {
          width: 100%;
          height: 100%;
          padding-top: 120px;
          tr {
              td {
                  padding: 8px 3px;
                  font-size: 12px;
                  line-height: normal;
              }
          }
      }
      /*独立表格*/
      .tableIndex-1 {
          th,
          td {
              width: 25%;
          }
      }
      .tableIndex-0 {
          th,
          td {
              width: 50%;
          }
      }
      /*独立表格*/
      .tableIndex-2 {
          th,
          td {
              width: 25%;
          }
      }
      .tableIndex-3 {
          th,
          td {
              width: 12.5%;
          }
      }
  }
</style>

