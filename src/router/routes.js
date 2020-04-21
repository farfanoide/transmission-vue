
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Servers.vue'),
        name: 'servers' },
      {
        path: 'torrents-list',
        component: () => import('pages/TorrentsListing.vue') ,
        name: 'torrents-list'
      },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
