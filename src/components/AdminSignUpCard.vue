<template>
  <v-app>
    <v-container fluid>
      <v-row align="center" justify="left" dense>
        <v-col cols="12" sm="8" md="4">
          <v-card
            elevation="1"
            max-width="500"
          >
            <v-card-title class="indigo--text text-h5 justify-center">Create new user</v-card-title>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="full_name"
                label="Full Name"
                color="#0077B6"
              ></v-text-field>
              <v-text-field
                v-model="email"
                :rules="[rules.required, rules.email]"
                label="Email address"
                color="#0077B6"
                clearable
                prepend-inner-icon="mdi-mail"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="[rules.required, rules.min]"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                label="Password"
                color="#0077B6"
                counter
                clearable
                prepend-inner-icon="mdi-lock"
                @click:append="show = !show"
                class="pb-6"
              ></v-text-field>
              <v-btn
                :disabled="!valid"
                :loading="loading"
                class="white--text rounded-0"
                color="#000E89"
                x-large
                block
                @click="validate"
              >
                Submit
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

  export default {
    name: 'AdminSignUpCard',
    beforeMount(){

    },
    data () {
      return {
        loader: null,
        loading: false,
        valid: true,
        show: false,
        email: '',
        password: '',
        full_name: '',
        client_id: '',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          counter: value => value.length <= 20 || 'Max 20 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
      }
    },

    methods: {
      validate () {
        const config = {
          apiKey: "AIzaSyDlW80QsSNWI0QeTP02F1oRuSkDBF6S_Z4",
          authDomain: "litecount-5fba6.firebaseapp.com",
          projectId: "litecount-5fba6",
          storageBucket: "litecount-5fba6.appspot.com",
          messagingSenderId: "1095864396718",
          appId: "1:1095864396718:web:dce04920df42396f14f63f",
          measurementId: "G-HKS5CKY6KG",
        };
        const dbStore = firebase.firestore();

        // Initialize secondary app for special admin function
        var secondaryApp = firebase.initializeApp(config, "Secondary");

        secondaryApp
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(cred => {
              dbStore.collection("Clients").doc("Litehouse").collection("Users").doc(cred.user.uid).set({
                  email: cred.user.email,
                  name: this.full_name,
                  organization: "Litehouse",
              })
              secondaryApp.auth().signOut();
              secondaryApp.delete();
              alert(this.full_name + "'s account successfully created!");
              return true;
            })
            .catch(err => alert(err.message))
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },
  }
</script>
