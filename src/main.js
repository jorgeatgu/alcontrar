import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vSelect from 'vue-select'
import './styles.css'


Vue.component('v-select', vSelect)
Vue.use(VueRouter)

Vue.config.productionTip = false

const Home = () => import("./components/List.vue")
const BookDetail = () => import("./components/BookDetail.vue")

const router = new VueRouter({
  mode: "history",
  routes: [{
    path: '/',
    name: "home",
    component: Home
  },
  {
    path: '/book/:id',
    name: "element",
    component: BookDetail,
    props: true
  }]
})

new Vue({ el: '#app', router, render: h => h(App) })
