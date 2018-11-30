<template>
  <transition name="fade">
    <div class="talkDetail">
      <comment v-show="isComment" @emit-hideComment="commentFuc" @emit-comment-login="isLogin"></comment>
      <share v-show="isShare" @emit-share="showShare()"></share>
      <div class="header">
        <div class="userImg fl">
          <span class="back" @click="backTalkView()"></span>
        </div>
        <div class="select fr">
          <i class="follow" @click="login()">关注</i>
          <span class="menu"></span>
        </div>
      </div>
      <div class="content" ref="conScroll">
        <div>
          <div class="news">
            <div class="top">
              <div class="name">{{detail.name}}</div>
                <div class="picurl">
                  <img :src="detail.picurl" width="100%">
                </div>
                <div class="alias"><i class="icon"></i>{{detail.alias}}</div>
            </div>
            <div class="bottom">
              <div class="icon" @click="addCount()">
                <div v-if="detail.isPraise">
                  <img src="../../public/img/atj.png" width="20">
                  <span style="color: #EE1A1A">{{detail.concernCount}}</span>
                </div>
                <div v-else>
                  <img src="../../public/img/ati.png" width="20">
                  <span>{{detail.concernCount}}</span>
                </div>
              </div>
              <div class="icon" @click="commentFuc">
                <img src="../../public/img/bck.png" width="18">
                <span>{{detail.talkCount}}</span>
              </div>
              <div class="icon" @click="showShare()">
                <img src="../../public/img/axz.png" width="18">
                <span>分享</span>
              </div>
            </div>
          </div>
          <split></split>
          <ul class="comment">
            <div class="head clearfix">
              <span class="fl" v-for="(item,index) in detail.talkContent" :key="index" v-show="index < 1">{{detail.talkContent.length}}条评论</span>
              <div class="select fr">
                <span :class="{active: !isSelect}" @click="() => this.isSelect = !this.isSelect">最热</span>
                <span :class="{active: isSelect}" @click="() => this.isSelect = !this.isSelect">最新</span>
              </div>
            </div>
            <li class="commentItem" v-for="(item,index) in detail.talkContent" :key="index">
              <div class="user">
                <div class="img">
                  <img :src="item.userHeadPicUrl" width="22">
                </div>
                <span class="talkId">{{item.talkId}}</span>
                <i class="praise" :class="{active: item.hasOwnProperty('isPraise')}" @click="commentPraise(index)">{{item.concernCount}}</i>
              </div>
              <div class="text">{{item.content}}</div>
            </li>
            <div class="tip">已加载全部评论</div>
          </ul>
        </div>
      </div>
      <div class="sendComment">
        <div class="text" @click="commentFuc">写评论</div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import {Split, Share, Comment} from '../widgets'
  export default {
    created() {
      this.$nextTick(() => {
        this.contentScroll = new BScroll(this.$refs.conScroll, {
          click: true,
          bounce: false
        })
      })
    },
    props: {
      detail: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        isShare: false,
        isSelect: false,
        isComment: false
      }
    },
    methods: {
      backTalkView() {
        this.$emit('emit-isShow')
      },
      showShare() {
        this.isShare = !this.isShare
      },
      login() {
        this.$emit('emit-isLogin')
      },
      addCount(index) { // 添加点赞功能
        // console.log(this.talkData.subjectList[index])
        if (this.detail.isPraise) {
          // 删除 对应的 点赞的属性 数字--
          this.$delete(this.detail, 'isPraise', false)
          this.detail.concernCount--
        } else {
          // 往对象中添加显示对应的 点赞的属性 数字++
          this.$set(this.detail, 'isPraise', true)
          this.detail.concernCount++
        }
      },
      commentPraise(index) { // 一次点赞
        // console.log(this.detail.talkContent[index])
        if (this.detail.talkContent[index].isPraise) {
          return 0
        } else {
          this.$set(this.detail.talkContent[index], 'isPraise', true)
          this.$set(this.detail.talkContent[index], 'concernCount', 0)
          this.detail.talkContent[index].concernCount++
        }
      },
      commentFuc() {
        this.isComment = !this.isComment
      },
      isLogin() {
        this.$emit('emit-isLogin')
      }
    },
    components: {
      Split,
      Share,
      Comment
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../../public/scss/mixin'
  .talkDetail
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #fff
    z-index: 500
    transition: all 0.2s linear
    &.fade-enter, &.fade-leave-to
      transform: translateX(100%)
    .header
      position: fixed
      top: 0
      left: 0
      right: 0
      height: 50px
      padding: 0 12px
      .back
        display: inline-block
        margin-top: 14px
        width: 12px
        height: 20px
        background: url(../../public/img/a8k.png) no-repeat
        background-size: 10px auto
      .select
        .follow
          padding: 4px 15px
          font-size: 14px
          color: #393939
          border: 1px solid #eee
          border-radius: 20px
        .menu
          display: inline-block
          margin: 0 0 2px 10px
          width: 16px
          height: 10px
          background: url(../../public/img/ai2.png) no-repeat
          background-size: 16px auto
    .content
      position: fixed
      top: 50px
      bottom: 50px
      left: 0
      right: 0
      padding-bottom: 20px
      overflow: hidden
      .news
        padding: 0 12px
        .name
          padding: 20px 0
          font-size: 18px
          font-weight: bold
          text-align: center
        .feature
          font-size: 12px
          color: #d8d8d8
        .picurl
          padding-top: 8px
        .alias
          padding: 15px 0
          line-height: 25px
          color: #1b88ee
          .icon
            display: inline-block
            width: 20px
            height: 16px
            background: url(../../public/img/awm.png) no-repeat center
            background-size: 16px auto
        .bottom
          display: flex
          padding: 12px 0
          width: 100%
          text-align: center
          font-size: 0
          .icon
            flex: 1
            display: inline-block
            font-size: 12px
            color: #7f7f7f
            img
              vertical-align: middle
      .comment
        .head
          padding: 22px 10px
          font-size: 18px
          font-weight: 500
          color: #333
          .select
            span
              color: #b4b4b4
              &.active
                color: #333
              &:first-child
                display: inline-block
                padding-right: 10px
                border-right: 1px solid #b4b4b4
              &:last-child
                display: inline-block
                padding-left: 6px
        .commentItem
          padding: 0 10px
          @include border-1px(#edeff3)
          .user
            .img
              display: inline-block
              margin-bottom: 4px
              width: 22px
              height: 22px
              vertical-align: middle
              overflow: hidden
              border: 1px solid #eee
              border-radius: 50%
              background: url(../../public/img/night_afz.png) no-repeat
              background-size: 22px auto
            .talkId
              font-size: 14px
            .praise
              float: right
              margin-top: 4px
              width: 24px
              height: 16px
              line-height: 16px
              font-size: 12px
              color: #b4b4b4
              background: url(../../public/img/ati.png) no-repeat 8px 0
              background-size: 16px auto
            .active
              background: url(../../public/img/atj.png) no-repeat 8px 0
              background-size: 16px auto
          .text
            padding: 8px 30px 10px
            font-size: 18px
            line-height: 24px
        .tip
          padding: 20px 0
          text-align: center
          font-size: 18px
          color: #b4b4b4
    .sendComment
      position: fixed
      left: 0
      right: 0
      bottom: 0
      height: 32px
      padding: 4px 12px 8px 12px
      background: #fff
      .text
        box-sizing: border-box
        padding: 8px 10px
        width: 100%
        font-size: 14px
        outline: none
        border: 1px solid #e8e8e8
        border-radius: 22px
        color: #b2b2b2
</style>
