<template>
  <div class="agentcount">
    <!-- 导航头 -->
    <div class="dc-fixed">
      <div class="dc-nav">
        <button-tab v-model="navIndex">
          <button-tab-item @on-item-click="tabIndex(0)">新增代理</button-tab-item>
          <button-tab-item @on-item-click="tabIndex(1)">直属代理</button-tab-item>
        </button-tab>
      </div>

      <!-- 日期查询 -->
      <div class="cd-date">
        <group>
          <datetime title="点击选择月份查询" v-model="dateMonth" @on-change="changeMonth" :min-year=2018 format="YYYY-MM" year-row="{value}年" month-row="{value}月" ></datetime>
        </group>
      </div>

      <!-- 3.新增代理表头 -->
      <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" v-if="navIndex==0" class="tableIndex-2">
        <thead>
          <tr style="background-color: #F7F7F7"  v-if='!hasReduce'>
            <th>日期</th>
            <th>新增代理(个)</th>
            <th>
               <group>
            <selector placeholder="请选择" v-model="levelOption" :options="selectLevel"></selector>
          </group>
            </th>
          </tr>
           <tr style="background-color: #F7F7F7"  v-if='hasReduce'>
            <th>日期</th>
            <th>新增代理(个)</th>
            <th>减少代理(个)</th>
            <th>
               <group>
            <selector placeholder="请选择" v-model="levelOption" :options="selectLevel"></selector>
          </group>
            </th>
          </tr>
        </thead>
      </x-table>

      <!-- 1.总用户数 -->
      <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" v-if="navIndex==1" class="tableIndex-3">
        <thead>
          <tr style="background-color: #F7F7F7">
            <th>日期</th>
            <th>总数</th>
            <th>5星</th>
            <th>4星</th>
            <th>3星</th>
            <th>2星</th>
            <th>1星</th>
            <th>0星</th>
          </tr>
        </thead>
      </x-table>



    </div>

    <!-- 滚动表格区 -->
    <div class="dc-table">
      <scroller lock-x height="-170" @on-pulldown-loading="selPullDown" @on-pullup-loading="selPullUp" :use-pulldown="true" :use-pullup="true"
        :bounce="true" :pulldown-config="this.$store.state.downconfig" :pullup-config="this.$store.state.upconfig"
        ref="scroller" v-show="isTable">
        <div>
        <!-- 3.新增代理表格 -->
          <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" v-if="navIndex==0&&listData" class="tableIndex-2">
            <tbody>
            <tr v-for="item in listData"  :key='item.id'  v-if='!hasReduce'>
                <td>{{item.date_time*1000|dateFormat('MM-DD')}}</td>
                <td>{{item.increase}}</td>
                  <td>{{levelOption==0?'所有':levelOption+'级'}}</td>
              </tr>
            <tr>
              <tr v-for="item in listData"  :key='item.id'  v-if='hasReduce'>
                <td>{{item.date_time*1000|dateFormat('MM-DD')}}</td>
                <td>{{item.increase}}</td>
                <td>{{item.reduce}}</td>
                 <td>{{levelOption==0?'所有':levelOption+'级'}}</td>
              </tr>
            <tr>
              <td colspan=4 v-if='listData.length!=0'>第{{pageIndex}}页/共{{pageCount}}页(共{{totalCount}}条)</td>
               <td colspan=4 v-if='listData.length==0'>暂无数据</td>
              </tr>
            </tbody>
          </x-table>

          <!-- 总用户数 -->
          <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" v-if="navIndex==1&&listData" class="tableIndex-3">
                <tbody>
             <tr v-for="item in listData"  :key='item.id'>
                <td>{{item.date_time*1000|dateFormat('MM-DD')}}</td>
                <td>{{item.counts}}</td>
                <td>{{item.counts}}</td>
                <td>{{item.counts}}</td>
                <td>{{item.counts}}</td>
                <td>{{item.counts}}</td>
                <td>{{item.counts}}</td>
                <td>{{item.counts}}</td>
              </tr>
            <tr>
              <td colspan=8 v-if='listData.length!=0'>第{{pageIndex}}页/共{{pageCount}}页(共{{totalCount}}条)</td>
               <td colspan=8 v-if='listData.length==0'>暂无数据</td>
            </tr>
            </tbody>
          </x-table>
        </div>
      </scroller>

    </div>
  </div>

