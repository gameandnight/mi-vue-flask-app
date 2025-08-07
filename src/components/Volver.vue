<script setup>
// — Importamos axios (aunque no se usa aquí, estaba en tu plantilla original) —
import axios from 'axios'

// — Importamos ref de Vue (no se usa en este componente pero venía en el boilerplate) —
import { ref } from 'vue'

// — Importamos funciones de Vue Router —
// useRoute: para leer datos de la ruta actual (no lo usamos aquí realmente)
// useRouter: para poder navegar programáticamente
import { useRoute, useRouter } from 'vue-router'

// — Importamos el composable useGetData (no lo usamos aquí, pero venía en tu plantilla) —
import { useGetData } from '@/composables/useGetData'

// — Creamos la instancia del router para poder llamar a router.push —
// router.push('/') nos permite cambiar a la ruta Home sin recargar la página
const router = useRouter()

// — Obtenemos la información de la ruta actual (aunque en este componente no la usamos) —
const route = useRoute()

// — Definimos la función “volver” —
// Al invocarse, hace router.push("/"), es decir, navega a la ruta raíz (Home)
const volver = () => {
  router.push('/') // Indicamos la ruta a la que queremos ir
}
</script>

<template>
  <!--
    • Botón que, al hacer click, ejecuta la función volver()
    • Esto nos regresa a la vista Home sin recargar la página
  -->
  <button @click="volver">Volver</button>
</template>
