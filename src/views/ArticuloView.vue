<script setup>
/* — Importaciones de Vue y librerías — */
import { ref, onMounted, watch, computed } from 'vue'

/* — Importaciones de Vue Router — */
import { useRoute, useRouter } from 'vue-router'

/* — Importación del store de Pinia para el carrito — */
import { useCartStore } from '@/stores/cart'

/* — Importación de componentes hijos — */
import Volver from '@/components/Volver.vue'
import Paginacion from '@/components/Paginacion.vue'

/* — Guardamos el parámetro de ruta en crudo (string). NO lo convertimos aquí. */
const route = useRoute()
const router = useRouter()
const idRaw = ref(route.params.articulo)

/* — Computed que devuelve el id numérico válido o null si no es entero positivo */
const id = computed(() => {
  const n = Number(idRaw.value)
  return Number.isInteger(n) && n > 0 ? n : null
})

/* — Estado local para los datos de producto y estados de petición — */
const datos = ref(null)
const error = ref(false)
const cargando = ref(false)

/* — Función robusta para obtener el producto según id — */
async function fetchProducto() {
  cargando.value = true
  error.value = false
  datos.value = null

  // Si id no es numérico válido, redirigimos a NotFound
  if (id.value === null) {
    router.replace({ name: 'NotFound' })
    cargando.value = false
    return
  }

  const numericId = id.value

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${numericId}`)

    // Si la API responde 404 => artículo no existe
    if (res.status === 404) {
      router.replace({ name: 'NotFound' })
      return
    }

    // Si no es ok, leemos el body como texto para debug y mostramos error
    if (!res.ok) {
      const txt = await res.text()
      console.error('Respuesta no OK:', res.status, txt)
      error.value = true
      return
    }

    // Leemos el body como texto (evita errores si está vacío)
    const bodyText = await res.text()

    if (!bodyText || bodyText.trim() === '') {
      // API devolvió 200 pero con body vacío -> tratamos como "no encontrado"
      console.error('Respuesta con body vacío:', res.status)
      router.replace({ name: 'NotFound' })
      return
    }

    // Intentamos parsear JSON
    let json
    try {
      json = JSON.parse(bodyText)
    } catch (parseErr) {
      console.error('Error parseando JSON:', parseErr, 'body:', bodyText)
      error.value = true
      return
    }

    datos.value = json
  } catch (err) {
    console.error('Fetch error:', err)
    error.value = true
  } finally {
    cargando.value = false
  }
}

/* — Efectos de ciclo de vida y reactividad — */
onMounted(fetchProducto)

watch(
  () => route.params.articulo,
  (newVal) => {
    idRaw.value = newVal
    // llamamos a fetchProducto; la validación dentro de la función decidirá redirigir
    fetchProducto()
  }
)

/* — Conexión al store de carrito — */
const cart = useCartStore()

/* — Función comprar — */
function comprar() {
  if (datos.value) {
    cart.add(datos.value)
  }
}

/* — Handlers para Paginación — */
function getDataPrev() {
  const current = id.value
  if (current && current > 1) {
    const nextId = current - 1
    router.push(`/${nextId}`)
  }
}
function getDataNext() {
  const current = id.value
  if (current && current < 20) {
    const nextId = current + 1
    router.push(`/${nextId}`)
  }
}
</script>

<template>
  <!-- Estados -->
  <div v-if="cargando"><h1>Cargando…</h1></div>

  <div v-else-if="error">
    <h1>Error de conexión</h1>
    <p>Hubo un problema al obtener el artículo. Prueba a recargar o vuelve más tarde.</p>
  </div>

  <div v-else-if="datos">
    <h2>{{ datos.title }}</h2>
    <img :src="datos.image" alt="Imagen producto" width="250" height="250" />
    <p>{{ datos.description }}</p>
    <p><strong>Precio:</strong> ${{ datos.price }}</p>
    <button class="button is-primary" @click="comprar">Comprar</button>
    <Volver />
    <Paginacion
      :id="id ?? 1"
      @getDataPrev="getDataPrev"
      @getDataNext="getDataNext"
      :disabled-prev="!(id > 1)"
      :disabled-next="!(id < 20)"
    />
  </div>
</template>

<style scoped>
img { display: block; margin: 1rem 0; }
button { margin: 0.5rem; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
</style>
