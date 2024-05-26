<template>
  <div class="home">
    <AppLeaderboard />
  </div>
</template>

<script>
// @ is an alias to /src
import AppLeaderboard from '@/components/AppLeaderboard.vue'

export default {
  name: 'HomeView',
  components: {
    AppLeaderboard
  }
}
</script>
