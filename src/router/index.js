import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/Home/HomeView'
import VideoView from '@/components/Video/VideoView'
import TalkView from '@/components/Talk/TalkView'
import MineView from '@/components/Mine/MineView'
import NewsDetail from '@/components/Home/NewsDetail'
import VideoDetail from '@/components/Video/VideoDetail'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/video',
      name: 'Video',
      component: VideoView,
      children: [
        {
          path: '/video/detail',
          name: 'VideoDetail',
          component: VideoDetail
        }
      ]
    },
    {
      path: '/talk',
      name: 'Talk',
      component: TalkView
    },
    {
      path: '/mine',
      name: 'Mine',
      component: MineView
    },
    {
      path: '/newsDetail',
      name: 'NewsDetail',
      component: NewsDetail
    }
  ],
  linkActiveClass: 'active'
})

// 路由监听
router.beforeEach((to, from, next) => {
  // console.log(to.params.video, to.path)
  if (to.path === '/video/detail') {
    next('/video')
  } else if (to.path === '/newsDetail') {
    next('/')
  }
  next()
})

export default router
