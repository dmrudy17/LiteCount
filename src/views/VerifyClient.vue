<template>
  <div class="login">
    <div class="welcome-text" :style="{ color: '#000E89' }">
      <v-spacer class="spacer"></v-spacer>
      <h1 class="mt-15 pb-15 text-center">Let's Get Started</h1>
    </div>
      <VerifyCard/>
  </div>
</template>

<script>
import VerifyCard from '@/components/VerifyCard.vue'

export default {
  name: 'VerifyClient',
  components: {
    VerifyCard
  }
}
</script>

<style scoped>
.spacer{
  height: 100px;
}
</style>
