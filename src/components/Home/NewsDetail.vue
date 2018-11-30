<template>
  <transition name="fade">
    <div class="newsDetail">
      <comment @emit-hideComment="commentFuc" @emit-comment-login="login()" v-show="isComment"></comment>
      <share @emit-share="showShare" v-show="isShare"></share>
      <div class="header">
        <div class="icon fl" @click="() => this.$router.go(-1)"></div>
        <div class="tcount fr" @click="login()">{{data.tcount}}跟帖</div>
      </div>
      <div class="content" ref="scroll">
        <div>
          <div class="contentView">
             <div class="title">{{data.title}}</div>
             <div class="author">{{data.source}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="tiem">{{data.ptime}}</span></div>
             <div class="text">{{data.digest}}</div>
             <div class="img" v-for="(item,index) in data.picInfo" :key="index">
               <img :src="item.url" width="100%">
             </div>
          </div>
        </div>
      </div>
      <div class="sendMessage">
        <div class="inp" @click="commentFuc">
          <div class="comment">写跟帖</div>
        </div>
        <div class="iconList">
          <span class="icon" @click="login()"><i class="count">{{data.tcount}}</i></span>
          <span class="icon"  @click="login()"></span>
          <span class="icon" @click="showShare"></span>
          <span class="icon" @click="showShare"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import {Comment, Share} from '../widgets'
  export default {
    created() {
      this.$nextTick(() => {
        this.conentScroll = new BScroll(this.$refs.scroll, {
          click: true
        })
      })
    },
    data() {
      return {
        data: this.$route.params,
        isComment: false,
        isShare: false
      }
    },
    methods: {
      login() {
        this.$emit('emit-login')
      },
      commentFuc() {
        this.isComment = !this.isComment
      },
      showShare() {
        this.isShare = !this.isShare
      }
    },
    components: {
      Comment,
      Share
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss">
  .newsDetail
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 400
    background: #fff
    transition: all 0.3s linear
    &.fade-enter, &.fade-leave-to
      transform: translateX(100%)
    .header
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 47px
      .icon
        margin: 15px 0 0 15px
        width: 10px
        height: 18px
        background: url(../../public/img/a8k.png) no-repeat
        background-size: auto 18px
      .tcount
        margin: 11px 18px 0 0
        padding: 0 8px
        height: 24px
        line-height: 24px
        text-align: center
        font-size: 12px
        font-weight: 400
        color: #f35858
        border: 1px solid #f35858
        border-radius: 18px
    .content
      position: absolute
      top: 47px
      left: 0
      right: 0
      bottom: 44px
      padding: 0 11px
      overflow: hidden
      .contentView
        margin-top: 12px
        .title
          padding: 0 11px
          line-height: 34px
          font-size: 24px
          font-weight: 700
        .author
          margin: 10px 11px 0
          font-size: 12px
          color: #ccc
        .text
          margin: 24px 11px 0
          line-height: 26px
          font-size: 18px
          font-weight: normal
          color: #333
          text-align: justify
        .img
          margin: 30px 0
          text-align: center
    .sendMessage
      box-sizing: border-box
      display: flex
      position: fixed
      left: 0
      bottom: 0
      width: 100%
      height: 44px
      line-height: 44px
      padding: 0 11px
      .inp
        position: relative
        width: 60%
        display: inline-block
        .comment, input
          box-sizing: border-box
          position: absolute
          top: 0
          left: 0
          width: 100%
          margin-top: 8px
          padding-left: 10px
          width: 100%
          height: 26px
          line-height: 26px
          font-size: 14px
          color: #b2b2b2
          border: 1px solid #eee
          border-radius: 24px
        input
          background-color: transparent
          border: 0
          outline: none
      .iconList
        display: inline-block
        margin-top: 2px
        width: 40%
        text-align: right
        .icon
          display: inline-block
          width: 18px
          height: 18px
          padding-left: 8%
          &:nth-of-type(1)
            position: relative
            background: url(../../public/img/b0n.png) no-repeat
            background-size: 18px auto
            i.count
              position: absolute
              display: inline-block
              left: 8px
              top: -4px
              height: 14px
              line-height: 14px
              font-size: 10px
              color: #777
              background: #fff
          &:nth-of-type(2)
            background: url(../../public/img/night_ak2.png) no-repeat
            background-size: 18px auto
          &:nth-of-type(3)
            background: url(../../public/img/akn.png) no-repeat
            background-size: 18px auto
          &:nth-of-type(4)
            background: url(../../public/img/ai2.png) no-repeat
            background-size: 18px auto
</style>
