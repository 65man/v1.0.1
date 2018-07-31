<template>
  <div class="login-container">
    <!-- 头部 -->
    <div class="login-header">
      <h1>代理商管理系统(金币)</h1>
    </div>

    <!-- 登录框 -->
    <div class="login-from">
      <div class="from">
        <!-- <group label-width="4em" label-margin-right="1em" label-align="right"> -->
          <!-- 用户名 -->
          <div class="form-username">
            <x-input title="账号" placeholder="请输入账号" v-model="userName" :max="11">
            </x-input>
          </div>

          <!-- 密码 -->
          <div class="form-password">
            <x-input title="密码" type="password" placeholder="请输入密码" v-model="password" :mix="6" :max="12" @keyup.13.native="userLogin()"
            :should-toast-error='false' ></x-input>
          </div>

          <!-- 用户选项 -->
          <div class="from-options">
            <!-- <div class="remmber-pwd">
              <input type="checkbox" id="remmber-pwd">
              <label for="remmber-pwd">记住密码</label>
            </div> -->
            <div class="user-argument">
              <input type="checkbox" id="user-argument"  v-model="selectedArg">
              <label for="user-argument">我已阅读并同意</label>
              <a href="#" @click="toggleArg">《合作协议》</a>
            </div>
          </div>
        <!-- </group> -->

        <!-- 登录按钮 -->
        <x-button type="primary" class="normal-login" action-type="button" @click.native="userLogin">登录</x-button>
        <x-button type="primary" class="wechat-login" action-type="button" @click.native="weChatLogin">使用微信登录</x-button>

      </div>
    </div>

    <!-- 协议 -->
    <div class="user-argument">
        <x-dialog v-model="showArg" :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}">
          <div class="show-arg">
            <div class="arg-box">
            <h3>推广员/代理须知</h3>
              <p>我们公司是一家从事网络游戏设计、开发、制作的专业网络公司，具备丰富的网络运营经验及雄厚的互联网技术支持，现独立开发运行的游戏，以其精良的游戏制作、趣味性及互动性，已在当地市场取得建立了良好的市场基础及群众口碑。为开拓市场及扩大产品影响力，公司决定在本协议指定区域内进行市场推广选择了部分代理，为保障公司的平稳运行、促进双方的良好合作、保证项目的合法推广、避免法律纠纷及其他法律风险，特将该《协议》下发给代理，各代理务必认真学习及遵循《协议》精神，做到规范经营、依法行事，不得自误。内容如下：</p>
              <p>1、本公司所运营的游戏是一款旨在增进玩家感情、丰富市民业余生活的网络游戏，该游戏倡导的理念是"快乐游戏、健康生活"，这了游戏理念与公司的经营理念是完全一致的，即我公司及我公司推出的一切网络文化产品均是绿色、健康、合法的！因此，代理必须秉承这一经营宗旨，把握正确方向。注意维护企业及游戏品牌形象。</p>
              <p>2、我们游戏作为一款对抗性及竞技性游戏，必将秉承"游戏中是对手，生活中是朋友"这一游戏精神，代理应在游戏中宣传及引导这一理念，避免玩家中出现谩骂、侮辱甚至是斗殴等恶性事件，从而使社会公众及主流舆论对本公司产生误解。</p>
              <p>3、我公司运营的游戏，玩家进行游戏时评判输赢的只有当局积分，代理不得设置虚拟货币、回购或默许第三方回购及其他一切可能将游戏中的输赢和现实货币、财物进行兑换的行为。</p>
              <p>4、我公司的代理，并非公司员工，代理不得利用公司名义进行任何超出权限的商业活动或进行给公司带来负面影响的其他社会活动!</p>
              <p>5、代理在进行网络推广活动时，必须依照有关法律规定及公司政策行事，不得利用、引导或许可他人利用我们游戏从事赌博及其他为违法犯罪活动，否则一经发现，立即解除合作关系，并视情节轻重上报有关机关处理，决不姑息!</p>
              <p>6、代理有权雇佣或通过其他合作关系组建营销团队，营销团队成员并非公司员工，其与玩家的法律关系由双方自行商议决定，公司不予干涉，但代理必须保证团队其他成员必须严格按照法律规定、协议约定及本《协议》内容开展业务活动，否则因此产生的一切后果由代理承担。</p>
              <p>7、代理及其营销团队成员必须正面引导玩家健康游戏，对于发现有玩家或其他平台或机构利用我们从事赌博及其他为违法犯罪活动的，必须立即阻止，并向公司上报，情节严重的，公司有权向有关单位报案，代理有义务向公司提供有关证明材料，以便有关单位依法处理。</p>
              <p>8、我们游戏官方认可的唯一游戏道具为"钻石"，该道具仅用于玩家进入房间游戏之用，不得用于其他用途，推代理也不得向玩家收取其他游戏费用，发现玩家利用道具开展赌博或其他违法犯罪活动的，推广员/代理应拒绝发放钻石或向公司报告终止游戏。</p>
              <p>9、代理及玩家利用本游戏从事的任何违法犯罪活动与本公司无关，因此引发的一切法律后果，由其自行承担，因此给公司造成损失的，公司保留诉讼权利。望周知遵循！！！</p>
            </div>
            <div class="arg-btn">
              <x-button type="primary" mini action-type="button" @click.native="toggleArg">我已阅读并同意以上条款</x-button>
            </div>
          </div>
        </x-dialog>
      </div>
  </div>
