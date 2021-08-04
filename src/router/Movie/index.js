export default{
    path:'/movie',
    component : () =>import('@/views/Movie'),
    children:[
        {
            path:'nowplaying',
            component:()=>import('@/components/NowPlaying')
        },
        {
            path : 'city',
            component:()=>import('@/components/City')
        },
        
        {
            path:'commingSoon',
            component:()=>import('@/components/CommingSoon')
        },
        {
            path:'search',
            component:()=>import('@/components/Search')
        },
        {
            path : '/*',
            redirect : '/movie/nowplaying'
        }
    ]
}