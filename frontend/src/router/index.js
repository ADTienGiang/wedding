import {
  createRouter,
  createWebHistory
} from 'vue-router'
import customerIndexViews from '../views/index.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'customerIndexViews',
      component: customerIndexViews
    },
    {
      path: '/admin_login',
      name: 'admin_login',
      // component: () => import('../components/loginadmin.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views-admin/admin.vue'),
      // beforeEnter: (to, from, next) => {
      //   const adminInfo = localStorage.getItem('admin');
      //   if (adminInfo) {
      //     next();
      //   } else {
      //     next('/admin_login');
      //   }
      // },
      children: [
        {
          path: 'banner',
          component: () => import('../views-admin/home/banner.vue'),
          name: 'banner'
        },
        {
          path: 'loiMoDau',
          component: () => import('../views-admin/home/loiMoDau.vue'),
          name: 'loiMoDau'
        },
        {
          path: 'moTaDichVu',
          component: () => import('../views-admin/home/moTaDichVu.vue'),
          name: 'moTaDichVu'
        },
        {
          path: 'damCuoi',
          component: () => import('../views-admin/home/wedding/damCuoi.vue'),
          name: 'damCuoi'
        },
       
        {
          path: 'nhanHang',
          component: () => import('../views-admin/home/nhanHang.vue'),
          name: 'nhanHang'
        },
        {
          path: 'footer',
          component: () => import('../views-admin/home/footer.vue'),
          name: 'footer'
        },
        {
          path: 'about',
          component: () => import('../views-admin/about/about.vue'),
          name: 'about'
        },
        {
          path: 'service',
          component: () => import('../views-admin/service/service.vue'),
          name: 'service'
        },
        {
          path: 'album',
          component: () => import('../views-admin/album/album.vue'),
          name: 'album'
        },
        {
          path: 'categoryAlbum',
          component: () => import('../views-admin/album/categoryAlbum.vue'),
          name: 'categoryAlbum'
        },
        {
          path: 'logo',
          component: () => import('../views-admin/logo/logo.vue'),
          name: 'logo'
        },
        {
          path: 'video1',
          component: () => import('../views-admin/video/video.vue'),
          name: 'video1'
        },
        {
          path: 'blog',
          component: () => import('../views-admin/blog/blog.vue'),
          name: 'blog'
        },
        {
          path: 'contact',
          component: () => import('../views-admin/contact/contact.vue'),
          name: 'contact'
        },
        {
          path: 'introduce',
          component: () => import('../views-admin/introduce.vue'),
          name: 'introduce'
        },
      
        {
          path: 'infomation',
          component: () => import('../views-admin/infomation.vue'),
          name: 'infomation'
        },
        {
          path: 'thu-vien-anh',
          component: () => import('../views-admin/thu-vien-anh.vue'),
          name: 'thu-vien-anh'
        },
      
      ],
    },
    {
      path: '/wedding-works/:duong_dan_wedding_works',
      name: 'wedding-works',
      component: () => import('../pages/workwedding.vue')
    },
    {
      path: '/service-detail/:duong_dan_service',
      name: 'service-detail',
      component: () => import('../pages/detai-service.vue')
    },
    {
      path: '/gioi-thieu',
      name: 'gioithieu',
      component: () => import('../pages/about.vue')
    },
    {
      path: '/dich-vu',
      name: 'dichvu',
      component: () => import('../pages/service.vue')
    },
    {
      path: '/hanh-trinh',
      name: 'hanhtrinh',
      component: () => import('../pages/album.vue')
    },
    {
      path: '/detail-album/:duongdanhanhtrinh',
      name: 'detail-album',
      component: () => import('../pages/detailAlbum.vue')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('../pages/video.vue')
    },
    {
      path: '/danh-gia',
      name: 'danh-gia',
      component: () => import('../pages/blog.vue')
    },
    {
      path: '/detai-blog/:duongdanchitietblog',
      name: 'detailblog',
      component: () => import('../pages/detail-blog.vue')
    },
    {
      path: '/lien-he',
      name: 'lien-he',
      component: () => import('../pages/contact.vue')
    },
    {
      path: '/bocuc1',
      component: () => import('../components/layout-wedding/boCuc1.vue'),
      name: 'bocuc1'
    },
  ]
})

export default router;
