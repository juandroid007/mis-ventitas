<script lang="ts">
  import type { Status } from './lib'
  export let editor: Status = 'closed'
  import { fade } from 'svelte/transition'

  import { db } from '../../lib/firebase'
  import { Empleada } from '../../lib/models/empleada'

  const dbRef = db.collection('empleadas')

  let action: string
  let title: string
  $: switch(editor) {
    case 'update':
      title = `Actualizar datos de empleada creada el ${empleada.createdFmt()}`
      action = 'Actualizar'
      break
    case 'create':
      title = 'Agregar una nueva empleada'
      action = 'Agregar'
      break
  }

  export let empleada: Empleada = new Empleada()
  export let uid: string

  function add() {
    if (!empleada.nombre) {
      empleada.nombre = 'Sin nombre asignado'
    }
    dbRef.add({ ...empleada, uid, created: new Date() }).then(() => {
      cancel()
    }).catch(err => {
      alert('Ups, ha ocurrido un error, Juan tiene que revisar la consola :(')
      console.log(err)
    })
  }

  function update() {
    dbRef.doc(empleada.id).update({ ...empleada }).then(() => {
      cancel()
    }).catch(err => {
      alert('Ups, ha ocurrido un error, Juan tiene que revisar la consola :(')
      console.log(err)
    })
  }

  const commit = () => {
    if (!empleada.nombre) {
      alert('Primero debes llenar todos los campos obligatorios, mi amor :(')
      return
    }
    switch(editor) {
      case 'update':
        update()
        break
      case 'create':
        add()
        break
    }
  }

  const cancel = () => {
    editor = 'closed'
    empleada = null
  }
</script>

{#if editor !== 'closed'}
  <div class="flex flex-col p-6 m-auto border shadow-xl rounded-xl lg:w-6/10" in:fade={{duration: 200}}>
    <h1 class="mb-4 text-2xl">{title}</h1>
    <label for="nombre" class="input-label">Nombre</label>
    <input id="nombre" type="text" class="mb-6 input" bind:value={empleada.nombre}>
    <div class="ml-auto -m-2">
      <button class="m-2 btn btn-pinky" on:click={commit}>{action}</button>
      <button class="m-2 btn btn-sky" on:click={cancel}>Cancelar</button>
    </div>
  </div>
{/if}
