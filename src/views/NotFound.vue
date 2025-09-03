<template>
  <!-- Página 404 amigable -->
  <section class="section">
    <div class="container has-text-centered">
      <h1 class="title">404 — Página no encontrada</h1>
      <p class="subtitle">Lo sentimos, no se ha encontrado la página que buscas.</p>

      <div style="margin-top: 1rem;">
        <!-- Usamos el nombre de la ruta 'home' tal como figura en tu router -->
        <router-link :to="{ name: 'home' }" class="button is-primary">
          Volver al inicio
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.container { padding: 3rem 1rem; }
</style>
