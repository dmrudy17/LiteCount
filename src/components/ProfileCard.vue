<template>
  <v-card
    class="mx-auto mt-8"
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
      @click ="remove()"
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
        .doc(user.uid)
        .get()
        .then(doc => {
          this.name = doc.data().name;
          this.email = doc.data().email;
        })
      }
    })
  },

  methods: {
    async remove(){
      alert("WARNING: APPROACHING TO DELETING ACCOUNT");
      if (confirm("Are you sure you want to delete your account?")) {
      const dbStore = firebase.firestore();
      
      dbStore.collection("Clients").doc("Litehouse").collection("Users").doc(firebase.auth().currentUser.uid).delete()
      .then(() => {
        firebase.auth().currentUser.delete()
        this.$router.push('/');
      })
      }
    },
}

};
</script>
