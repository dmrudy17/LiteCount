<template>
  <v-app>
    <v-container fluid>
      <v-row align="center" justify="center" dense>
        <v-col cols="12" sm="8" md="4">
          <v-card elevation="1">
            <v-card-title class="indigo--text text-h5 justify-center">Log in to LiteCount</v-card-title>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
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
                class="white--text rounded-0"
                color="#000E89"
                x-large
                block
                @click="validate"
              >
                Submit
              </v-btn>
              <v-alert
                outlined
                type="success"
                :value="alertSuccess"
                text
              >
                Successfully logged in!
              </v-alert>
              <v-alert
                outlined
                type="error"
                :value="alertFailure"
                text
              >
                Login failed!
              </v-alert>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

  export default {
    name: 'LoginCard',
    data () {
      return {
        alertSuccess: false,
        alertFailure: false,
        valid: true,
        show: false,
        email: '',
        password: '',
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
        if ((this.email == '') || (this.password == '')) {
          alert("One or more required fields are blank\nPlease enter a valid email address and password");
          this.alertFailure = true;
        } else {
          firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then((userCredential) => {
              this.alertFailure = false;
              this.alertSuccess = true;
            })
            .catch(err => {
              alert("Login failed\nVerify that the user credentials were entered correctly");
              this.alertFailure = true;
            })
        }
      },
    }
  }
</script>

<style scoped>
::v-deep .v-application--wrap {
  min-height: fit-content;
}
</style>
