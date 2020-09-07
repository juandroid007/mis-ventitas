<script lang="ts">
  import { url } from '@roxi/routify/runtime'
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  import { db } from '../lib/firebase'
  import { collectionData } from 'rxfire/firestore'

  import { Quincena } from '../lib/models/quincena'

  let time = new Date()
  let greetings: string

  const days = [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
  ]

  $: dayName = days[time.getDay()]
  $: day = time.getDate()
  $: month = time.getMonth() + 1
  $: year = time.getFullYear()
  $: hours = time.getHours()
  $: minutes = time.getMinutes()
  $: seconds = time.getSeconds()

  let meridian: string

  $: {
    if (hours < 12) {
      meridian = 'am'
      greetings = '🌄 Buenos días'
    }
    if (hours == 12) {
      meridian = 'm'
      greetings = '🍛 Buen provecho'
    }
    if (hours > 12) {
      meridian = 'pm'
      greetings = '🌇 Buenas tardes'
    }
    if (hours > 18) { greetings = '🌃 Buenas noches' }
  }

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date()
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  })

  export let scoped: any
  $: uid = scoped?.uid

  let loaded = false
  let quincena: Quincena
  $: query = db.collection('quincenas').where('uid', '==', uid).orderBy('created',  'desc')
  $: collectionData(query, 'id').subscribe(q => {
    loaded = true
    if (q[0]) {
      quincena = Quincena.fromObservable(q[0])
    }
  })
</script>

<h1 class="mb-6 text-4xl font-satisfy">{greetings}, morrocoyita hermosa, hoy es {dayName} {day}/{month}/{year} y son las {hours % 12 || 12}:{minutes}:{seconds} {meridian}</h1>

{#if loaded}
  {#if !quincena}
    <p class="text-xl text-gray-500">
    No hay quincenas aún, debes agregar una nueva, y para ello tienes que ir a
    <a href={$url('/quincenas')} class="link">Quincenas</a>, mi princesa hermosa
    </p>
  {:else}
    <div class="flex" in:fade={{duration: 200}}>
      <div class="p-6 border shadow-xl lg:m-auto rounded-xl">
        <h1 class="mb-4 text-2xl">Datos de la última quincena</h1>
        <div class="flex flex-col -m-4 lg:flex-row">
          <div class="block m-4">
            <div class="p input-label">Nombre</div>
            <p>{quincena.nombre}</p>
          </div>
          <div class="block m-4">
            <div class="p input-label">Fecha</div>
            <p>{quincena.fechaFmt()}</p>
          </div>
          <div class="block m-4">
            <div class="p input-label">Creada el</div>
            <p>{quincena.createdFmt()}</p>
          </div>
        </div>
      </div>
    </div>
  {/if}
{:else}
  <p class="text-xl text-gray-500">
  Cargando última quincena...
  </p>
{/if}
