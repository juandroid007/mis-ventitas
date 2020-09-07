<script lang="ts">
  import { user } from '../lib/auth'

  import Login from '../components/Login.svelte'
  import Spinner from '../components/Spinner.svelte'

  import Navbar from '../components/navigation/Navbar.svelte'

  let sidebarOpen = false
  let padding: number

  import { isChangingPage } from '@roxi/routify/runtime'

  import NProgress from 'nprogress'

  NProgress.configure({
    // Pass in your configuration here, below is just how I like it
    // Full list: https://github.com/rstacruz/nprogress#configuration
    minimum: 0.16,
    showSpinner: false,
  })

  $: {
    if ($isChangingPage) {
      sidebarOpen = false
      NProgress.start()
    }

    if (!$isChangingPage) {
      NProgress.done()
    }
  }
</script>

{#if $user !== undefined}
  {#if $user}
    <main class="flex flex-col min-h-screen bkg font-custom">
      <div class="flex-grow">
        <Navbar bind:sidebar={sidebarOpen} bind:height={padding}/>

        <div class="container py-12" style="margin-top: {padding}px">
          <slot scoped={{uid: $user.uid}}/>
        </div>
      </div>
    </main>
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
  main {
    overflow-x: hidden;
    /* Unnecessary IMHO, uncomment next line to force hidden behavior */
    /* overflow-x: hidden !important; */
    /* Additional tunning proposed by the community */
    position: relative;
    width: 100%;
  }

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
