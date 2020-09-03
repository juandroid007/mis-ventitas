<script lang="ts">
  import { login } from '../lib/auth'
</script>

<div class="flex flex-col w-full h-screen overflow-hidden bg-pinky font-satisfy">
  <h1 class="p-12 mx-auto text-5xl text-center text-white lg:text-6xl font-satisfy">Mis Ventitas</h1>

  <div class="flex w-full h-full">
    <button
      on:click={login}
      class="p-6 m-auto text-xl bg-white rounded-full shadow-lg transform duration-200 hover:scale-105 hover:shadow-2xl"
    >
      Inicia sesión con Google
    </button>
  </div>
</div>
