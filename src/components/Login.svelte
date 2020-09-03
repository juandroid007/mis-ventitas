<script lang="ts">
  import { login } from '../lib/auth'
</script>

<div class="main">
  <h1 class="title">Mis Ventitas</h1>

  <div class="flex w-full h-full">
    <button
      on:click={login}
      class="p-6 m-auto text-xl bg-white rounded-full shadow-lg transform duration-200 hover:scale-105 hover:shadow-2xl"
    >
      Inicia sesión con Google
    </button>
  </div>
</div>

<style>
  .main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-image: linear-gradient(0deg, #6A003F, #EC008C);

    @apply font-satisfy;
  }

  .title {
    color: white;
    text-align: center;

    @apply mx-auto;
    @apply p-12;
    @apply text-5xl;
    @apply font-satisfy;
  }

  @screen lg {
    .title {
      @apply text-6xl;
    }
  }
</style>
