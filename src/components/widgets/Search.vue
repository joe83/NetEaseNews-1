<template>
  <transition name="fade">
    <div class="search">
      <div class="searchHeader">
        <div class="back" @click="search"></div>
        <div class="inp">
          <span class="icon"></span>
          <!-- <input type="text" placeholder="请输入新闻标题..." v-model="searchVal"> -->
          <input type="text" placeholder="请输入新闻标题..." @input="changeVal" v-model="searchVal" @keyup.enter="sendMsg">
        </div>
        <div class="txt" @click="sendMsg">搜索</div>
      </div>
      <div class="searchContent">
        <ul>
          <div class="hotSearch" v-show="showHot">
            <div class="title border-1px">热门搜索</div>
            <div class="hotList border-1px" v-for="(item,index) in list.toutiao" :key="index" @click="toNewsDetail(item)" v-if="index < 10">
              <span class="tit"><i :class="'num'+index">{{index+1}}.&nbsp;&nbsp;</i>{{item.title}}</span>
            </div>
          </div>
          <li class="listItem border-1px" v-for="(item,index) in arrList" :key="index" @click="toNewsDetail(item)">
              <span class="tit">{{item.title}}</span>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    created() {
      this.axios.get('https://www.apiopen.top/journalismApi')
        .then(res => {
          // console.log(res.data)
          res = res.data
          if (res.code === 200) {
            this.list = res.data
            // console.log(this.list.auto[0].title)
            // console.log(this.list)
          }
        })
    },
    data() {
      return {
        list: {},
        searchVal: '',
        showHot: true
      }
    },
    computed: {
      arrList() {
        let searchVal = this.searchVal
        // 逻辑-->根据input的value值筛选goodsList中的数据
        let arr = [] // 声明一个空数组来存放数据
        if (searchVal) {
          for (let key in this.list) {
            // console.log(this.list)
            // console.log(key)
            // console.log(this.list[key])
            for (let i = 0; i < this.list[key].length; i++) {
              // console.log(this.list[key][i].title)
              // console.log(this.list[key][i])
              // "TypeError: Cannot read property 'search' of null" 没有加下面这条会报错“Type Error：无法读取NULL属性”搜索“
              let str = String(this.list[key][i].title)
              if (str.search(searchVal) > -1) {
                arr.push(this.list[key][i])
              }
              // console.log(str.indexOf(searchVal))
              // console.log(str)
            }
          }
        }
        return arr
      }
    },
    methods: {
      search() {
        this.$emit('emit-search')
      },
      changeVal(e) {
        if (e.target.value.length !== 0) {
          this.searchVal = e.target.value
          this.showHot = false
        } else {
          this.showHot = true
        }
      },
      toNewsDetail(params) {
        this.$emit('emit-search')
        this.$router.push({name: 'NewsDetail', params})
      },
      sendMsg() {
        // this.searchVal = ''
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../../public/scss/mixin'
  .search
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #fff
    color: #333
    z-index: 800
    transition: all 0.5s linear
    &.fade-enter, &.fade-leave-to
      // transform: translate(100%)
      opacity: 0
    .searchHeader
      box-sizing: border-box
      display: flex
      position: absolute
      top: 0
      left: 0
      padding: 8px 16px 8px 10px
      width: 100%
      height: 46px
      .back
        flex: 0 0 24px
        margin-top: 4px
        width: 16px
        height: 24px
        background: url(../../public/img/ajq.png) no-repeat 0px 3px
        background-size: 18px auto
      .inp
        flex: 1
        padding: 0 0px 0 14px
        width: 100%
        height: 32px
        line-height: 32px
        border: 1px solid #efefef
        border-radius: 28px
        .icon
          float: left
          display: inline-block
          margin: 8px 5px 8px 0
          width: 14px
          height: 14px
          background: url(../../public/img/news_main_search_bar_icon.png) no-repeat
          background-size: 13px auto
        input
          float: left
          padding: 9px 0
          margin: 0
          height: 15px
          line-height: 15px
          font-size: 14px
          border: 0
          outline: none
          background-color: transparent
      .txt
        flex: 0 0 46px
        width: 46px
        height: 32px
        line-height: 32px
        font-size: 14px
        font-weight: 600
        text-align: right
    .searchContent
      box-sizing: border-box
      position: absolute
      top: 46px
      left: 0
      bottom: 0
      right: 0
      margin: 0 12px 0 12px
      .tit
        display: block
        padding: 12px 0 12px 34px
        max-width: 250px
        height: 14px
        font-size: 14px
        font-weight: 500
        white-space: nowrap /*一行展示*/
        text-overflow: ellipsis /*...显示*/
        overflow: hidden /*超出隐藏*/
      .hotSearch
        .title
          padding: 14px 0 10px
          font-size: 14px
          color: #a0a0a0
          @include border-1px(#e4e4e4)
        .hotList
          @include border-1px(#ebebeb)
          // padding: 12px 0 12px 10px
          .tit
            padding-left: 12px
            i
              font-size: 14px
              background: none
              color: #bcbcbc
            .num0
              color: #ff443f
            .num1
              color: #ff903b
            .num2
              color: #ffc535
      .listItem
        width: 100%
        @include border-1px(#ebebeb)
        .tit
          background: url(../../public/img/axn.png) no-repeat 12px 12px
          background-size: 14px auto
</style>
