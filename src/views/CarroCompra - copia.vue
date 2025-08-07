<script setup>
// — Importamos computed para posibles cálculos derivados (aunque aquí usamos métodos del store) —
import { computed } from 'vue'

// — Importamos el store de Pinia donde guardamos el carrito —
// useCartStore nos da acceso a las líneas, totales y acciones (add, remove, increment, decrement).
import { useCartStore } from '@/stores/cart'

// — Importamos el componente Volver para regresar a Home —
import Volver from '@/components/Volver.vue'

// — Obtenemos la instancia del carrito —
// cart.items: array de líneas { product, quantity }
// cart.subtotal(i): método que devuelve el subtotal de la línea i
// cart.total: total de todas las líneas
const cart = useCartStore()
</script>

<template>
  <!-- Título de la vista -->
  <h1>Tu Carrito</h1>

  <!--
    • Si hay al menos una línea en el carrito, mostramos la tabla
    • v-if="cart.items.length" comprueba que el array no esté vacío
  -->
  <table v-if="cart.items.length">
    <thead>
      <tr>
        <!-- Cabeceras de cada columna -->
        <th>Artículo</th>
        <th>Unidades</th>
        <th>Subtotal</th>
        <th>Imagen</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <!--
        • v-for itera sobre cart.items
        • line es el objeto { product, quantity }
        • i es el índice, usado como key (único por fila)
      -->
      <tr v-for="(line, i) in cart.items" :key="i">
        <!-- Nombre/título del producto -->
        <td>{{ line.product.title }}</td>

        <!-- Cantidad actual -->
        <td>{{ line.quantity }}</td>

        <!-- Subtotal: quantity * price (método del store) -->
        <td>{{ cart.subtotal(i) }}</td>

        <!-- Miniatura de la imagen -->
        <td>
          <img
            :src="line.product.image"
            alt="Imagen producto"
            style="width:50px;"
          />
        </td>

        <!-- Botones para modificar la línea -->
        <td>
          <!-- Incrementar cantidad -->
          <button @click="cart.increment(i)">+</button>

          <!-- Decrementar cantidad; deshabilitado si quantity <= 1 -->
          <button
            @click="cart.decrement(i)"
            :disabled="line.quantity <= 1"
          >-</button>

          <!-- Eliminar completamente la línea -->
          <button @click="cart.remove(i)">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>

  <!--
    • Si no hay líneas, mostramos un mensaje alternativo
    • v-else se activa cuando cart.items.length === 0
  -->
  <p v-else>No hay artículos en el carrito.</p>

  <!-- Mostramos el total de todas las líneas -->
  <h3>Total: ${{ cart.total }}</h3>

  <!-- Botón para volver a Home -->
  <Volver />
</template>
