import Vue from 'vue'
import App from './App.vue'

export function runVue() {
  new Vue({
    el: '#app',
    render: h => h(App)
  })
}