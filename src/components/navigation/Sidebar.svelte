<script>
  import { logout } from '../../lib/auth'
  import elements from '../../lib/navigation'
  export let open = true

  let inside

  const separatorClass = 'block my-4 border-t w-full border-black'

  function handleClick() {
    if (!inside && open) {
      //open = false
    }
  }
</script>

<svelte:window on:click={handleClick}/>

<aside
  on:mouseenter={() => inside = true}
  on:mouseleave={() => inside = false}
  class="absolute h-screen shadow-2xl bg-sky-100"
  class:open
>
  <nav class="p-12 pt-16 text-xl">
    <!--span class={separatorClass}></span-->

    {#each elements as el}
      {#if el.separator}
        <span class={separatorClass}></span>
      {/if}
      <a class="block py-1 duration-200 hover:text-gray-600" rel={el.rel} href={el.href}>{el.titulo}</a>
    {/each}

    <span class={separatorClass}></span>
    <button class="block py-1 duration-200 hover:text-gray-600" on:click={logout}>Cerrar sesión</button>
  </nav>
</aside>

<style>
  aside {
    right: -100%;
    transition: right 0.3s ease-in-out;
  }

  .open {
    right: 0;
  }
</style>
