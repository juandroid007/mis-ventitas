<script lang="ts">
  import quincenas from '../lib/data/quincenas.json'
</script>

<h1 class="mb-4 text-4xl font-satisfy">Quincenas administradas por la princesa</h1>

<div class="quincenas">
  <ul>
    {#each quincenas as quincena}
      <li>
        <a href="/quincenas">{quincena.numero} - {quincena.fecha}</a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .quincenas {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: rgba(200, 200, 200, 0.1);
    @apply p-4;
    @apply rounded-xl;
    @apply shadow-inner;
    @apply border;
  }

  li {
    @apply py-1;
    @apply border-b;
  }

  li:first-child {
    @apply pt-0;
    @apply pb-1;
  }

  li:last-child {
    @apply pt-1;
    @apply pb-0;
    @apply border-0;
  }
</style>
