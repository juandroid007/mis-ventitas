<script lang="ts">
  import { url } from '@roxi/routify/runtime';
</script>

<style>
  .huge {
    font-size: 12rem;
  }

  .e404 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
</style>

<div class="e404">
  <div class="huge font-satisfy">404</div>
  <div class="big">
    Página no encontrada,
    <!-- link to the parent folder of _fallback.svelte -->
    <a href={$url('/')} class="underline">ir al inicio</a>
  </div>
</div>
