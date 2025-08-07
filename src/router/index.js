// src/router/index.js

// — Importamos las funciones necesarias de Vue Router —
// createRouter: crea la instancia del enrutador
// createWebHistory: usa el History API del navegador para rutas limpias (sin '#')
import { createRouter, createWebHistory } from 'vue-router'

// — Importamos la vista Home de forma estática —
// Esto mejora la velocidad de carga inicial para la ruta principal
import HomeView from '../views/HomeView.vue'

// — Creamos el router —
// history: configura el modo de historial
// routes: array de objetos que definen cada ruta
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Ruta raíz "/"
      path: '/',
      name: 'home',          // Nombre único de la ruta
      component: HomeView     // Componente que se renderiza
    },
    {
      // Ruta para el carrito de compra
      path: '/carroCompra',
      name: 'carroCompra',
      // Lazy-load: el componente se importa sólo al navegar aquí
      component: () => import('../views/CarroCompra.vue')
    },
    {
      // Ruta dinámica para un artículo individual
      // ":articulo" crea un param que luego leemos en ArticuloView.vue
      path: '/:articulo',
      name: 'articulo',
      component: () => import('../views/ArticuloView.vue')
    },
    {
      // Ruta estática “About”
      path: '/about',
      name: 'about',
      // Código dividido: se carga sólo al visitar esta ruta
      component: () => import('../views/AboutView.vue')
    },
    {
      // Ruta comodín para páginas no encontradas (404)
      // pathMatch(.*)* captura cualquier ruta no definida arriba
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

// Exportamos la instancia para usarla en main.js
export default router
