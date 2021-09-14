import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.directive('todo-focus', {
  updated(el, binding) {
    if (binding.value) {
      el.focus()
    }
  }
})

app.mount('#app')
