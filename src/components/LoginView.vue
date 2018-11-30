<template>
  <transition name="fade">
    <div class="login" v-show="isClose" ref='loginScroll'>
      <div>
        <div class="closeIcon" @click="closeLogin">
          <img src="../public/img/getui_popup_close.png" width="16">
        </div>
        <div class="logoIcon">
          <img src="../public/img/al4.png" width="73">
        </div>
        <div class="loginContent">
          <div class="title">手机号码快速登录</div>
          <div class="inputArea">
            <div class="tip">手机号</div>
            <label><input type="text"></label>
            <span class="code">获取验证码</span>
          </div>
          <div class="inputArea">
            <div class="tip">验证码</div>
            <label><input type="text"></label>
          </div>
          <div class="loginBtn">开始使用</div>
          <div class="otherLogin">
            <span class="icon fl">邮箱帐号登录</span>
            <span class="fr">手机号注册</span>
          </div>
        </div>
        <div class="footer">
          <div class="icon">
            <img src="../public/img/ald.png" width="48">
            <img src="../public/img/alb.png" width="48">
            <img src="../public/img/ajc.png" width="48">
            <img src="../public/img/alf.png" width="48">
          </div>
          <div class="server">登录即代表您已阅读并同意&nbsp;<span>服务条款</span>&nbsp;和&nbsp;<span>隐私政策</span></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    created() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.loginScroll, {
          click: true
        })
      })
    },
    data() {
      return {
        isClose: true
      }
    },
    methods: {
      closeLogin() {
      //   this.isClose = !this.isClose
      //   // 延迟500毫秒跳转到mine页面
      //   setTimeout(() => {
      //     this.$router.push('mine')
      //   }, 500)
        this.$emit('emit-login')
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../public/scss/mixin'
  .login
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    overflow: hidden
    background: #fff
    z-index: 10000
    transition: all 0.3s linear
    &.fade-enter, &.fade-leave-to
      transform: translateY(100%)
    .closeIcon
      margin: 8px 0 8px 14px
      width: 16px
      height: 16px
    .logoIcon
      text-align: center
      padding: 8px 0
      margin-bottom: 56px
    .loginContent
      margin: 0 24px
      color: #333
      .title
        margin-bottom: 8px
        height: 28px
        line-height: 28px
        font-size: 18px
        font-weight: bolder
      .inputArea
        position: relative
        height: 78px
        @include border-1px(#e5e5e5)
        .tip, label
          position: absolute
          left: 0
          bottom: 0
          margin: 10px 0
          width: 100%
          height: 25px
          line-height: 25px
        label
          input
            height: 25px
            background-color: transparent
            outline: none
            border: 0
        .code
          position: absolute
          right: 0
          bottom: 10px
          width: 77px
          height: 25px
          line-height: 25px
          text-align: center
          font-size: 12px
          color: #ccc
          border: 1px solid #edeff3
          border-radius: 12px
      .loginBtn
        margin: 20px auto
        width: 100%
        height: 40px
        line-height: 40px
        text-align: center
        border-radius: 20px
        color: #fff
        background: #fababa
      .otherLogin
        width: 100%
        height: 21px
        line-height: 21px
        font-size: 14px
        font-weight: bolder
        .icon
          padding-left: 15px
          background: url(../public/img/aj9.png) no-repeat left center
          background-size: auto 10px
    .footer
      margin: 44px 0 20px 0
      width: 100%
      text-align: center
      .icon
        margin: 4px 0 20px 0
        img
          margin: 0 2%
      .server
        font-size: 12px
        color: #ccc
        span
          text-decoration: underline
</style>
