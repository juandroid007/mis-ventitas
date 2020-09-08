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
      <div class="w-full p-6 border shadow-xl rounded-xl">
        <h1 class="mb-4 text-2xl">Datos de la última quincenita</h1>
        <div class="justify-between details">
          <div class="detail">
            <p class="input-label">Id único</p>
            <p>{quincena.id}</p>
          </div>
          <div class="detail">
            <p class="input-label">Nombre</p>
            <p>{quincena.nombre}</p>
          </div>
          <div class="detail">
            <p class="input-label">Fecha</p>
            <p>{quincena.fechaFmt()}</p>
          </div>
          <div class="detail">
            <p class="input-label">Creada el</p>
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
