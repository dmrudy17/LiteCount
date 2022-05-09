<template>
  <v-app>
    <v-container fluid>
      <v-row align="center" justify="center" dense>
        <v-col cols="12" sm="8" md="4">
          <v-card elevation="1">
            <v-card-title class="indigo--text text-h5 justify-center">Enter your Organization's ID number</v-card-title>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="client_id"
                :rules="[rules.required, rules.number]"
                label="Organization ID"
                hint="Example: 123"
                color="#0077B6"
                clearable
              ></v-text-field>
              <v-btn
                :disabled="!valid"
                class="white--text rounded-0"
                color="#000E89"
                x-large
                block
                @click="validate(), nextPage()"
              >
                Verify
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
    name: 'VerifyCard',
    data () {
      return {
        client_id: '',
        valid: true,
        rules: {
          required: value => !!value || 'Required.',
          //number: value => !(isNaN(value)) || 'Must be a number.'
        },
      }
    },
    methods: {
      validate () {
        let firestoreQuery = firebase
          .firestore()
          .collection("Clients")
          .where("client_id", "==", this.client_id)

          let flag = false;
          return firestoreQuery.get().then(querySnapshot => {
          let documentId
          querySnapshot.forEach((doc) => {
                  documentId = doc.id;
              });        
          if(querySnapshot.empty)
          {
            flag = false;
          }
          else
          {
              flag = true;
          }
            return { flag, documentId }
          });
      },

      nextPage()
      {
        this.validate().then(result => {
          const { flag, documentId } = result;
          console.log(documentId)
          if(flag)
          {
            let data = this.client_id;
            this.$router.push({
            name: "SignUp",
            params: { data, documentId }
          });
          }
          else
          {
            alert("Invalid User: Contact LiteCount for organization information");
          }
        })
      },
    },
  }
</script>
