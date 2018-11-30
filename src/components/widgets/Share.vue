<template>
  <transition name="fade">
    <div class="share">
      <div class="background" @click="cancelShare()"></div>
      <div class="shareContent">
        <div class="list">
          <div class="item">
            <img src="../../public/img/bfh.png" width="60">
            <span>微信</span>
          </div>
          <div class="item">
            <img src="../../public/img/bfi.png" width="60">
            <span>微信朋友圈</span>
          </div>
          <div class="item">
            <img src="../../public/img/bfa.png" width="60">
            <span>QQ好友</span>
          </div>
          <div class="item">
            <img src="../../public/img/bfb.png" width="60">
            <span>QQ空间</span>
          </div>
        </div>
        <div class="list">
          <div class="item">
            <img src="../../public/img/bfg.png" width="60">
            <span>新浪微博</span>
          </div>
          <div class="item">
            <img src="../../public/img/bf7.png" width="60">
            <span>钉钉</span>
          </div>
          <div class="item">
            <img src="../../public/img/bfj.png" width="60">
            <span>有道云笔记</span>
          </div>
          <div class="item">
            <img src="../../public/img/bfk.png" width="60">
            <span>博客</span>
          </div>
        </div>
        <div class="cancel" @click="cancelShare()">取消</div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    methods: {
      cancelShare() {
        this.$emit('emit-share')
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .share
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: rgba(0, 0, 0, 0.3)
    z-index: 700
    transition: all 0.2s linear
    &.fade-enter, &.fade-leave-to
      transform: translateY(100%)
    &.fade-enter-to, &.fade-leave-to
      opacity: 0
    .background
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      z-index: 710
      // background: green
    .shareContent
      position: absolute
      left: 0
      bottom: 0
      padding-top: 10px
      width: 100%
      background: #f8f8f8
      z-index: 720
      .list
        display: flex
        width: 100%
        text-align: center
        .item
          flex: 1
          padding: 10px
          font-size: 10px
          span
            display: block
            margin-top: 10px
      .cancel
        margin-top: 10px
        width: 100%
        height: 46px
        line-height: 46px
        text-align: center
        font-size: 18px
        font-weight: bold
        background: #fff
</style>
