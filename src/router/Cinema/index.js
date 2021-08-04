export default{
    path:'/cinema',
    component:() =>import('@/views/Cinema'),
    children:[
        {
            path:'cinemalist',
            component:() =>import('@/components/CinemaList')
        }
    ]
}