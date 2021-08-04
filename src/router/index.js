import Vue from 'vue'
import VueRouter from 'vue-router'
import Cinema from './Cinema'
import Mine from './Mine'
import Movie from './Movie'
import CinemaSearch from './CinemaSearch'
import Detail from './Detail'
import FilmDetail from './FilmDetail'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    FilmDetail,
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

export default router
