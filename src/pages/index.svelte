<script lang="ts">
  import { onMount } from "svelte";

  let time = new Date()
  let greetings: string

  $: hours = time.getHours()
  $: minutes = time.getMinutes()
  $: seconds = time.getSeconds()

  $: {
    if (hours < 12) { greetings = '🌄 Buenos días' }
    if (hours == 12) { greetings = '🍛 Buen provecho' }
    if (hours > 12) { greetings = '🌇 Buenas tardes' }
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
</script>

<h1 class="text-4xl font-satisfy">{greetings}, morrocoyita hermosa, son las {hours}:{minutes}:{seconds}</h1>
