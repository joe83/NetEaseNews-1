<template>
  <div class="header">
    <div class="logo"></div>
    <div class="search" @click="search()">
      <i class="icon"></i>
      <span class="hot">京东全球好物节</span>
    </div>
    <div class="direct"></div>
  </div>
</template>

<script>
  export default {
    methods: {
      search() {
        this.$emit('emit-parent-search')
        // console.log('HomeHeader.vue')
      }
    },
    components: {
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .header
    display: flex
    position: fixed
    top: 0
    left: 0
    right: 0
    height: 44px
    background: #e12828
    .logo
      flex: 0 0 60px
      width: 60px
      background: url(../../public/img/logo.png) no-repeat center
      background-size: 38px auto
    .search
      flex: 1
      margin-top: 6px
      width: 100%
      height: 32px
      line-height: 32px
      text-align: center
      border-radius: 18px
      background: #ec5557
      .icon
        display: inline-block
        margin-top: 8px
        width: 16px
        height: 16px
        vertical-align: top
        background: url(../../public/img/home_search_icon.png) no-repeat center
        background-size: 16px auto
      .hot
        font-size: 14px
        color: #fff
    .direct
      flex: 0 0 50px
      width: 50px
      background: url(../../public/img/skin1_news_main_live_icon.png) no-repeat center
      background-size: 25px auto
</style>
