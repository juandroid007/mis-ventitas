<script lang="ts">
  import Navbar from '../components/navigation/Navbar.svelte'

  let sidebarOpen = false
  let padding: number
</script>

<main class="flex flex-col min-h-screen bkg font-custom">
  <div class="flex-grow">
    <Navbar bind:sidebar={sidebarOpen} bind:height={padding}/>

    <div class="container py-12" style="margin-top: {padding}px">
      <slot/>
    </div>
  </div>
</main>

<style>
  main {
    overflow-x: hidden;
    /* Unnecessary IMHO, uncomment next line to force hidden behavior */
    /* overflow-x: hidden !important; */
    /* Additional tunning proposed by the community */
    position: relative;
    width: 100%;
  }
</style>
