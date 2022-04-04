<template>
  <v-container class="mt-7">
    <v-layout row wrap>
      <v-flex
        xs12
        md4
        v-for="(user, i) in users"
        :key="i"
      >
        <v-card
          class="mb-5"
          max-width="500"
          outlined
        >
          <v-list-item three-line>
            <v-avatar
              v-if="user.isAdmin == true"
              color="#FF5E00"
              size="48"
              class="mr-5"
            >
              <span class="white--text text-h5">{{user.name[0]}}</span>
            </v-avatar>

            <v-avatar
              v-else
              color="#000E89"
              size="48"
              class="mr-5"
            >
              <span class="white--text text-h5">{{user.name[0]}}</span>
            </v-avatar>

            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                {{user.name}}
              </v-list-item-title>
              <v-list-item-subtitle v-if="user.isAdmin == true">Administrator</v-list-item-subtitle>
              <v-list-item-subtitle v-else>Employee</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn
      class="ma-2"
      color="success"
      dark
      @click="requestAddUser"
    >
      Add new user
    </v-btn>
  </v-container>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default {
  name: 'UserCard',
  data: () => ({
    users: []
  }),
  mounted: function() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      const db = firebase.firestore();
      let usersRef = db.collection('Clients').doc("Litehouse").collection("Users");

      usersRef.get().then(userSnapshot => {
        userSnapshot.forEach(doc => {
          const user = doc.data();
          user.id = doc.id;
          this.users.push(user);
        })
      })
    },
    isAdmin(user) {
      console.log(user.isAdmin);
      if(user.isAdmin == true) {
        return "Administrator";
      } else {
        return "Employee";
      }
    },
    requestAddUser() {
      this.$router.push('/signup')
    }
  }
}
</script>
