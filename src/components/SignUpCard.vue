<template>
  <v-app>
    <v-container fluid>
      <v-row align="center" justify="center" dense>
        <v-col cols="12" sm="8" md="4">
          <v-card elevation="1">
            <v-card-title class="indigo--text text-h5 justify-center">Sign up for LiteCount</v-card-title>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="client_id"
                label="Client ID"
                color="#0077B6"
                disabled
              ></v-text-field>
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
                Account successfully created!
              </v-alert>
              <v-alert
                outlined
                type="error"
                :value="alertFailure"
                text
              >
                Account creation failed!
              </v-alert>
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
    name: 'LoginCard',
    beforeMount(){

    },
    data () {
      return {
        alertSuccess: false,
        alertFailure: false,
        valid: true,
        show: false,
        email: '',
        password: '',
        full_name: '',
        client_id: this.$route.params.data,
        documentName: this.$route.params.documentId,
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
        const dbStore = firebase.firestore();
        if ((this.full_name == '') || (this.email == '') || (this.password == '')) {
          alert("One or more required fields are blank\nPlease enter a valid name, email address, and password");
          this.alertFailure = true;
        } else {
          firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                const user = firebase.auth().currentUser;
                user.sendEmailVerification({
                  url: "https://litecount-5fba6.web.app/",
                });
                this.alertFailure = false;
                this.alertSuccess = true;
                return dbStore.collection("Clients").doc(this.documentName).collection("Users").doc(cred.user.uid).set({
                    email: cred.user.email,
                    name: this.full_name,
                    organization: this.documentName,
                })
              })
              .catch(err => alert(err.message))
        }
      }
    }
  }
</script>

<style scoped>
::v-deep .v-application--wrap {
  min-height: fit-content;
}
</style>
