<script>
  import Hamburger from './Hamburger.svelte'
  import Sidebar from "./Sidebar.svelte"

  export let sidebar = false
  export let height = 0

  let navbar

  let y

  $: height = navbar ? navbar.offsetHeight : 0
</script>

<svelte:window bind:scrollY={y}/>

<header class="fixed z-10 w-full shadow bg-pinky">
  <Sidebar bind:open={sidebar}/>
  <div class="flex items-center justify-between p-4 text-white" bind:this={navbar}>
    <nav class="flex">
      <a href="/" class="text-4xl font-satisfy">Mis Ventitas</a>
    </nav>

    <Hamburger bind:open={sidebar}/>
  </div>
</header>

<style>
  header {
    transition: all 0.3s ease-in-out;
  }
</style>
