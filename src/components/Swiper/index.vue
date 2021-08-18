<template>
    <div class="content">
        <div class="swiper-container filmswiper">
            <div class="swiper-wrapper">
                <slot></slot>
                <!-- <div class="swiper-slide">Slide 1</div>
                <div class="swiper-slide">Slide 2</div> -->
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
            
            <!-- 如果需要导航按钮 -->
            <!-- <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div> -->
            
            <!-- 如果需要滚动条 -->
            <!-- <div class="swiper-scrollbar"></div> -->
        </div>
    </div>
</template>


<script>
import './swiper-bundle.min.css'
import Swiper from './swiper-bundle.min.js'
export default {
    name:'Swiper',
    mounted(){
         new Swiper ('.filmswiper', {
            // direction: 'vertical', // 垂直切换选项
            // loop: true, // 循环模式选项
            
            slidesPerView : 'auto',
            // loopedSlides: 4,
            // freeNode:true,
           spaceBetween : 20,
           
            // 如果需要分页器
            // pagination: {
            // el: '.swiper-pagination',
            // },
            
            // 如果需要前进后退按钮
            // navigation: {
            // nextEl: '.swiper-button-next',
            // prevEl: '.swiper-button-prev',
            // },
            
            // 如果需要滚动条
            // scrollbar: {
            // el: '.swiper-scrollbar',
            // },
        })        
    }
}
</script>

<style lang="scss">
   .content{
       .filmswiper{
           background-color: white;
            .swiper-wrapper{
                background-color: white;
                height: 100px;
                display: flex;
                align-items: center;
            }
       }
   }
    
</style>

