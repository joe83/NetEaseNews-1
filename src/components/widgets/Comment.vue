<template>
  <div class="comment">
    <div class="background" @click="hideComment"></div>
    <div class="commentArea">
      <textarea name="" id="" cols="30" rows="10" v-model="inpMsg"></textarea>
      <button class="send" :class="{active: change}" :disabled="!change" @click="sendMsg">发送</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        inpMsg: ''
      }
    },
    computed: {
      change() {
        // Return statement should not contain assignment
        // 返回语句不包含赋值
        return this.inpMsg.length === 0 ? 0 : true
      }
    },
    methods: {
      sendMsg() {
        // console.log('sendMsg')
        this.$emit('emit-comment-login')
      },
      hideComment() {
        this.$emit('emit-hideComment')
        // console.log('emit-hideComment')
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .comment
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 10000
    .background
      position: absolute
      left: 0
      top: 0
      right: 0
      bottom: 30px
    .commentArea
      display: flex
      position: absolute
      left: 0
      right: 0
      bottom: 0
      padding: 10px 0 21px 12px
      height: 30px
      background: #fff
      textarea
        flex: 1
        padding-left: 10px
        font-size: 18px
        border: 1px solid #e8e8e8
        border-radius: 14px
        resize: none
        outline: none
      .send
        flex: 0 0 72px
        margin: 0
        padding: 0
        width: 72px
        height: 34px
        line-height: 34px
        font-size: 16px
        font-weight: 700
        text-align: center
        border: 0
        background-color: transparent
        outline: none
        color: #ccc
        &.active
          color: #1e88e5
</style>
