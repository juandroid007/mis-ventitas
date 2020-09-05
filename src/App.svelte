<script lang="ts" context="module">
  import { user } from './lib/auth'
</script>

<script lang="ts">
  import Login from './components/Login.svelte'
  import Spinner from './components/Spinner.svelte'

  import { Router, isChangingPage } from '@roxi/routify/runtime'
  import { routes } from '../.routify/routes'

  import NProgress from 'nprogress'

  NProgress.configure({
    // Pass in your configuration here, below is just how I like it
    // Full list: https://github.com/rstacruz/nprogress#configuration
    minimum: 0.16,
    showSpinner: false,
  })

  $: {
    if ($isChangingPage) {
      NProgress.start()
    }

    if (!$isChangingPage) {
      NProgress.done()
    }
  }
</script>

{#if $user !== undefined}
  {#if $user}
    <Router {routes} />
  {:else}
    <Login/>
  {/if}
{:else}
  <div class="flex w-full h-screen">
    <div class="loading">
      <div class="center">
        <Spinner/>
      </div>
    </div>
  </div>
{/if}

<style>
  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
  }
</style>
