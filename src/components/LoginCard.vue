<template>
  <v-app>
    <v-container fluid>
      <v-row align="center" justify="center" dense>
        <v-col cols="12" sm="8" md="4">
          <v-card elevation="1">
            <v-card-title class="indigo--text text-h5 justify-center">Log in to LiteCount</v-card-title>
            <v-form>
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
              <v-btn class="rounded-0" color="#000E89" type="submit" x-large block dark>Submit</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
  export default {
    name: 'LoginCard',
    data () {
      return {
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
  }
</script>
