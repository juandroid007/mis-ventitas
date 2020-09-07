<script lang="ts">
  import type { Status } from './lib'
  export let editor: Status = 'closed'
  import { fade } from 'svelte/transition'

  import { db } from '../../lib/firebase'
  import { Quincena } from '../../lib/models/quincena'

  const dbRef = db.collection('quincenas')

  let action: string
  let title: string
  $: switch(editor) {
    case 'update':
      title = `Actualizar quincena creada el ${quincena.createdFmt()}`
      action = 'Actualizar'
      if (!fechaFormatted) {
        fechaFormatted = quincena.fechaFmt()
      }
      break
    case 'create':
      title = 'Crear una nueva quincena'
      action = 'Crear'
      break
  }

  export let quincena: Quincena = new Quincena()
  export let uid: string
  export let fechaFormatted: string

  function add() {
    if (!quincena.nombre) {
      quincena.nombre = 'Sin nombre asignado'
    }
    quincena.fecha = new Date(fechaFormatted)
    dbRef.add({ ...quincena, uid, created: new Date() }).then(() => {
      cancel()
    }).catch(err => {
      alert('Ups, ha ocurrido un error, Juan tiene que revisar la consola :(')
      console.log(err)
    })
  }

  function update() {
    dbRef.doc(quincena.id).update({ ...quincena, fecha: new Date(fechaFormatted) }).then(() => {
      cancel()
    }).catch(err => {
      alert('Ups, ha ocurrido un error, Juan tiene que revisar la consola :(')
      console.log(err)
    })
  }

  const hoy = () => {
    fechaFormatted = new Date().toISOString().substr(0,10)
  }

  const commit = () => {
    if (!fechaFormatted) {
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
    fechaFormatted = null
    quincena = null
  }
</script>

{#if editor !== 'closed'}
  <div class="flex flex-col p-6 m-auto border shadow-xl rounded-xl lg:w-6/10" in:fade={{duration: 200}}>
    <h1 class="mb-4 text-2xl">{title}</h1>
    <label for="nombre" class="input-label">Nombre (opcional)</label>
    <input id="nombre" type="text" class="mb-6 input" bind:value={quincena.nombre}>
    <label for="fecha" class="input-label">Fecha</label>
    <div class="flex flex-col">
      <input id="fecha" type="date" class="mb-4 input" bind:value={fechaFormatted}>
      <button class="mb-6 ml-auto btn-sm btn-sky" on:click={hoy}>Colocar fecha de hoy</button>
    </div>
    <div class="ml-auto -m-2">
      <button class="m-2 btn btn-pinky" on:click={commit}>{action}</button>
      <button class="m-2 btn btn-sky" on:click={cancel}>Cancelar</button>
    </div>
  </div>
{/if}
