import Vue from 'vue'
import VueRouter from 'vue-router'
import Cinema from './Cinema'
import Mine from './Mine'
import Movie from './Movie'
import CinemaSearch from './CinemaSearch'
import Detail from './Detail'
import Admin from './Admin'
import admincenter from '@/views/Admin/center'
import City from '@/components/City'
Vue.use(VueRouter)
const auth = {
  isCity(){
    if(localStorage.cityname){
      return true
    }
  }
}
const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base:'quanmin',
  routes:[
    {
      path:'/city',
      component:City
    },
    {
      path:'/admincenter',
      component : admincenter,
      children : [
        {
            path : 'user',
            component :() =>import('@/views/Admin/user.vue')
        },
        {
            path : 'movie',
            component :()=>import('@/views/Admin/movie.vue')
        },
        {
            path :'cinema',
            component :()=>import('@/views/Admin/cinema.vue')
        },
        {
            path : '/admincenter',
            redirect : '/admincenter/user'
        }

      ]
    },
    Detail,
    CinemaSearch,
    Cinema,
    Admin,
    Mine,
    Movie,
    
    {
      path:'/*',
      redirect:"/movie"
    },
  ]
})

router.beforeEach((to,from,next)=>{
  console.log(to,"15613",localStorage);
  if(to.path === '/movie/nowplaying'){
    if(auth.isCity()){
      next();
    }else{
      next("/city")
    }
  }
  else{
    next()
  }
})

export default router
