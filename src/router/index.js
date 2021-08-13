import Vue from 'vue'
import VueRouter from 'vue-router'
import Cinema from './Cinema'
import Mine from './Mine'
import Movie from './Movie'
import CinemaSearch from './CinemaSearch'
import Detail from './Detail'
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
  base: process.env.BASE_URL,
  routes:[
    {
      path:'/city',
      component:City
    },
    Detail,
    CinemaSearch,
    Cinema,
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
