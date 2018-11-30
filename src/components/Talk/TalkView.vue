<template>
  <div class="talk">
    <talk-detail :detail="detail" v-show="isShow" @emit-isShow="setIsShow" @emit-isLogin="login"></talk-detail>
    <share v-show="isShare" @emit-share="showShare"></share>
    <div class="header">
      <span class="recommend active">推荐</span>
      <span class="follow" @click="login">关注</span>
      <i class="search" @click="login"></i>
    </div>
    <loading v-show="!talkData.subjectList"></loading>
    <div class="talkWrapper" ref="talkContent">
      <ul>
        <h2>最热话题</h2>
        <li class="talkItem" v-for="(item,index) in talkData.subjectList" :key="index">
          <div class="top" @click="toDetail(item)">
            <div class="name">{{item.name}}</div>
            <div class="feature">关于：{{item.feature}}</div>
            <div class="picurl">
              <img :src="item.picurl" width="100%">
            </div>
            <div class="alias"><i class="icon"></i>{{item.alias}}</div>
          </div>
          <div class="bottom">
            <div class="icon" @click="addCount(index)">
              <div v-if="'isPraise' in item">
                <img src="../../public/img/atj.png" width="20">
                <span style="color: #EE1A1A">{{item.concernCount}}</span>
              </div>
              <div v-else>
                <img src="../../public/img/ati.png" width="20">
                <span>{{item.concernCount}}</span>
              </div>
            </div>
            <div class="icon" @click="toDetail(item)">
              <img src="../../public/img/bck.png" width="20">
              <span>{{item.talkCount}}</span>
            </div>
            <div class="icon" @click="showShare">
              <img src="../../public/img/axz.png" width="20">
              <span>分享</span>
            </div>
          </div>
          <split></split>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {Split, Share, Loading} from '../widgets'
  import TalkDetail from './TalkDetail'
  export default {
    created() {
      // 使用本地数据
      this.axios.get('/api/talk')
        .then(res => {
          // console.log(res.data)
          res = res.data
          if (res.errno === 0) {
            this.talkData = res.data
            // console.log(this.talkData)
          }
        })
      this.$nextTick(() => {
        this.talkScroll = new BScroll(this.$refs.talkContent, {
          click: true
        })
      })
    },
    data() {
      return {
        talkData: {},
        detail: {},
        isShow: false,
        isShare: false
      }
    },
    methods: {
      toDetail(item) {
        this.detail = item
        this.isShow = true
      },
      setIsShow() {
        this.isShow = false
      },
      addCount(index) { // 添加点赞功能
        // console.log(this.talkData.subjectList[index])
        if (this.talkData.subjectList[index].isPraise) {
          // 删除 对应的 点赞的属性 数字--
          this.$delete(this.talkData.subjectList[index], 'isPraise', false)
          this.talkData.subjectList[index].concernCount--
        } else {
          // 往对象中添加显示对应的 点赞的属性 数字++
          this.$set(this.talkData.subjectList[index], 'isPraise', true)
          this.talkData.subjectList[index].concernCount++
        }
      },
      login() {
        this.$emit('emit-login')
        // console.log('TalkView.vue')
      },
      showShare() {
        this.isShare = !this.isShare
      }
    },
    components: {
      Split,
      TalkDetail,
      Share,
      Loading
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss">
  .talk
    .header
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 50px
      line-height: 50px
      text-align: center
      span
        display: inline-block
        padding: 0 10px
        font-size: 18px
        color: #717171
        display: inline-block
        &.active
          color: #333
          font-weight: 700
      .search
        position: absolute
        top: 14px
        right: 14px
        width: 20px
        height: 20px
        background: url(../../public/img/ajv.png) no-repeat
        background-size: auto 20px
    .talkWrapper
      position: absolute
      top: 50px
      left: 0
      right: 0
      bottom: 44px
      overflow: hidden
      padding: 0 12px
      ul
        h2
          padding: 20px 0 20px 20px
          font-size: 18px
          font-weight: bold
          background: url(../../public/img/hot_talk.png) no-repeat 0 16px
          background-size: 20px auto
        .name
          padding: 20px 0
          font-size: 18px
          font-weight: bold
          text-align: center
        .feature
          font-size: 12px
          color: #b4b4b4
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
</style>
