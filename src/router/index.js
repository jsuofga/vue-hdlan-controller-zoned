import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Zone1 from '@/components/Zone1'
import Zone2 from '@/components/Zone2'
import Zone3 from '@/components/Zone3'
import Zone4 from '@/components/Zone4'
import Ipaddress from '@/components/Ipaddress'
import Status from '@/components/Status'
import Sidenav from '@/components/Sidenav'
import Name_inputs from '@/components/Name_inputs'
import Name_outputs from "@/components/Name_outputs";
import Name_zones from "@/components/Name_zones";
import Dashboard from "@/components/Dashboard";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sidenav',
      name: 'sidenav',
      component: Sidenav
    },
    {
      path: '/zone1',
      name: 'zone1',
      component: Zone1
    },
    {
      path: '/zone2',
      name: 'zone2',
      component: Zone2
    },
        {
      path: '/zone3',
      name: 'zone3',
      component: Zone3
    },
    {
      path: '/zone4',
      name: 'zone4',
      component: Zone4
    },
    {
      path: '/ipaddress',
      name: 'ipaddress',
      component: Ipaddress
    },
    {
      path: '/status',
      name: 'status',
      component: Status
    },
    {
      path: '/name-inputs',
      name: 'name_inputs',
      component: Name_inputs
    },
    {
      path: '/name-outputs',
      name: 'name_outputs',
      component: Name_outputs
    },
    {
      path: '/name-zones',
      name: 'name_zones',
      component: Name_zones
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },

  ]
})

