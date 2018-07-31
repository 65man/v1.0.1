<template>
  <div id="userlist">
    <!-- 搜索框 -->
    <div class="ul-search">
      <div class="search">
        <div>
          <group>
            <selector placeholder="请选择" v-model="optionVal" :options="selectList"></selector>
          </group>
        </div>
        <x-input :placeholder="placeholderVal" v-model='inputVal' :disabled='false' :style="{background:optionVal==0?'#d8d8d8':'#fff'}"></x-input>
        <x-button mini type="primary" action-type="button" @click.native='sendSearch' >查询</x-button>
      </div>

      <!-- 表头 -->
      <div class="title">
        <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;">
          <thead>
            <tr style="background-color: #F7F7F7">
              <th  @click='sortUD(0)' :style="{color:sortUDindex==0?'#1296db':'#000'}" style="width: 20%">
                <span>游戏ID
                  <icon  :name="sortUDindex==0?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
              <th  @click='sortUD(1)' :style="{color:sortUDindex==1?'#1296db':'#000' }" style="width: 25%">
                <span>绑定代理
                     <icon  :name="sortUDindex==1?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
              <th @click='sortUD(2)' :style="{color:sortUDindex==2?'#1296db':'#000'}" style="width: 30%">
                <span>金币总消耗(个)
                    <icon  :name="sortUDindex==2?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
              <th @click='sortUD(3)' :style="{color:sortUDindex==3?'#1296db':'#000'}" style="width: 25%">
                <span>绑定时间
                    <icon  :name="sortUDindex==3?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
            </tr>
          </thead>
        </x-table>
      </div>
    </div>

    <!-- 滚动表格区 -->
    <div class="ul-table">
      <scroller lock-x height="-130" @on-pulldown-loading="selPullDown" @on-pullup-loading="selPullUp" :use-pulldown="true" :use-pullup="true"
        :bounce="true" :pulldown-config="this.$store.state.downconfig" :pullup-config="this.$store.state.upconfig" ref="scroller" v-show="isTable">
        <div>
          <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;">
            <tbody>
              <tr v-for="(item,index) in listData" @click="openDetail(index)" :key='item.id'>
                <td style="width: 20%">{{item.role_id==""?'空':item.role_id}}</td>
                <td style="width: 25%">{{item.parent_nickname}}</td>
                <td style="width: 30%">{{item.cost_total|moneyFormat(2,1)}}</td>
                <td style="width: 25%">{{item.bind_at*1000|dateFormat('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
              <tr>
              <td colspan=4 v-if='listData.length!=0'>第{{pageIndex}}页/共{{pageCount}}页(共{{totalCount}}条)</td>
               <td colspan=4 v-if='listData.length==0'>暂无数据</td>
              </tr>
            </tbody>
          </x-table>
        </div>
      </scroller>
    </div>

    <!-- 点击查看详细弹出框 -->
    <div>
      <x-dialog v-model="isDetail" hide-on-blur :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}">
        <div class="ul-xdialog">
          <x-table class="table-detail">
            <thead>
              <tr>
                <th colspan="2">用户详情</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>游戏ID</td>
                <td>{{detailedData.role_id}}</td>
              </tr>
              <tr>
                <td>绑定代理</td>
                <td>{{detailedData.parent_nickname}}</td>
              </tr>
              <tr>
                <td>金币总消耗(个)</td>
                <td>{{detailedData.cost_total|moneyFormat(2,1)}}</td>
              </tr>
              <tr>
                <td>绑定时间</td>
                <td>{{detailedData.bind_at*1000|dateFormat('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
            </tbody>
          </x-table>
          <p class="table-income-title">金币总消耗(个)</p>
         <!-- 日期查询 -->
            <div class="search-income">
                <group>
                <datetime   :min-year=2018 format="YYYY-MM-DD" year-row="{value}年" month-row="{value}月" day-row="{value}日" v-model='starttime'  @on-change="changestarttime()"></datetime>
                <span>~</span>
                 <datetime   :min-year=2018 format="YYYY-MM-DD" year-row="{value}年" month-row="{value}月" day-row="{value}日"  v-model='endtime'  @on-change="changeendtime()"></datetime>
                  <x-button mini type="primary" action-type="button" @click.native='incomeSearch' >查询</x-button>
                </group>
                 <div class="table-income-scroll">
                       <x-table class="table-income" full-bordered>
                    <tbody>
                        <tr>
                            <td>总收益</td>
                            <td>{{detailedData.role_id}}</td>
                        </tr>
                        <tr v-for="item in listData" :key='item.id'>
                            <td>十人抢庄牛牛</td>
                            <td>{{item.cost_total|moneyFormat(2,1)}}</td>
                        </tr>
                    </tbody>
                </x-table>
                 </div>
            </div>

          <!-- <x-icon type="ios-close-outline" style="fill:#999;"  @click="isDetail = false"></x-icon> -->
          <flexbox style="margin-top:15px">
            <flexbox-item>
                <x-button mini type="primary" action-type="button" @click.native='tobeAgent' >升级为代理商</x-button>
            </flexbox-item>
            <flexbox-item>
                <x-button mini type="primary" action-type="button"  @click.native="isDetail = false" >关闭</x-button>
            </flexbox-item>
          </flexbox>

        </div>
      </x-dialog>
    </div>
  </div>

</template>

<script>
// 引入接口
// import { lowerAgent } from '../../api/agentModule'

// 引入弹窗交互
import { toastTips, loadingTips } from '../../utils/messageTips.js'

// 引入上下拉刷新
import { loadMore } from '../../utils/loadmore.js'
import {
    TransferDomDirective as TransferDom,
    Flexbox, FlexboxItem, Divider
} from 'vux'

export default {
  directives: {
    TransferDom, Flexbox, FlexboxItem, Divider
  },
  data () {
    return {
      isTable: false, // 1.显示表格
      listData: '', // 1.数据
      pageIndex: 1, // 1.页码从第一页开始
      pageCount: 0, // 1.总页数
      totalCount: 0, // 1.总数量
      optionVal: 1, // 2.绑定下拉选项
      selectList: [{
                    // 2.下拉选项列表
        key: '0',
        value: '所有用户'
      },
      {
        key: '1',
        value: '游戏ID'
      }
      ],
      inputVal: '', // 2.搜索值
      isDetail: false, // 3.显示详情
      detailedData: '', // 3.详情数据
      sortUDindex: 2, // 4.切换排序
      bgImg: ['up', 'down'], // 4.切换图片
      imgIndex: 1, // 4.图片索引
      sort: '-bind_at', // 4.排序规则
      placeholderVal: '请输入搜索值', // 5.动态输入提示
      isdisable: true, // 5.动态输入锁定
      starttime: '开始时间',
      endtime: '结束时间'
    }
  },
  mounted () {
        // ====================1.首次载入默认数据====================
    this.$store.state.headerTitle = '用户列表'
    // loadingTips('加载中')
    this.getList(true)
  },
  methods: {
        // ====================1.获取数据====================
    getList (isEmpty, isPullDown) {
      var _this = this
      var params = {
        isRole: 1,
        isAgency: 0,
        roleId: _this.optionVal == 1 ? _this.inputVal : '',
        parentNickname: _this.optionVal == 2 ? _this.inputVal : '',
        sort: _this.sort,
        page: _this.pageIndex
      }
      // lowerAgent(params)
      //           .then(res => {
      //             var list = ''
      //             list = res['items']
      //             loadMore(_this, list, res, isEmpty, isPullDown)
      //           })
      //           .catch(err => {
      //             _this.$vux.loading.hide()
      //           })
    },

        // ====================2.搜索====================
    sendSearch () {
      this.sort = '-bind_at'
      this.sortUDindex = 2
      this.pageIndex = 1
      this.getList(true)
    },

        // ====================3.详情====================
    openDetail (index) {
      var _this = this
      _this.detailedData = _this.listData[index]
      _this.isDetail = true
      console.log(this.$store.state.addAgentInfo)
      console.log(this.listData[index].role_id)
      this.$store.state.addAgentInfo.id = this.listData[index].role_id == '' ? '空' : this.listData[index].role_id
    },

        // ====================4.排序、上下加载====================
        // 排序
    sortUD (index) {
      var _this = this
      if (index === _this.sortUDindex) {
        _this.imgIndex = (_this.imgIndex + 1) % _this.bgImg.length
      } else {
        _this.imgIndex = 0
      }
      _this.sortUDindex = index
      if (_this.sortUDindex === '0') {
        _this.sort = _this.imgIndex === '0' ? 'role_id' : '-role_id'
      } else if (_this.sortUDindex === '1') {
        _this.sort = _this.imgIndex === '0' ? 'parent_nickname' : '-parent_nickname'
      } else if (_this.sortUDindex === '2') {
        _this.sort = _this.imgIndex === '0' ? 'cost_total' : '-cost_total'
      } else if (_this.sortUDindex === '3') {
        _this.sort = _this.imgIndex === '0' ? 'bind_at' : '-bind_at'
      }
      _this.getList(true)
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
    },
        // ====================5.根据时间查询收益====================
    changestarttime (time) {
      console.log(`${this.starttime} 00:00:00:000`)
    },
    changeendtime (time) {
      console.log(`${this.starttime} 00:00:00:000`)
    },
    incomeSearch () {

    },
    tobeAgent () {
      this.$router.push({name: 'addAgent'})
    }
  },
  activated () {
    this.$refs.scroller.reset()
  },

    // ====================5.监听层级,筛选框,图片====================
  watch: {
    optionVal (newVal, oldVal) {
      this.inputVal = newVal === 0 ? '' : this.inputVal
      this.isdisable = newVal === 0
      this.placeholderVal = newVal === 0 ? '点击查询查看所有' : '请输入搜索值'
    }
  },
  computed: {
    imgSrc () {
            // 计算图标地址
      return this.bgImg[this.imgIndex]
    }
  }
}
</script>

<style lang="scss">
#userlist {
    .weui-cells {
        margin-top: 0px;
    }
    /* 搜索框 */
    .ul-search {
        position: fixed;
        top: 50px;
        width: 100%;
        max-width: 980px;
        font-size: 13px;
        background-color: #fbf9fe;
        z-index: 2;
        .search {
            padding: 5px 0;
            height: 30px;
            >div:nth-of-type(1) {
                float: left;
                margin: 0 2%;
                width: 28%;
                height: 100%;
                text-align: center;
                .weui-cells {
                    border: 1px solid #D9D9D9;
                    &:before {
                        border-top: none;
                    }
                    &:after {
                        border-bottom: none;
                    }
                    .weui-select {
                        padding-right: 20px;
                        padding-left: 2px;
                        width: auto;
                        height: 28px;
                        line-height: 28px;
                        font-size: 13px;
                    }
                    .weui-cell__bd:after {
                        right: 10px;
                        border-width: 0px 2px 2px 0px;
                    }
                }
            }
            .vux-x-input {
                box-sizing: border-box;
                padding: 14px 5px;
                float: left;
                width: 42%;
                height: 100%;
                border: 1px solid #e9e9e9;
                background-color: #fff;
            }
            .weui-btn {
                margin: 0 2%;
                width: 22%;
                height: 100%;
            }
        }
        /* 表头 */
        .title {
            th {
                .weui-cells {
                    background-color: #f7f7f7;
                    &:before {
                        border-top: none;
                    }
                    &:after {
                        border-bottom: none;
                    }
                }
                .weui-select {
                    padding-right: 20px;
                    padding-left: 4px;
                    width: auto;
                    height: 38px;
                    line-height: 38px;
                    font-size: 13px;
                }
                .weui-cell__bd:after {
                    right: 10px;
                    border-width: 0px 2px 2px 0px;
                }
            }
            .vux-table {
                th {
                    width: 25%;
                    font-size: 13px;
                }
            }
        }
    }
    /* 表格区域  */
    .ul-table {
        width: 100%;
        height: 100%;
        padding-top: 79px;
        tr {
            td {
                padding: 8px 3px;
                width: 25%;
                font-size: 12px;
                text-align: center;
                line-height: normal;
            }
        }
    }
    /* 弹出详细框  */
    .ul-xdialog {
        position: relative;
        box-sizing: border-box;
        width: 90%;
        padding-bottom: 30px;
        max-height: 98%;
        border: 1px solid #c7c7c7;
        border-radius: 10px;
        background-color: #fff;
        .vux-x-icon {
            position: absolute;
            bottom: 3px;
            left: 50%;
            transform: translateX(-50%);
        }
        .search-income {
            margin: 0 2%;
            width: 96%;
            .vux-datetime {
                padding: 5px 5px;
                display: inline-block;
                width: 29%;
                font-size: 14px;
            }
            .weui-cell:before {
                display: none;
            }
            .weui-cell_access .weui-cell__ft {
                padding-right: 0;
                text-align: center;
                &:after {
                    display: none;
                }
            }
        }
        .table-income-title {
            font-size: 14px;
            line-height: 40px
        }
        .table-detail {
            font-size: 14px;
            tr {
                td:nth-of-type(1) {
                    padding-right: 20px;
                    width: 40%;
                    text-align: right;
                }
            }
        }
        .table-income-scroll {
            margin-top: 8px;
            height: 151px;
            max-height: 151px;
            overflow-y: auto;
        }
        .table-income {
            font-size: 12px;
            line-height: 30px;
            tr {
                td:nth-of-type(1) {
                    padding-right: 20px;
                    width: 50%;
                    text-align: right;
                }
            }
        }
    }
}

.vux-flexbox-item{
    text-align: center;
    button{
        width: 70%;
    }
}

</style>
