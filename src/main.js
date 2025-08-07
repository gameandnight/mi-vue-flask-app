// main.js — Punto de entrada de la aplicación Vue

// Importamos la función para crear la instancia de la aplicación
import { createApp } from 'vue'

// Importamos Pinia, el sistema de gestión de estado global
import { createPinia } from 'pinia'

// Importamos el componente raíz (App.vue) que contiene la estructura principal
import App from './App.vue'

// Importamos el router que define las rutas y vistas de la aplicación
import router from './router'

// Importamos los estilos globales (Tailwind u otros) para toda la app
import './assets/main.css'

// Creamos la instancia de la aplicación Vue usando el componente raíz
const app = createApp(App)

// Registramos Pinia como plugin para disponer de stores en toda la app
app.use(createPinia())

// Registramos el router para habilitar la navegación entre vistas
app.use(router)

// Montamos la aplicación en el elemento HTML con id="app"
// A partir de este momento, Vue controla ese nodo y renderiza App.vue
app.mount('#app')
