<template>
  <div class="login">
    <div class="welcome-text" :style="{ color: '#000E89' }">
      <v-spacer class="spacer"></v-spacer>
      <h1 class="mt-15 pb-15 text-center">Welcome Back!</h1>
    </div>
      <LoginCard/>
  </div>
</template>

<script>
import LoginCard from '@/components/LoginCard.vue'

export default {
  name: 'Log-in',
  components: {
    LoginCard
  }
}
</script>

<style scoped>
.spacer{
  height: 100px;
}
</style>
