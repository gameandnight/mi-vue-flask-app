// src/stores/cart.js

// Importamos defineStore para crear un store de Pinia
// y ref, computed, watch de Vue para manejar reactividad y sincronización
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// Definimos el store global 'cart'
export const useCartStore = defineStore('cart', () => {
    // — Inicializar desde localStorage (si existe) o array vacío —
    const stored = localStorage.getItem('cart-items')
    const items = ref(stored ? JSON.parse(stored) : [])

    // — Sincronizar cambios de items en localStorage —
    watch(
        items,
        (val) => {
            localStorage.setItem('cart-items', JSON.stringify(val))
        },
        { deep: true }
    )

    // — Acción: añadir un producto al carrito —
    function add(product) {
        // Si ya existe una línea con este producto, incrementamos su cantidad
        const existing = items.value.find(line => line.product.id === product.id)
        if (existing) {
            existing.quantity++
        } else {
            // Si no existe, añadimos nueva línea con cantidad 1
            items.value.push({ product, quantity: 1 })
        }
    }

    // — Acción: eliminar una línea por su índice —
    function remove(index) {
        items.value.splice(index, 1)
    }

    // — Acción: incrementar la cantidad de la línea index —
    function increment(index) {
        items.value[index].quantity++
    }

    // — Acción: decrementar la cantidad de la línea index —
    function decrement(index) {
        if (items.value[index].quantity > 1) {
            items.value[index].quantity--
        }
    }

    // — Getter: subtotal de una línea dada por index —
    const subtotal = (index) =>
        computed(() =>
            (items.value[index].quantity * items.value[index].product.price).toFixed(2)
        )

    // — Getter: total de todas las líneas del carrito —
    const total = computed(() =>
        items.value
            .reduce((sum, line) => sum + line.quantity * line.product.price, 0)
            .toFixed(2)
    )

    // Exponemos el estado, acciones y getters para usar en componentes
    return {
        items,
        add,
        remove,
        increment,
        decrement,
        subtotal,
        total
    }
})
