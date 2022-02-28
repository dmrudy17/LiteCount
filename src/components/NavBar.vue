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
      <div v-if="!signedIn">
        <v-btn dark color="#000E89">
          <span @click="logIn()">Sign In</span>
        </v-btn>
      </div>
      <div v-else>
        <v-btn color="grey">
          <span @click="logOut()">Log Out</span>
        </v-btn>
      </div>
    </v-app-bar>
  </nav>
</template>


<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default {
  data: () => ({
    signedIn: false
  }),

    beforeMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if(user)
            {
              this.signedIn = true
            }
            else if(!user)
            {
              this.signedIn = false
            }
        })
  },

  methods: {
    logIn()
    {
      this.$router.push('/login'); 
    },

    logOut()
    {
      firebase
        .auth()
        .signOut()
        .then(()=> console.log("Signed out"))
        .catch(err => alert(err.message));
    }
  }


}
</script>

<style scoped>
.icon {
  color: #FF5E00;
  margin-bottom: 2px;
}
</style>
