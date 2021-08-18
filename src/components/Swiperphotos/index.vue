<template>
    <div>
        <div class="swiper-container photosswiper">
            <div class="swiper-wrapper">
                <slot></slot>
            </div>
            <div class="swiper-pagination"></div>
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
            // direction: 'vertical', // 垂直切换选项
            // loop: true, // 循环模式选项
            
            slidesPerView : 'auto',
            // loopedSlides: 4,
            // freeNode:true,
        //    spaceBetween : 20,
           
            // 如果需要分页器
            pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            },
        })        
    }
}
</script>

<style lang="scss">
.swiper-wrapper{height: 100%;display: flex;align-items: center;}
.swiper-pagination{color: white;}
</style>