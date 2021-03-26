import Vue from 'vue'
import VueRouter from 'vue-router'
import Config from '../views/Config.vue'
import Umum from '../components/Umum.vue'
import Pengumuman from '../components/Pengumuman.vue'
import Galeri from '../components/Galeri.vue'
import PrayTime from '../components/PrayTime.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Config,
    children: [
      // Note we provide the above parent route name on the default child tab
      // route to ensure this tab is rendered by default when using named routes
      { path: '', component: Umum, name: 'config' },
      { path: 'galeri', component: Galeri },
      { path: 'pengumuman', component: Pengumuman },
      { path: 'praytime', component: PrayTime }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
