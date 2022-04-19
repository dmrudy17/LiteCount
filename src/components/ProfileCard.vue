<template>
  <v-card
    class="mx-auto"
    max-width="600"
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
            color="#000E89"
            size="134"
            tile
          >
            <v-icon dark size="114" class="ml-3">
              mdi-account-circle
            </v-icon>
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
            <v-expand-transition>
    <v-btn
      color="primary"
      depressed
      class="mr-5 mb-5"
      @click ="remove();AuthRemove()"
    >
      Delete Account
    </v-btn>
    </v-expand-transition>
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
          users: [],
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
            this.name = user.name;
            this.email = user.email;
          } else {
            console.log("No user found");
          }
        })
      }
    })
  },

  methods: {
    remove(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        firebase.firestore()
        .collection("Clients")
        .doc("Litehouse")
        .collection("Users")
        .doc(user.uid)
        .get()
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              console.log(user.uid);
              firebase.firestore()
              .collection("Clients")
              .doc("Litehouse")
              .collection("Users")
              .doc(user.uid).delete()
            }

        })
        }
      })
  },
  async AuthRemove(){
    await firebase.auth().currentUser.delete()
    this.$router.push('/');
  }
}

};
</script>
