<template>
  <v-app>
    <NavBar v-if="!$route.meta.hideNavbar" />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'App',
  components: { NavBar },
  data: () => ({
    //
  }),
};
</script>

<style>
#app {
  font-family: 'Poppins', sans-serif;
  background-color: #F7FBFE;
}
</style>
