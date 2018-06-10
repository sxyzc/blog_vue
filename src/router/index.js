import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path:'/myspace',
      component: resolve => require(['../components/page/MySpace.vue'],resolve)
    },
    {
      path:'/editblog',
	  name:'editblog',
      component: resolve => require(['../components/page/EditBlog.vue'],resolve)
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path:'/adminspace',
      component: resolve => require(['../components/adminSpace.vue'],resolve)
    },
	{
      path:'/mainpage',
      name:'mainpage',
      component: resolve => require(['../components/mainPage.vue'],resolve)
    }
  ]
})