</template>


<script>
// 引入请求
// import { dataCount } from '../../api/countModule'

// 引入格式化
import { formatToMonth, formatToTimestamp } from '../../utils/format.js'

// 引入弹窗交互
import { loadingTips } from '../../utils/messageTips.js'

// 引入上下拉刷新
import { loadMore } from '../../utils/loadmore.js'

import {
    TransferDomDirective as TransferDom
} from 'vux'

export default {
  directives: {
    TransferDom
  },
  data () {
    return {
      isTable: false, // 1.展示表格
      listData: '', // 1.数据
      pageIndex: 1, // 1.页码从第一页开始
      pageCount: 0, // 1.总页数
      totalCount: 0, // 1.总数量
      dateMonth: '', // 2.选择月份
      navIndex: 0, // 2.tab栏Index
      levelOption: 0, // 3.筛选层级
      selectLevel: [{
                // 3.下拉选项列表
        key: '0',
        value: '所有代理'
      }, {
        key: '1',
        value: '直属代理'
      }, {
        key: '2',
        value: '下2级代理'
      }, {
        key: '3',
        value: '其它代理'
      }],
      startTime: '',
      endTime: '',
      sort: '',
      hasReduce: false
    }
  },
  created () {
        // 获取当前时间渲染页面
    this.dateMonth = formatToMonth()
  },
  mounted () {
    var _this = this
    _this.$store.state.headerTitle = '代理统计'
        // ====================1.首次载入默认数据====================
    var startEndTime = formatToTimestamp(this.dateMonth)
    _this.startTime = startEndTime[0]
    _this.endTime = startEndTime[1]
    _this.getList(true)
  },
  methods: {
        // ====================1.获取数据====================
    getList (isEmpty, isPullDown) {
      var _this = this
      if (_this.navIndex === 0) {
        var urlAPI = 'add'
        var type = 'agency'
        var level = _this.levelOption === 0 ? '' : _this.levelOption
      }
      if (_this.navIndex === 1) {
        var urlAPI = 'play'
        var type = 'total'
      }
      // dataCount(
      //               _this.startTime,
      //               _this.endTime,
      //               '-date_time',
      //               _this.pageIndex,
      //               type,
      //               urlAPI
      //           )
      //           .then(res => {
      //             var list = ''
      //             list = res['items']
      //             if (_this.navIndex === 0) {
      //               for (var index in list) {
      //                 if (list[index].reduce !== '0') {
      //                   _this.hasReduce = true
      //                 } else {
      //                   _this.hasReduce = false
      //                 }
      //               }
      //             }
      //             if (_this.navIndex === 1) {
      //               for (var index in list) {
      //                 list[index].counts =
      //                           list[index].total_increase - list[index].total_reduce
      //               }
      //             }
      //             loadMore(_this, list, res, isEmpty, isPullDown)
      //           })
      //           .catch(err => {
      //             _this.$vux.loading.hide()
      //           })
    },

        // ====================2.更改月份、tab栏触发====================
    changeMonth (value) {
      this.pageIndex = 1
      var startEndTime = formatToTimestamp(this.dateMonth)
      this.startTime = startEndTime[0]
      this.endTime = startEndTime[1]
      this.getList(true)
    },
    tabIndex (index) {
      this.pageIndex = 1
      var startEndTime = formatToTimestamp(this.dateMonth)
      this.startTime = startEndTime[0]
      this.endTime = startEndTime[1]
      this.getList(true)
    },

        // 上拉加载
    selPullUp () {
      this.pageIndex++
      this.getList(false)
    },

        // 下拉刷新
    selPullDown () {
      this.pageIndex = 1
      this.getList(true, true)
    }
  },
    // 监听层级跟游戏时间
  watch: {
        // ====================3.更改层级、游戏时间触发====================
        // 监听层级
    levelOption (newVal, oldVal) {
      this.pageIndex = 1
      this.getList(true)
    }
  },
  activated () {
    var _this = this
    _this.$refs.scroller.reset()
  }
}
</script>

<style lang="scss" scope>
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
