<template>
    <div>
        <div class="swiper-container photosswiper">
            <div class="swiper-pagination"></div>
            <div class="swiper-wrapper">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import '../Swiper/swiper-bundle.min.css'
import Swiper from '../Swiper/swiper-bundle.min.js'
export default {
    name:'Swiperphotos',
    mounted(){
         new Swiper ('.photosswiper', {
             pagination: {
             el: '.swiper-pagination',
             type: 'fraction',
             },
            // direction: 'vertical', // 垂直切换选项
            // loop: true, // 循环模式选项
            
            slidesPerView : 'auto',
            // loopedSlides: 4,
            // freeNode:true,
        //    spaceBetween : 20,
           
            // 如果需要分页器
        })        
    }
}
</script>

<style lang="scss">
.swiper-wrapper{}
.swiper-pagination{color: white;}
</style>