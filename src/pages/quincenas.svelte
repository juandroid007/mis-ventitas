<script lang="ts">
  import type { Status } from '../components/editores/lib'
  import Editor from '../components/editores/QuincenaEditor.svelte'
  import { db } from '../lib/firebase'
  import { collectionData } from 'rxfire/firestore'
  import { Quincena } from '../lib/models/quincena'

  import { fade } from 'svelte/transition'

  export let scoped: any
  let editor: Status = 'closed'
  $: uid = scoped?.uid

  let selected: Quincena

  let quincenas: Quincena[]
  let loaded = false

  const dbRef = db.collection('quincenas')

  $: query = dbRef.where('uid', '==', uid).orderBy('created',  'desc')
  $: collectionData(query, 'id').subscribe(q => {
    loaded = true
    console.log(q)
    if (q) {
      quincenas = q.map(q => Quincena.fromObservable(q))
    }
  })

  const editorAdd = () => {
    selected = new Quincena()
    editor = 'create'
  }

  const editorUpdate = (q: Quincena) => () => {
    selected = q
    editor = 'update'
  }

  const del = (id: string) => () => {
    dbRef.doc(id).delete()
  }
</script>

<h1 class="mb-6 text-4xl font-satisfy">Quincenas administradas por la princesa ✨</h1>

{#if loaded}
  <Editor bind:quincena={selected} {uid} bind:editor={editor} />

  {#if editor == 'closed'}
    {#if quincenas?.length}
      <div class="flex flex-col" in:fade={{duration: 200}}>
        <div class="quincenas">
          <ul>
            {#each quincenas as q, idx}
              <li>
                <strong>{idx + 1}</strong> - <strong>{q.fechaFmt()}</strong> - {q.nombre} - Creado el <strong>{q.createdFmt()}</strong> - <button class="link" on:click={editorUpdate(q)}>Actualizar</button> - <button class="link" on:click={del(q.id)}>Eliminar</button>
              </li>
            {/each}
          </ul>
        </div>
        <button class="mt-4 ml-auto btn btn-pinky" on:click={editorAdd}>Agregar nueva quincena</button>
      </div>
    {:else}
      <p class="text-xl text-gray-500">
      No hay quincenas aún, debes <button class="link" on:click={editorAdd}>agregar</button> una nueva, mi amor
      </p>
    {/if}
  {/if}
{:else}
  <p class="text-xl text-gray-500">
  Cargando quincenas...
  </p>
{/if}

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
