<template>
  <div>
    <loading v-show="!news[category]"></loading>
    <div class="newsList" ref="newsList">
      <div>
        <div class="news" v-for="(item,index) in news[category]" :key="index" v-show="item.title" @click="toNewsDetail(item)">
          <div class="content">
            <div class="title">{{item.title}}</div>
            <div class="source">
              <span v-show="index === 0 && category === 'toutiao'" style="color: red">置顶&nbsp;&nbsp;</span>
              {{item.source}}&nbsp;&nbsp;
              <span class="ent" v-show="item.tcount">{{item.tcount}}跟帖</span>
            </div>
          </div>
          <div class="showImg">
            <div class="picInfo" v-for="(minItem,minIdex) in item.picInfo" :key="minIdex">
              <div class="hasImg0" v-if="item.picInfo.length === 0">
                <img :src="minItem.url" width="109">
              </div>
              <div class="hasImg1" v-else-if="item.picInfo.length === 1">
                <img :src="minItem.url" width="109">
              </div>
              <div class="hasImg3" v-else>
                <!-- <img :src="minItem.url" width="109"> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {Loading} from '../widgets'

  export default {
    created() {
      this.axios.get('https://www.apiopen.top/journalismApi')
        .then(res => {
          res = res.data
          if (res.code === 200) {
            this.news = res.data
            // console.log(this.news)
          }
        })
      this.$nextTick(() => {
        this.newsScroll = new BScroll(this.$refs.newsList, {
          click: true,
          bounce: false
        })
      })
    },
    props: {
      category: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        news: {}
      }
    },
    methods: {
      toNewsDetail(params) {
        this.$router.push({name: 'NewsDetail', params})
      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss">
  @import '../../public/scss/mixin'
  .newsList
    position: absolute
    top: 35px
    left: 0
    right: 0
    bottom: 0
    overflow: hidden
    .news
      display: flex
      padding: 12px
      color: #333
      @include border-1px(#edeff3)
      .content
        flex: 1
        font-size: 0
        .title
          line-height: 25px
          font-size: 18px
        .source
          position: relative
          margin-top: 12px
          font-size: 12px
          color: #b4b4b4
          &:after
            content: ''
            position: absolute
            right: 0
            width: 8px
            height: 8px
            background: url(../../public/img/axt.png) no-repeat
            background-size: auto 8px
      .picInfo
        .hasImg0, .hasImg1,
          width: 110px
          height: 68px
          img
            width: 100%
            height: 100%
        .hasImg1
          flex: 1
          margin-left:  12px
        .hasImg3
          display: inline-block
          &:nth-child(3)
            margin-right: 0
            transform: translateY(100px)
</style>
