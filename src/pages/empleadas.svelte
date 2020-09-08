<script lang="ts">
  import type { Status } from '../components/editores/lib'
  import type { Order } from '../lib/stuff/order'
  import Editor from '../components/editores/EmpleadaEditor.svelte'
  import { db } from '../lib/firebase'
  import { collectionData } from 'rxfire/firestore'
  import { Empleada } from '../lib/models/empleada'

  import { fade } from 'svelte/transition'

  export let scoped: any
  let editor: Status = 'closed'
  $: uid = scoped?.uid

  let selected: Empleada

  let empleadas: Empleada[]
  let loaded = false

  let order: Order = 'desc'

  $: orderTxt = order == 'desc' ? 'nuevos primero' : 'antiguos primero'

  const dbRef = db.collection('empleadas')

  const changeOrder = () => {
    if (order == 'desc') {
      order = 'asc'
    } else {
      order = 'desc'
    }
  }

  $: query = dbRef.where('uid', '==', uid).orderBy('created',  order)
  $: collectionData(query, 'id').subscribe(q => {
    loaded = true
    console.log(q)
    if (q) {
      empleadas = q.map(q => Empleada.fromObservable(q))
    }
  })

  const editorAdd = () => {
    selected = new Empleada()
    editor = 'create'
  }

  const editorUpdate = (q: Empleada) => () => {
    selected = q
    editor = 'update'
  }

  const del = (id: string) => () => {
    dbRef.doc(id).delete()
  }
</script>

<h1 class="mb-6 text-4xl font-satisfy">Empleadas que trabajan para la princesa ✨</h1>

{#if loaded}
  <Editor bind:empleada={selected} {uid} bind:editor={editor} />

  {#if editor == 'closed'}
    {#if empleadas?.length}
      <div class="flex flex-col" in:fade={{duration: 200}}>
        <div class="empleadas">
          <ul>
            {#each empleadas as e}
              <li>
                <div class="justify-between details">
                  <div class="detail">
                    <div class="input-label">Nombre</div>
                    <p>{e.nombre}</p>
                  </div>
                  <div class="detail">
                    <div class="p input-label">Agregada el</div>
                    <p>{e.createdFmt()}</p>
                  </div>
                  <div class="detail">
                    <div class="p input-label">Acciones</div>
                    <button class="link" on:click={editorUpdate(e)}>Actualizar</button> - <button class="link" on:click={del(e.id)}>Eliminar</button>
                  </div>
                </div>
              </li>
            {/each}
          </ul>
        </div>
        <div class="flex items-center justify-end my-4 -mx-2">
          <div class="mx-2 text-sm">Orden: <span class="text-pinky">{orderTxt}</span></div>
          <button class="mx-2 btn-sm btn-sky" on:click={changeOrder}>Cambiar orden</button>
        </div>
        <div class="flex lg:ml-auto">
          <button class="w-full btn btn-pinky" on:click={editorAdd}>Agregar nueva empleada</button>
        </div>
      </div>
    {:else}
      <p class="text-xl text-gray-500">
      No hay empleadas aún, debes <span class="line-through">esclavizar</span> <button class="link" on:click={editorAdd}>agregar</button> una nueva, mi amor
      </p>
    {/if}
  {/if}
{:else}
  <p class="text-xl text-gray-500">
  Cargando empleadas...
  </p>
{/if}

<style>
  .empleadas {
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
    @apply py-4;
    @apply border-b;
  }

  li:first-child {
    @apply pt-0;
    @apply pb-4;
  }

  li:last-child {
    @apply pb-0;
    @apply border-0;
  }
</style>
