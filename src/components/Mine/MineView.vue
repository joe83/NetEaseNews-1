<template>
  <div class="mine" ref="mineScroll">
    <div class="mineWrapper">
      <div class="header clearfix">
        <div class="flBtn">夜间</div>
        <div class="frBtn">签到</div>
      </div>
      <div class="loginIcon">
        <a class="icon" @click="login()"><img src="../../public/img/bed.png" width="40"></a>
        <a class="icon" @click="login()"><img src="../../public/img/bef.png" width="40"></a>
        <a class="icon" @click="login()"><img src="../../public/img/beg.png" width="40"></a>
        <a class="icon" @click="login()"><img src="../../public/img/bee.png" width="40"></a>
        <a class="icon" @click="login()"><img src="../../public/img/beb.png" width="40"></a>
      </div>
      <div class="loginBtn">
        <span class="text" @click="login()">登陆/注册</span>
      </div>
      <div class="see">
        <div class="item" @click="login()">跟帖</div>
        <div class="item" @click="login()">收藏</div>
        <div class="item">历史</div>
      </div>
      <split></split>
      <div class="mineList">
        <div class="item border-1px">
          <span class="title fl">我的消息</span>
          <span class="btn fr">评论/通知&nbsp;<i class="icon icon-gt"></i></span>
        </div>
        <div class="item border-1px" @click="login()">
          <span class="title fl">我的已购</span>
          <span class="btn fr">购买的课程/直播&nbsp;<i class="icon icon-gt"></i></span>
        </div>
        <split></split>
        <div class="item border-1px">
          <span class="title fl">金币任务</span>
          <span class="btn fr">&nbsp;<i class="icon icon-gt"></i></span>
        </div>
        <div class="item border-1px">
          <span class="title fl">金币商城</span>
          <span class="btn fr" style="color: #eb413d">嘿！你的500金币，在这里&nbsp;<i class="icon icon-gt"></i></span>
        </div>
        <div class="item border-1px">
          <span class="title fl">京东特供</span>
          <span class="btn fr">新人领188元红包&nbsp;<i class="icon icon-gt"></i></span>
        </div>
        <div class="item border-1px"  @click="login()">
          <span class="title fl">我的钱包</span>
          <span class="btn fr">&nbsp;<i class="icon icon-gt"></i></span>
        </div>
        <split></split>
        <div class="item border-1px">
          <span class="title fl">免流量看新闻</span>
          <span class="btn fr">扫一扫&nbsp;<i class="icon icon-gt"></i></span>
        </div>
        <div class="item border-1px">
          <span class="title fl">设置</span>
          <span class="btn fr">&nbsp;<i class="icon icon-gt"></i></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { Split } from '../widgets'
  export default {
    created() {
      this.$nextTick(() => {
        this.mineScroll = new BScroll(this.$refs.mineScroll, {
          click: true,
          bounce: false
        })
      })
    },
    methods: {
      login() {
        // this.$router.push('/login')
        this.$emit('emit-login')
        // console.log('123')
      }
    },
    components: {
      Split
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss">
  @import '../../public/scss/mixin'
  .mine
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 44px
    overflow: hidden
    .header
      margin-top: 20px
      padding: 18px 16px
      height: 30pxs
      .flBtn, .frBtn
        float: left
        height: 30px
        line-height: 30px
        padding: 0 13px 0 30px
        font-size: 14px
        color: #333
        border: 1px solid #eee
        border-radius: 13px
        background: url(../../public/img/night.png) no-repeat 7px 7px
        background-size: 15px auto
      .frBtn
        float: right
        background: url(../../public/img/beo.png) no-repeat 6px 6px
        background-size: 18px auto
    .loginIcon
      display: flex
      width: 100%
      height: 46px
      line-height: 46px
      text-align: center
      .icon
        flex: 1
        display: block
    .loginBtn
      width: 100%
      height: 50px
      line-height: 50px
      text-align: center
      .text
        display: inline-block
        width: 106px
        height: 28px
        line-height: 28px
        font-size: 14px
        color: #fff
        border-radius: 14px
        background: #ee1a1a
    .see
      display: flex
      margin-bottom: 26px
      width: 100%
      height: 64px
      font-size: 12px
      text-align: center
      .item
        flex: 1
        margin: 12px 0
        padding-top: 36px
        color: #9d9d9d
        background: url(../../public/img/bck.png) no-repeat top center
        background-size: auto 25px
        &:nth-child(2)
          background: url(../../public/img/amu.png) no-repeat top center
          background-size: auto 26px
        &:last-child
          background: url(../../public/img/bea.png) no-repeat top center
          background-size: auto 25px
    .mineList
      .item
        margin: 0 22px
        height: 58px
        line-height: 58px
        font-size: 14px
        color: #333
        @include border-1px(#edeff3)
        .btn
          color: #9d9d9d
          .icon
            font-size: 10px
            font-weight: 700
            vertical-align: middle
</style>
