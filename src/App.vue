<template>
  <div id="app">
    <router-view @emit-login="login" @emit-search="search" />
    <search v-show="isSearch" @emit-search="search"></search>
    <login-view v-show="isLogin" @emit-login="login"></login-view>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
  import FooterNav from '@/components/FooterNav'
  import LoginView from '@/components/LoginView'
  import {Search} from '@/components/widgets'
  export default {
    name: 'App',
    data() {
      return {
        isLogin: false,
        isSearch: false
      }
    },
    methods: {
      login() {
        this.isLogin = !this.isLogin
        // console.log('login')
      },
      search() {
        this.isSearch = !this.isSearch
        // console.log('App.vue')
      }
    },
    components: {
      FooterNav,
      LoginView,
      Search
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
