// src/router/index.js

// — Importamos las funciones necesarias de Vue Router —
// Usamos Hash History para evitar 404 al recargar en GitHub Pages
import { createRouter, createWebHashHistory } from 'vue-router'

// — Importamos la vista Home de forma estática —
import HomeView from '../views/HomeView.vue'

// — Creamos el router —
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Ruta raíz "/"
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // Ruta para el carrito de compra (lazy-load)
      path: '/carroCompra',
      name: 'carroCompra',
      component: () => import('../views/CarroCompra.vue')
    },
    {
      // Ruta dinámica para un artículo individual (param :articulo)
      path: '/:articulo',
      name: 'articulo',
      component: () => import('../views/ArticuloView.vue'),
      props: true
    },
    {
      // Ruta estática “About” (lazy-load)
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      // Ruta comodín para páginas no encontradas (404) — lazy-load
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
