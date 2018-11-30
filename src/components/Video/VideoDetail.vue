<template>
  <transition name="fade">
    <div class="detail">
      <comment @emit-comment-login="login()" @emit-hideComment="commentFuc" v-show="isShowComment"></comment>
      <share @emit-share="showShare" v-show="isShare"></share>
      <div class="video">
        <video :src="data[index].mp4_url" width="100%" height="100%" :poster="data[index].cover" controls></video>
        <span class="back" @click="() => this.$router.go(-1)"></span>
      </div>
      <div class="contentWrapper" ref="contentList">
        <div>
          <div class="description">
            <div class="title" :class="{active: !isShowTitle}">
              <span class="name">{{data[index].title}}</span>
              <span class="icon" :class="{active: !isShowTitle}" @click="showTitle"></span>
              <span class="playCount">{{data[index].playCount|getNum}}次播放</span>
            </div>
            <div class="tag clearfix">
              <div class="extraTags" v-for="(item,indexs) in data[index].extraTags" :key="indexs" v-show="indexs < 3"><span>#&nbsp;{{item}}</span></div>
              <span class="icon activeIcon" @click="addCount(data[index])" v-if="'isPraise' in data[index]">{{data[index].voteCount}}</span>
              <span class="icon" @click="addCount(data[index])" v-else>赞</span>
            </div>
            <div class="user clearfix">
              <div class="fl" @click="login()">
                <img :src="data[index].videoTopic.topic_icons" alt="">
                <span class="tname" >{{data[index].videoTopic.tname}}</span>
                <span class="icon">+</span>
              </div>
              <div class="fr">
                <span class="share">分享</span>
                <i class="icon" @click="showShare"></i>
                <i class="icon" @click="showShare"></i>
              </div>
            </div>
          </div>
          <split></split>
          <div class="videoList1">
            <div class="videoItem1 border-1px" v-for="(item1,index1) in data" :key="index1" v-show="index !== index1" @click="changeIndex(index1)">
              <div class="desc">
                <div class="title">{{item1.title}}</div>
                <span class="tname">{{item1.videoTopic.tname}}<i>&nbsp;&nbsp;&nbsp;&nbsp;{{item1.playCount|getNum}}次播放</i></span>
              </div>
              <div class="Img">
                <img :src="item1.fullSizeImg" height="100%" width="100%">
              </div>
            </div>
          </div>
        </div>
        <div class="sendMessage">
          <div class="inp">
            <div class="comment" @click="commentFuc">写跟帖</div>
            <!-- <input type="text" :model="text"> -->
          </div>
          <div class="iconList">
            <span class="icon" @click="login()"><i class="count">{{data.tcount}}</i></span>
            <span class="icon"  @click="login()"></span>
            <span class="icon" @click="showShare"></span>
            <span class="icon" @click="showShare"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {Split, Comment, Share} from '../widgets'
  import {playNum} from '../../public/js/tools'
  import BScroll from 'better-scroll'
  export default {
    created() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.contentList, {
          click: true
        })
      })
    },
    data() {
      return {
        data: this.$route.params.video,
        index: this.$route.params.indexs,
        isShowTitle: false,
        isShowComment: false,
        isShare: false
      }
    },
    methods: {
      changeIndex(index) {
        this.index = index
      },
      showTitle() {
        this.isShowTitle = !this.isShowTitle
      },
      login() {
        this.$emit('emit-Parent')
      },
      addCount(item) { // 点赞功能
        // console.log(item)
        // 往对象中添加显示对应的 点赞的属性 数字++
        if (!item.isPraise) {
          this.$set(item, 'isPraise', true)
          item.voteCount += 1
        }
      },
      commentFuc() {
        this.isShowComment = !this.isShowComment
      },
      showShare() {
        this.isShare = !this.isShare
      }
    },
    filters: {
      getNum(val) {
        return playNum(val)
      }
    },
    components: {
      Split,
      Comment,
      Share
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../../public/scss/mixin'
  .detail
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #fff
    color: #333
    z-index: 800
    transition: all 0.2s linear
    &.fade-enter, &.fade-leave-to
      transform: translateX(100%)
    .video
      position: absolute
      top: 0
      left: 0
      right: 0
      width: 100%
      height: 202px
      overflow: hidden
      background: rgba(0, 0, 0, 0.4)
      .back
        display: block
        position: absolute
        top: 14px
        left: 15px
        height: 44px
        width: 100%
        background: url(../../public/img/ajy.png) no-repeat
        background-size: 24px auto
    .contentWrapper
      position: absolute
      top: 202px
      left: 0
      right: 0
      bottom: 44px
      overflow: hidden
      .description
        padding: 10px 12px 0 10px
        .title
          box-sizing: border-box
          position: relative
          padding-right: 24px
          width: 100%
          text-overflow: -o-ellipsis-lastline
          overflow: hidden
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
          line-height: 24px
          .name
            display: block
            padding-bottom: 4px
            font-size: 18px
            font-weight: bold
          .icon
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 24px
            background: green
            background: url(../../public/img/a8l.png) no-repeat center
            background-size: 12px auto
            &.active
              background: url(../../public/img/a8m.png) no-repeat center
              background-size: 12px auto
          .playCount
            position: relative
            display: block
            padding-left: 8px
            font-size: 10px
            color: #7d7d7d
            &:after
              position: absolute
              top: 8px
              left: 0
              content: ''
              height: 0
              width: 0
              display: block
              border: 3px solid #999
              border-left-width: 6px
              border-right: none
              border-top-color: transparent
              border-bottom-color: transparent
        .active
          height: 25px
          overflow: hidden
        .tag
          margin-top: 14px
          width: 100%
          .extraTags
            display: inline-block
            text-align: left
            span
              margin-right: 2px
              padding: 5px 10px
              font-size: 12px
              vertical-align: middle
              border-radius: 20px
              background: #f5f7f9
              color: #666
          .icon
            // position: relative
            padding: 2px 22px 2px 40px
            float: right
            border-left: 1px solid #edeff3
            text-align: center
            font-size: 12px
            background: url('../../public/img/bcd.png') no-repeat 20px center
            background-size: 18px auto
            &.count
            &.activeIcon
              font-size: 12px
              color: #EE1A1A
              background: url('../../public/img/bce.png') no-repeat 20px center
              background-size: 18px auto
        .user
          padding: 15px 0 15px 0
          overflow: hidden
          .fl
            margin-top: 7px
            img
              width: 24px
              width: 24px
              vertical-align: middle
              border-radius: 50%
              border: 1px solid #f0f0f0
            .tname
              font-size: 12px
            .icon
              display: inline-block
              margin-left: 20px
              width: 36px
              height: 24px
              line-height: 24px
              text-align: center
              vertical-align: middle
              font-size: 20px
              color: #fff
              border-radius: 20px
              background: #ed1a1a
          .fr
            .share
              font-size: 12px
              display: inline-block
              height: 40px
              width: 40px
              line-height: 40px
              text-align: center
              vertical-align: top
            i.icon
              display: inline-block
              width: 40px
              height: 40px
              margin-left: 0px
              background: url(../../public/img/bfi.png) no-repeat
              background-size: 40px auto
              &:last-child
                background: url(../../public/img/bfh.png) no-repeat
                background-size: 40px auto
      .videoList1
        .videoItem1
          display: flex
          padding: 12px 12px 11px 10px
          @include border-1px(#edeff3)
          .desc
            flex: 1
            padding-right: 20px
            color: #333
            .title
              margin-bottom: 10px
              width: 100%
              text-overflow: -o-ellipsis-lastline
              overflow: hidden
              text-overflow: ellipsis
              display: -webkit-box
              -webkit-line-clamp: 2
              -webkit-box-orient: vertical
              max-height: 46px
              line-height: 24px
              font-size: 18px
            .tname
              font-size: 10px
              color: #b4b4b4
          .Img
            flex: 0 0 112px
            width: 120px
            overflow: hidden
            height: 70px
            border: 1px solid #ab9c90
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
