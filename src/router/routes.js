
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/TorrentsListing.vue') ,
        name: 'torrents-list'
      },
      {
        path: 'servers',
        component: () => import('pages/Servers.vue'),
        name: 'servers'
      },
    ]
  }
]

// Always leave this as last one
routes.push({
  path: '/:catchAll(.*)*',
  component: () => import('pages/Error404.vue')
})

export default routes
