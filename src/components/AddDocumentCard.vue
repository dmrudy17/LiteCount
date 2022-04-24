<template>
<div>
    <v-card class="mx-auto" max-width="600">
        <v-card-title primary-title class="justify-center">
            <h1>Item Addition</h1>
        </v-card-title>
        <v-form
              ref="form"
              lazy-validation
        >
            <v-text-field
                :rules="[rules.required]"
                v-model="itemId"
                label="Item ID"
                color="#0077B6"
            ></v-text-field>
            <v-text-field
                :rules="[rules.required]"
                v-model="itemName"
                label="Item Name"
                color="#0077B6"
            ></v-text-field>
            <v-btn
                class="white--text rounded-0"
                color="#000E89"
                x-large
                block
                @click="sendNewItem(); snackbar=true"
              >
                Add Item
              </v-btn>
             <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                color="success"
                >
                {{ text }}

                <template v-slot:action="{ attrs }">
                    <v-btn
                    color="blue"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                    >
                    Close
                    </v-btn>
                </template>
              </v-snackbar>
        </v-form>
    </v-card>
</div>
</template>
<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default {
    data() {
          return {
              itemId: '',
              itemName: '',
              snackbar: false,
              text: 'Item Added',
              timeout: 1500,
              rules: {
                required: value => !!value || 'Required.',
                // itemIdRule: value => {
                //     const pattern = /^\\/
                //     return pattern.test(value) || 'Invalid ItemId can not contain backwards slash'
                // },
                },
          }
    },
        
    methods:
    {
        sendNewItem()
        {
            const dbStore = firebase.firestore();
            dbStore.collection('Clients').doc("Litehouse").collection("Items").doc(this.itemId).set({
                ItemName: this.itemName,
                Quantity: 0,
            })
            
        }
    }

}
</script>