</template>

<script>
import { toastTips, alertTips } from '@/utils/messageTips.js'
import { TransferDomDirective as TransferDom } from 'vux'
import { loginByUserName } from '@/api/api.js'
export default {
  directives: {
    TransferDom
  },
  data () {
    return {
      userName: '',
      password: '',
      // 是否显示协议
      showArg: false,
      // 是否勾选协议
      selectedArg: true,
      // 登录的类型
      type: ''
    }
  },
  methods: {
    userLogin () {
      // 检测用户信息是否填写完整
      if (this.userName === ' ' || this.password === '') {
        toastTips('text', '10em', '请输入完整登录信息')
        return false
      }

      // 检测是否同意协议
      if (this.selectedArg !== true) {
        toastTips('text', '12em', '需阅读并同意合作协议')
        return false
      }

      // 建立代理关系
      // alertTips('当前微信号未建立代理关系，请先建立代理关系')

      loginByUserName('username', this.userName, this.password).then(res => {
        this.$store.token = res.bearer
        console.log(res)
      })
      // 判断是不是首次登录
      // this.$router.push({path: 'layout/loginFirst'})
    },
    toggleArg () {
      this.showArg = !this.showArg
    },
    weChatLogin () {
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        window.location.href =
                    'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8513a40d3d6a961e&redirect_uri=https%3a%2f%2fm.cs.qp.gzzhongw.net%2floading&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect'
      } else {
        window.location.href =
                    'https://open.weixin.qq.com/connect/qrconnect?appid=wx691c6a6d3c48a13b&redirect_uri=https%3a%2f%2fm.cs.qp.gzzhongw.net%2floading&response_type=code&scope=snsapi_login&state=2#wechat_redirect'
      }
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss">
.login-container{
  position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-height: 500px;
    background: url('../../assets/img/bg.jpg') no-repeat;
    background-size: 100% 100%;
    .login-header{
      position: relative;
      top: 0;
      height: 35%;
      width: 100%;
      text-align: center;
      color: #fff;
      h1{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
      }
    }
    .login-from{
      position: relative;
      width: 100%;
      height: 50%;
      min-height: 252px;
      .from{
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 80%;
        max-width: 500px;
        height: 100%;
        .form-username{
          font-size: 14px;
          background: #fff;
        }
        .form-password{
          margin-top: 10px;
          font-size: 14px;
          background: #fff;
        }
        .from-options{
          margin-top: 10px;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          input[type="checkbox"] {
          margin-top: -2px;
          width: 15px;
          height: 15px;
          vertical-align: middle;
        }
          .remmber-pwd{
            float: left;
          }
          .user-argument{
            float: left;
          }
        }
        .normal-login{
          margin-top: 10px;
          background: linear-gradient(-45deg, #1574a2, #1e679c);
        }

      }
    }
    .user-argument{
      .show-arg{
        position: relative;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 15px 15px 50px 15px;
        width: 90%;
        height: 90%;
        background-color: #fff;
        // z-index: 2;
        margin: 0 auto;

        position: fixed;
        z-index: 5000;
        // width: 80%;
        // max-width: 300px;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: #FFFFFF;
        text-align: center;
        // border-radius: 3px;
        overflow: hidden;
        .arg-box{
          width: 100%;
          height: 100%;
          overflow: auto;
          h3{
            text-align: center;
          }
          p{
            font-size: 14px;
            text-align: left;
            padding: 2px;
          }
        }
        .arg-btn{
          margin-top: 10px;
        }
      }
    }
}
</style>



