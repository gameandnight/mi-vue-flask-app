<script setup>
// — Importamos componentes de Vue Router —
// RouterLink: componente para enlaces que no recargan la página.
// RouterView: área donde se renderiza la vista según la ruta activa.
import { RouterLink, RouterView } from 'vue-router'

// — Importamos un componente de ejemplo —
// HelloWorld no se usa en la plantilla, pero viene por defecto en la plantilla Vue.
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- Cabecera fija en todas las páginas -->
  <header>
    <div class="wrapper">
      <!-- Título principal de la aplicación -->
      <h1>Articulos de compra</h1>

      <!-- Navegación principal -->
      <nav>
        <!--
          • RouterLink to="/": enlace a la ruta home
          • router-link-exact-active: clase automática cuando la ruta coincide exactamente
        -->
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/carroCompra">Carro compra</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <!--
    • Aquí se renderizará el componente asociado a la ruta actual:
    • HomeView, ArticuloView, CarroCompra o AboutView.
  -->
  <RouterView />
</template>

<style scoped>
/* — Estilos para el header — */
header {
  line-height: 1.5;       /* Altura de línea para legibilidad */
  max-height: 100vh;      /* Evita que el header exceda la altura de la ventana */
}

/* — Clase wrapper: contenedor interno — */
.wrapper {
  padding: 1rem;          /* Espacio interno alrededor del contenido */
}

/* — Estilos de navegación — */
nav {
  width: 100%;            /* Ocupa todo el ancho disponible */
  font-size: 12px;        /* Tamaño de fuente base en móvil */
  text-align: center;     /* Centra los enlaces */
  margin-top: 2rem;       /* Separación sobre la nav */
}

/* — Enlace activo — */
nav a.router-link-exact-active {
  color: var(--color-text);        /* Color del texto activo */
}
nav a.router-link-exact-active:hover {
  background-color: transparent;   /* Sin fondo al hacer hover */
}

/* — Estilo de cada enlace — */
nav a {
  display: inline-block;           /* Se alinean en línea con padding */
  padding: 0 1rem;                 /* Espacio horizontal interno */
  border-left: 1px solid var(--color-border); /* Separador entre enlaces */
}
/* Quitar borde al primer enlace */
nav a:first-of-type {
  border: 0;
}

/* — Responsive: a partir de 1024px de ancho — */
@media (min-width: 1024px) {
  /* Header como flex container */
  header {
    display: flex;
    place-items: center;            /* Alinea verticalmente */
    padding-right: calc(var(--section-gap) / 2);
  }

  /* Ajustes del contenedor wrapper en escritorio */
  header .wrapper {
    display: flex;
    place-items: flex-start;       /* Alinea al inicio vertical */
    flex-wrap: wrap;               /* Permite que los elementos bajen de línea */
  }

  /* Navegación en escritorio */
  nav {
    text-align: left;              /* Alinea texto a la izquierda */
    margin-left: -1rem;            /* Ajusta separación izquierda */
    font-size: 1rem;               /* Tamaño de fuente mayor */
    padding: 1rem 0;               /* Espacio vertical interno */
    margin-top: 1rem;              /* Margen superior */
  }
}
</style>
