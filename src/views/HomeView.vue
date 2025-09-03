<script setup>
// — Importamos RouterLink para navegar entre rutas sin recargar la página
import { RouterLink } from "vue-router"

// — Importamos nuestro composable useGetData que gestiona peticiones, loading y errores
import { useGetData } from '@/composables/useGetData'

// — Desestructuramos lo que nos devuelve el composable:
//    • getData(url): función para lanzar la petición GET
//    • datos: ref que contendrá la respuesta (array de productos)
//    • error: ref booleano que será true si la petición falla
//    • cargando: ref booleano que indica si la petición está en curso
const { getData, datos, error, cargando } = useGetData()

// — Lanzamos la petición al montar el componente para obtener todos los productos
getData('https://fakestoreapi.com/products/')
</script>

<template>
  <!--
    • Si cargando === true, mostramos mensaje de carga
    • v-if detiene el renderizado del resto hasta que cargando sea false
  -->
  <h1 v-if="cargando">cargando</h1>

  <!--
    • Si ya no está cargando pero error === true, mostramos mensaje de error
    • v-else-if se evalúa solo si el v-if anterior fue false
  -->
  <h1 v-else-if="error">Error de Conexion</h1>

  <!--
    • v-else-if: si no hay carga ni error, y datos existe, renderizamos la lista
    • Así evitamos intentar iterar sobre datos null o undefined
  -->
  <div v-else-if="datos">
    <ul>
      <!--
        • v-for recorre el array datos; art es cada objeto producto
        • Es obligatorio usar :key en bucles, aquí art.id serviría
      -->
      <li v-for="art in datos" :key="art.id">
        <!-- Mostramos el id de cada artículo -->
        Articulo {{ art.id }}

        <!--
          • RouterLink genera un enlace interno de Vue Router
          • :to="`/${art.id}`" construye la ruta dinámica, e.g. "/3"
        -->
        <router-link :to="`/${art.id}`">
          <!--
            • :src enlaza la imagen del producto art.image
            • <br> fuerza salto de línea tras la imagen
          -->
          <img :src="art.image" alt="Imagen artículo" /><br>
        </router-link>
      </li>
    </ul>
  </div>

  <!--
    • Aquí podrías insertar paginación si quisieras mostrar datos de 20 en 20
    • El componente <Paginacion> está comentado porque no lo usamos en Home
  -->
  <!-- <Paginacion :datos="datos" @getDataPrev="getDataPrev" @getDataNext="getDataNext" />-->
</template>

<style>
/* 
  • Estilos globales para todas las imágenes dentro de este componente
  • width y height fijos a 200px para mantener la cuadrícula uniforme
*/
img {
  width: 200px;
  height: 200px;
}
</style>
