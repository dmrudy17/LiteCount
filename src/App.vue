<template>
  <v-app style="background-color: #F7FBFE">
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

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

