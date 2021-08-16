<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    name:'Scroller',
    mounted(){
        var scroll = new BScroll(this.$refs.wrapper,{
            tap:true,
            probrType:1
        })
    }
}
</script>

<style lang="scss">
    .wrapper{}
</style>