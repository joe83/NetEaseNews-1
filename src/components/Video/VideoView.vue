<template>
  <div class="video">
    <router-view @emit-Parent="login()"></router-view>
    <div class="videoNav" ref="videoNav">
      <ul>
        <li class="videoItem">
            <span class="active">推荐</span>
        </li>
      </ul>
    </div>
    <loading v-show="!video.length"></loading>
    <div v-show="video.length">
      <div class="videoList" ref="videoScroll">
        <ul>
          <li class="videoItems" v-for="(items,indexs) in getVideoData" :key="indexs">
              <!-- <video src="http://flv3.bn.netease.com/videolib1/1810/19/LeFdu985K/SD/LeFdu985K-mobile.mp4" controls=""></video> -->
              <div class="vid">
                <video :src="items.mp4_url" controls width="100%" height="100%" :poster="items.cover"></video>
                <div class="msk" v-show="currentIndex !== indexs" @click="hasVideo(indexs)">
                  <div class="title">{{items.title}}</div>
                  <div class="playCount">{{items.playCount|getNum}}次播放量</div>
                </div>
              </div>
              <div class="user">
                <div class="content" @click="toDetail(video,indexs)">
                  <div class="userDetail">
                    <img :src="items.videoTopic.topic_icons">
                    <div class="name">{{items.videoTopic.tname}}</div>
                  </div>
                  <div class="videoTag" v-for="(list, index) in items.videoTag" :key="index">
                    <div v-show="list">#&nbsp;{{list}}</div>
                  </div>
                </div>
                <div class="menu">
                  <span class="icon active" v-if="'isPraise' in items" style="color: red"><i class="count" style="color: #EE1A1A">{{items.voteCount}}</i></span>
                  <span class="icon" @click="addCount(indexs)" v-else><i class="count">{{items.voteCount}}</i></span>
                  <span class="icon" v-show="items.replyCount" @click="toDetail(video,indexs)"><i class="count">{{items.replyCount}}</i></span>
                  <span class="icon" v-show="items.replyCount == 0" @click="toDetail(video,indexs)"></span>
                  <span class="icon"></span>
                </div>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {playNum} from '../../public/js/tools'
  import BScroll from 'better-scroll'
  import {Loading} from '../widgets'

  export default {
    created() {
      this.$nextTick(() => {
        this.axios.get('http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&size=20')
          .then(res => {
            // console.log(res.data)
            this.video = res.data['视频']
            // console.log(this.video)
            // this.navScroll = new BScroll(this.$refs.videoNav, {
            //   click: true,
            //   scrollX: true,
            //   bounce: false
            // })
            if (this.getVideoData.length) {
              this.videoScroll = new BScroll(this.$refs.videoScroll, {
                click: true,
                bounce: false
              })
            }
          })
      })
    },
    data() {
      return {
        video: [],
        videData: this.video,
        currentIndex: -1,
        nowIndex: -1,
        isRem: true
      }
    },
    computed: {
      getVideoData() {
        let arr = []
        if (this.video.length) {
          arr = this.video
        }
        return arr
      }
    },
    methods: {
      get(item, index) {
        // console.log(item)
        if (item instanceof Array && index === true) { // 判断是否为数组
          this.videData = this.video
          this.isRem = true
          this.nowIndex = -1
        } else {
          this.videData = {video: item}
          this.nowIndex = index
          this.isRem = false
        }
        // console.log(this.videData)
      },
      hasVideo(index) {
        this.currentIndex = index
      },
      addCount(indexs) { // 点赞功能
        // console.log(this.video[indexs])
        // 往对象中添加显示对应的 点赞的属性 数字++
        this.$set(this.video[indexs], 'isPraise', true)
        this.video[indexs].voteCount += 1
      },
      toDetail(video, indexs) {
        // console.log(video, indexs)
        this.$router.push({name: 'VideoDetail', params: {video, indexs}})
        // console.log('123')
      },
      login() {
        this.$emit('emit-login')
      }
    },
    filters: {
      getNum(val) {
        return playNum(val)
      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss">
  .video
    .videoNav
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 40px
      line-height: 40px
      white-space: nowrap
      overflow: hidden
      background: #e12828
      ul
        width: 1720px
        .videoItem
          display: inline-block
          span
            padding: 0 12px
            font-size: 16px
            color: #757575
            &.active
              color: #fff
              font-weight: 700
    .videoList
      position: absolute
      top: 40px
      left: 0
      right: 0
      bottom: 44px
      overflow: hidden
      .videoItems
        width: 100%
        .vid
          position: relative
          width: 100%
          height: 202px
          overflow: hidden
          .msk
            position: absolute
            left: 0
            top: 0
            padding: 8px 0 0 12px
            width: 100%
            height: 100%
            background: rgba(0, 0, 0, 0.3)
            z-index: 600
            .title
              padding-right: 20px
              line-height: 28px
              font-size: 18px
              font-weight: bold
              color: #fff
            .playCount
              font-size: 12px
              color: #ecebe7
        .user
          position: relative
          width: 100%
          height: 60px
          font-size: 12px
          color: #6f6f70
          .content
            display: inline-block
            height: 60px
            width: 100%
            .userDetail
              display: inline-block
              margin: 18px 0 0 8px
              padding: 2px 10px 2px 4px
              background: #f5f7f9
              border-radius: 20px
              img
                // margin-bottom: 2px
                width: 18px
                height: 18px
                vertical-align: middle
                border-radius: 50%
              .name
                display: inline-block
                margin-left: 2px
                vertical-align: middle
            .videoTag
              display: inline-block
              margin-left: 2px
              padding: 5px 12px
              vertical-align: middle
              background: #f5f7f9
              border-radius: 20px
          .menu
            position: absolute
            top: 18px
            right: 10px
            height: 20px
            text-align: right
            font-weight: bold
            .icon
              position: relative
              display: inline-block
              margin-left: 20px
              width: 20px
              height: 20px
              text-align: left
              background: url(../../public/img/ati.png) no-repeat
              background-size: 20px auto
              .count
                position: absolute
                top: 1px
                left: 16px
                font-size: 8px
                color: #999
                background: #fff
              &:nth-child(2)
                background: url(../../public/img/b0n.png) no-repeat
                background-size: 20px auto
              &:nth-child(3)
                background: url(../../public/img/bck.png) no-repeat
                background-size: 20px auto
              &:nth-child(4)
                background: url(../../public/img/ai2.png) no-repeat
                background-size: 20px auto
            .active
              background: url(../../public/img/atj.png) no-repeat
              background-size: 20px auto
</style>
