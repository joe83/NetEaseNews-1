<template>
  <div class="main">
    <!-- 新闻导航 -->
    <div class="newsNav" ref="navScroll">
      <ul ref="navWrapper">
        <li class="newsNavItem" ref="navList" v-for="(item,key,index) in navTitle" :key="key" :class="{active: index == currentIndex}" @click="sendNews(key,index)">
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
    <!-- 新闻内容列表 -->
    <div class="newsView">
      <!-- 内容 -->
      <news-list :category="category"></news-list>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import NewsList from './NewsList'
  export default {
    created() {
      this.$nextTick(() => {
        this.navScrolld = new BScroll(this.$refs.navScroll, {
          scrollX: true,
          click: true,
          bounce: false
        })
      })
    },
    data() {
      return {
        navTitle: {
          'toutiao': '头条',
          'ent': '娱乐',
          'sports': '体育',
          'money': '财经',
          'tech': '科技',
          'auto': '汽车',
          'war': '军事',
          'dy': '健康'
        },
        currentIndex: 0,
        category: 'toutiao'
      }
    },
    methods: {
      sendNews(params, index) {
        // 类别
        this.category = params
        this.currentIndex = index
      }
    },
    components: {
      NewsList
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .main
    .newsNav
      width: 100%
      height: 35px
      line-height: 35px
      overflow: hidden
      white-space: nowrap // 强制不换行
      ul
        width: 448px
        .newsNavItem
          float: left
          display: inline-block
          // padding: 10px 12px
          padding: 0 12px
          font-size: 16px
          font-weight: normal
          color: #757575
          &.active
            font-weight: bold
            color: #333
</style>
