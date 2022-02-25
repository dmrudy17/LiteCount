<template>
  <div class="login">
    <div class="welcome-text" :style="{ color: '#000E89' }">
      <v-spacer class="spacer"></v-spacer>
    </div>
      <SignUpCard/>
  </div>
</template>

<script>
import SignUpCard from '@/components/SignUpCard.vue'

export default {
  name: 'Sign-up',
  components: {
    SignUpCard
  }
}
</script>

<style scoped>
.spacer{
  height: 100px;
}
</style>