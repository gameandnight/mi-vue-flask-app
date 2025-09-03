// src/composables/useGetData.js

// Importamos axios para realizar peticiones HTTP
import axios from 'axios'

// Importamos ref de Vue para crear variables reactivas
import { ref } from 'vue'

// Exportamos el composable useGetData para reutilizar lógica de fetch en varios componentes
export const useGetData = () => {
    // datos: contendrá la respuesta de la API (inicialmente null)
    const datos = ref(null)

    // error: bandera que indica si ocurrió un error en la petición (inicialmente false)
    const error = ref(false)

    // cargando: bandera que indica si la petición está en curso (inicialmente true)
    const cargando = ref(true)

    /**
     * getData: función asíncrona para obtener datos desde una URL
     * @param {string} url - endpoint al que haremos la petición GET
     */
    const getData = async (url) => {
        try {
            // Antes de la petición, podrías resetear estados si fuera necesario:
            // error.value = false
            // cargando.value = true

            // Hacemos la petición GET con axios
            const resultado = await axios.get(url)

            // Al resolverse correctamente, guardamos los datos recibidos
            datos.value = resultado.data
        } catch (e) {
            // Si hay un fallo (network, 4xx/5xx, etc.), lo mostramos en consola
            console.error('Error al obtener datos:', e)

            // Marcamos la bandera de error para que los componentes la detecten
            error.value = true
        } finally {
            // Se ejecuta siempre, haya error o no, para desactivar el indicador de carga
            cargando.value = false
        }
    }

    // Devolvemos las referencias y la función para que otros componentes las usen
    return {
        getData,    // función para lanzar la petición
        datos,      // datos reactivos con la respuesta
        error,      // indicador de fallo
        cargando    // indicador de carga
    }
}
