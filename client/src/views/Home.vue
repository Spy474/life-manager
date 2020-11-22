<template>
  <section class="hero mt-6 is-light">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">Authentification for Newbs</h1>
        <h2 class="subtitle">Learning auth is fun!</h2>
        <router-link class="button" :to="{ name: 'Signup' }" role="button"
          >Sign Up</router-link
        >
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
};
</script>
