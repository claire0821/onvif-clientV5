export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                ],
              },
              //onvif
              {
                name: 'onvif.video',
                icon: 'Youtube',
                path: '/video',
                component: './Video',
              },
              {
                name: 'onvif.devices-management',
                icon: 'Camera',
                path: '/devices-management',
                component: './devices-management',
              },
              {
                name: 'onvif.device-info',
                icon: 'Camera',
                path: '/device-info',
                component: './device-info',
              },
              {
                name: 'onvif.media-info',
                icon: 'Camera',
                path: '/media-info',
                component: './media-info',
              },
              {
                name: 'onvif.ptz-info',
                icon: 'Camera',
                path: '/ptz-info',
                component: './ptz-info',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
