<script setup>
// — Importamos computed de Vue por si necesitamos valores derivados (aunque aquí usamos los getters del store) —
import { computed } from 'vue'
// — Importamos el store del carrito para acceder a items, acciones y totales —
import { useCartStore } from '@/stores/cart'
// — Importamos el componente Volver para regresar a Home —
import Volver from '@/components/Volver.vue'

// — Instanciamos el store: cart.items es el array de líneas,
//    cart.subtotal(i) y cart.total son los getters reactivos. —
const cart = useCartStore()
</script>

<template>
  <!-- Contenedor principal con margen y ancho máximo -->
  <div class="carro-container">
    <!-- Título de la sección -->
    <h1 class="carro-title">Carro de Compra</h1>

    <!--
      • Si hay líneas en el carrito, renderizamos la tabla.
      • v-if comprueba que cart.items.length > 0.
    -->
    <table class="cart-table" v-if="cart.items.length">
      <thead>
        <tr>
          <!-- Cabeceras de las columnas -->
          <th>Artículo</th>
          <th>Unidades<br><small>(× precio)</small></th>
          <th>Subtotal</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <!--
          • Iteramos sobre cart.items con v-for.
          • line: { product, quantity }, i: índice único.
        -->
        <tr v-for="(line, i) in cart.items" :key="i">
          <!-- Título del producto, alineado a la izquierda -->
          <td class="cell-title">{{ line.product.title }}</td>

          <!-- Cantidad × precio unitario -->
          <td class="cell-units">
            {{ line.quantity }} × {{ line.product.price.toFixed(2) }}
          </td>

          <!-- Subtotal de la línea (getter computado) -->
          <td class="cell-subtotal">{{ cart.subtotal(i) }}</td>

          <!-- Imagen pequeña del producto -->
          <td class="cell-image">
            <img :src="line.product.image" alt="Producto" />
          </td>

          <!-- Botones de acción: +, -, Eliminar -->
          <td class="cell-actions">
            <!-- Incrementar cantidad -->
            <button @click="cart.increment(i)">+</button>
            <!-- Decrementar; deshabilitado si quantity ≤ 1 -->
            <button @click="cart.decrement(i)" :disabled="line.quantity <= 1">-</button>
            <!-- Eliminar línea completa -->
            <button @click="cart.remove(i)">Eliminar</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <!-- Celda que etiqueta el total -->
          <td colspan="2" class="cell-total-label">Total:</td>
          <!-- Valor total computado -->
          <td class="cell-total-value">${{ cart.total }}</td>
          <!-- Celdas vacías para mantener la estructura -->
          <td colspan="2"></td>
        </tr>
      </tfoot>
    </table>

    <!-- Mensaje alternativo si no hay artículos -->
    <p v-else class="empty-message">No hay artículos en el carrito.</p>

    <!-- Botón Volver ocupa todo el ancho disponible -->
    <Volver class="volver-btn" />
  </div>
</template>

<style scoped>
/* — Contenedor: centrado y con espacio vertical — */
.carro-container {
  width: 90%;
  max-width: 800px;
  margin: 2rem auto;
}

/* — Título principal: tamaño y color — */
.carro-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
}

/* — Tabla: bordes colapsados para un único borde entre celdas — */
.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

/* — Estilo de las cabeceras — */
.cart-table th {
  border: 1px solid #444;
  padding: 0.6rem;
  background: #f0f0f0;
  text-align: center;
}

/* — Bordes y padding en celdas de datos — */
.cart-table td {
  border: 1px solid #444;
  padding: 0.6rem;
  vertical-align: middle;
  text-align: center;
}

/* — Ajustes específicos de columnas — */
/* Título a la izquierda */
.cell-title {
  text-align: left;
  padding-left: 0.8rem;
}
/* Unidades y subtotal con ancho fijo */
.cell-units,
.cell-subtotal {
  width: 120px;
}
/* Imagen con tamaño controlado */
.cell-image img {
  width: 80px;
  height: auto;
}
/* Botones de acciones con pequeño margen interno */
.cell-actions button {
  margin: 0 0.2rem;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
}

/* — Fila de total — */
/* Etiqueta alineada a la derecha y en negrita */
tfoot .cell-total-label {
  text-align: right;
  font-weight: bold;
  padding-right: 0.8rem;
}
/* Valor del total en negrita y con borde */
tfoot .cell-total-value {
  font-weight: bold;
  border: 1px solid #444;
}

/* — Mensaje cuando el carrito está vacío — */
.empty-message {
  text-align: center;
  font-style: italic;
  margin: 1rem 0;
}

/* — Estilo del componente Volver — */
.volver-btn button {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #444;
  border-radius: 4px;
  cursor: pointer;
}
</style>
