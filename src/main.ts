import { createApp } from 'vue'
import { VueFire } from 'vuefire'
import './style.css'
import App from './App.vue'
import router from './router'
import { firebaseApp } from './firebase'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
app.use(router)
app.use(VueFire, {
  firebaseApp,
})
app.mount('#app')
