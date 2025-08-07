<script setup>
// — Importaciones de Vue y librerías —
// ref: crea valores reactivos que actualizan la UI al cambiar.
// onMounted: hook que se ejecuta cuando el componente se monta.
// watch: observa cambios en un valor/reactivo y ejecuta una función.
import { ref, onMounted, watch } from 'vue'

// — Importaciones de Vue Router —
// useRoute: acceder a parámetros de la ruta actual.
// useRouter: programáticamente cambiar de ruta.
import { useRoute, useRouter } from 'vue-router'

// — Importación del composable para peticiones —
// useGetData: encapsula la lógica de fetch/axios, maneja loading y error.
import { useGetData } from '@/composables/useGetData'

// — Importación del store de Pinia para el carrito —
// useCartStore: define y accede al estado global del carrito de compras.
import { useCartStore } from '@/stores/cart'

// — Importación de componentes hijos —
// Volver: botón que regresa a Home.
// Paginacion: botones “Anterior”/“Siguiente” para navegar entre artículos.
import Volver from '@/components/Volver.vue'
import Paginacion from '@/components/Paginacion.vue'

// — Configuración del parámetro “articulo” de la ruta —
// route.params.articulo contiene el id en la URL.
// ref(...) inicializa id como reactivo; Number(...) asegura que sea numérico.
const route = useRoute()
const router = useRouter()
const id = ref(Number(route.params.articulo) || 1) // default 1 si no hay parámetro

// — Setup del composable useGetData —
// getData: función para realizar la petición.
// datos: ref que contendrá la respuesta (objeto producto).
// error: ref booleano si ocurre fallo en la petición.
// cargando: ref booleano para estado de carga.
const { getData, datos, error, cargando } = useGetData()

// — Función para obtener el producto según id —
// Llama a getData con la URL específica del producto.
function fetchProducto() {
  getData(`https://fakestoreapi.com/products/${id.value}`)
}

// — Efectos de ciclo de vida y reactividad —
// onMounted: al montar el componente, lanza la petición inicial.
onMounted(fetchProducto)

// watch: cuando cambie route.params.articulo, actualiza id y refetch.
watch(
  () => route.params.articulo,
  newVal => {
    id.value = Number(newVal)
    fetchProducto()
  }
)

// — Conexión al store de carrito —
// cart: objeto con estado y acciones (add, remove, etc.).
const cart = useCartStore()

// — Función comprar —
// Se invoca al pulsar el botón “Comprar”.
// Añade el objeto datos.value al array items del store.
function comprar() {
  if (datos.value) {
    cart.add(datos.value)
  }
}

// — Handlers para Paginación —
// getDataPrev: decrementa id, navega a la ruta anterior si id>1.
function getDataPrev() {
  if (id.value > 1) {
    id.value--
    router.push(`/${id.value}`)
  }
}
// getDataNext: incrementa id, navega a la ruta siguiente si id<20.
function getDataNext() {
  if (id.value < 20) {
    id.value++
    router.push(`/${id.value}`)
  }
}
</script>

<template>
  <!-- Mostrar estado de carga -->
  <h1 v-if="cargando">Cargando…</h1>

  <!-- Mostrar mensaje de error si falla la petición -->
  <h1 v-else-if="error">Error de conexión</h1>

  <!-- Sólo renderizar detalle cuando datos ya están disponibles -->
  <div v-else-if="datos">
    <!-- Título del producto -->
    <h2>{{ datos.title }}</h2>

    <!-- Imagen del producto con tamaño fijo -->
    <img
      :src="datos.image"
      alt="Imagen producto"
      width="250"
      height="250"
    />

    <!-- Descripción y precio -->
    <p>{{ datos.description }}</p>
    <p><strong>Precio:</strong> ${{ datos.price }}</p>

    <!-- Botón “Comprar”: llama a la función comprar() -->
    <button @click="comprar">Comprar</button>

    <!-- Componente Volver: retorna a la vista Home -->
    <Volver />

    <!-- Componente Paginación:
         - Emite eventos getDataPrev y getDataNext
         - Props disabled-prev/disabled-next controlan estado disabled -->
    <Paginacion
      :id="id"
      @getDataPrev="getDataPrev"
      @getDataNext="getDataNext"
      :disabled-prev="id <= 1"
      :disabled-next="id >= 20"
    />
  </div>
</template>

<style>
/* Estilos para la imagen: bloque y margen */
img {
  display: block;
  margin: 1rem 0;
}

/* Estilos básicos para botones */
button {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>
