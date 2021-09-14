export default{
    path:'/mine',
    component:() =>import('@/views/Mine'),
    children : [
        {
            path : 'login',
            component : () => import('@/components/Login')
        },
        {
            path : 'center',
            component : () => import('@/views/Mine/center')
        },
        {
            path : 'register',
            component : () => import('@/components/Register') 
        },
        {
            path : 'findpassword',
            component : () => import('@/components/findPassword') 
        },
        {
            path : '/mine',
            redirect : '/admin'
        }
    ]
}

