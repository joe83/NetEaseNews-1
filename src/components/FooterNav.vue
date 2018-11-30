<template>
  <div class="nav">
    <div class="item">
      <router-link to="/" exact><i class="bdd"></i><span>首页</span></router-link>
    </div>
    <div class="item">
      <router-link to="/video"><i class="bdj"></i><span>视频</span></router-link>
    </div>
    <div class="item">
      <router-link to="/talk"><i class="bd6"></i><span>讲讲</span></router-link>
    </div>
    <div class="item">
      <router-link to="/mine"><i class="bdf"></i><span>我</span></router-link>
    </div>
  </div>
</template>

<script>
  import HomeView from './Home/HomeView'
  import VideoView from './Video/VideoView'
  import TalkView from './Talk/TalkView'
  import MineView from './Mine/MineView'
  export default {
    name: 'FooterNav',
    components: {
      HomeView,
      VideoView,
      TalkView,
      MineView
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" rel="stylesheet/scss" scoped>
  $nav: (bdd: bde, bdj: bdk, bd6: bd7, bdf: bdg)
  .nav
    display: flex
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 44px
    text-align: center
    .item
      flex: 1
      margin-top: 2px
      width: 100%
      height: 44px
      font-size: 24px
      color: #666
      & > a
        display: block
        text-align: center
        &.active
          color: #ee1a1a
          @each $key, $value in $nav
            .#{$key}
              background: url('../public/img/'+ $value +'.png') no-repeat center
              background-size: 24px auto
        @each $key, $value in $nav
          & > .#{$key}
            display: inline-block
            width: 24px
            height: 24px
            background: url('../public/img/'+ $key +'.png') no-repeat center
            background-size: 24px auto
        & > span
          display: block
          font-size: 10px
</style>
