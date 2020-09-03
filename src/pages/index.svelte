<script lang="ts">
  const hour = new Date().getHours()
  let greetings: string

  if (hour < 12) { greetings = '🌄 Buenos días' }
  if (hour == 12) { greetings = '🍛 Buen provecho' }
  if (hour > 12) { greetings = '🌇 Buenas tardes' }
  if (hour > 18) { greetings = '🌃 Buenas noches' }
</script>

<h1 class="text-4xl font-satisfy">{greetings}, morrocoyita hermosa</h1>
