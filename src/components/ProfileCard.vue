<template>
  <v-card
    class="mx-auto"
    max-width="1000"
    tile
  >
    <v-img
      height="100%"
      src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
    >
      <v-row
        align="end"
        class="fill-height"
      >
        <v-col
          align-self="start"
          class="pa-0"
          cols="12"
        >
          <v-avatar
            class="profile"
            color="grey"
            size="284"
            tile
          >
            <v-img src="assets/ava2.jpg"></v-img>
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-list-item three-line
            color="rgba(0, 0, 0, .4)"
            dark
            >
            <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1">
                  Name: {{name}}
                </v-list-item-title>
                <v-list-item-title class="text-h5 mb-1">
                  Email: {{email}}
                </v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default {
  name: "ProfileCard",
  data(){
      return{
          name:null,
          email:null,
      }
  },
  beforeMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.firestore()
        .collection("Clients")
        .doc("Litehouse")
        .collection("Users")
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const user = querySnapshot.docs[0].data()
            console.log(user);
            this.name = user.name;
            this.email = user.email;
            console.log(this.email);
            console.log(this.name);
          } else {
            console.log("No user found");
          }
        })
      }
    })
  },

};
</script>
