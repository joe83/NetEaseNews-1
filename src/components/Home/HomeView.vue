<template>
  <div class="home">
    <home-header @emit-parent-search="search()"></home-header>
    <div class="contentWrapper">
      <home-nav></home-nav>
    </div>
  </div>
</template>

<script>
  import HomeHeader from './HomeHeader'
  import HomeNav from './HomeNav'
  export default {
    name: 'HomeView',
    data() {
      return {
        news: {}
      }
    },
    methods: {
      search() {
        this.$emit('emit-search')
        // console.log('HomeView.vue')
      }
    },
    components: {
      HomeHeader,
      HomeNav
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss">
  $color: red
  .home
    .contentWrapper
      position: absolute
      top: 43px
      left: 0
      right: 0
      bottom: 44px
</style>
