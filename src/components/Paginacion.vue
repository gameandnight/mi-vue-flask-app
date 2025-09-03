<script setup>
// — defineEmits: declaramos los eventos que este componente puede emitir
//   • 'getDataPrev': petición para ir al artículo anterior
//   • 'getDataNext': petición para ir al artículo siguiente
const emit = defineEmits(['getDataPrev', 'getDataNext'])

// — defineProps: declaramos las propiedades que recibe el componente
const props = defineProps({
  // id: número de artículo actual (se usa solo como referencia, no para lógica interna)
  id: {
    type: Number,
    required: true
  },
  // disabledPrev: controla si el botón “Anterior” debe estar deshabilitado
  disabledPrev: {
    type: Boolean,
    default: false
  },
  // disabledNext: controla si el botón “Siguiente” debe estar deshabilitado
  disabledNext: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <!--
    Botón “Anterior”
    • :disabled enlaza la propiedad disabledPrev para desactivar el botón en el límite
    • @click emite el evento getDataPrev hacia el padre
  -->
  <button
    :disabled="props.disabledPrev"
    @click="emit('getDataPrev')"
  >
    Anterior
  </button>

  <!--
    Botón “Siguiente”
    • :disabled enlaza la propiedad disabledNext para desactivar el botón en el límite
    • @click emite el evento getDataNext hacia el padre
  -->
  <button
    :disabled="props.disabledNext"
    @click="emit('getDataNext')"
  >
    Siguiente
  </button>
</template>

<style scoped>
/* Estilo base para ambos botones */
button {
  margin: 0.5rem;           /* espacio exterior alrededor */
  padding: 0.4rem 0.8rem;    /* espacio interior (vertical u horizontal) */
  border-radius: 4px;        /* esquinas redondeadas */
  cursor: pointer;           /* cursor de mano al pasar por encima */
}

/* Estilo adicional cuando el botón está deshabilitado */
button:disabled {
  opacity: 0.5;              /* semitransparente para indicar estado inactivo */
  cursor: not-allowed;       /* cursor de “prohibido” */
}
</style>
