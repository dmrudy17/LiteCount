<template>
  <nav>
    <v-app-bar
      fixed
      elevate-on-scroll
      color=#F7FBFE
    >
      <v-toolbar-title style="cursor: pointer" @click="$router.push('/')">
          <font-awesome-icon class="icon" icon="fa-solid fa-sailboat" />
          <span class="font-weight-bold blue--text text--darken-4">Lite</span>
          <span class="blue--text text--darken-4">Count</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="grey">
        <span>Sign Out</span>
      </v-btn>
    </v-app-bar>
  </nav>
</template>


<script>
export default {


}
</script>

<style scoped>
.icon {
  color: #FF5E00;
  margin-bottom: 2px;
}
</style>
