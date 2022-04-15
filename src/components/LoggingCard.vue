<template>
<div>
    <v-card>
        <v-card-title primary-title class="justify-center">
            <h1>Item Logger</h1>
        </v-card-title>
      <h3>{{itemId}}</h3>
            <v-data-table
            :headers="headerArray"
            :items="logArray"
            :items-per-page="5"
            class="elevation-1"
        ></v-data-table>

      <!-- <v-spacer class="spacer"></v-spacer> -->

      <!-- <v-text-field
      label="Adjust Quantity"
      v-model="updatedValue"
      hide-details="auto"
    ></v-text-field> -->

    <!-- <v-layout justify-center>
        <v-card-actions>
            <v-btn  color="primary" @click="updateQuantity(); addMap();">
            <span>Increment</span>
            </v-btn>
            <v-btn  color="secondary" @click="decrementQuantity">
            <span>Decrement</span>
            </v-btn>
        </v-card-actions>
    </v-layout> -->
    </v-card>
</div>
</template>
<script>
/* eslint-disable */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
  export default {
    props: ['itemId'],
    data() {
          return {
          logArray: [],
          headerArray: [{ text: 'Date Changed', value: 'Date' }, { text: 'User', value: 'User' }, { text: 'Quantity', value: 'Quantity' },]
          }
    },
    watch: {
        itemId: function()
        {
            const db = firebase.firestore()
            const articleRef = db.collection('Clients').doc("Litehouse").collection("Items").doc(this.itemId)
             articleRef.get().then(articleDoc => {
                if(articleDoc.exists)
                {
                    const article = articleDoc.data()
                    this.logArray = article.logs
                }
                console.log(this.logArray)
            }) 
        }
    }
    // data: () => ({
    //   show: false,
    // }),
    // methods:
    // {
    //   showPage()
    //   {
    //     if(this.action === 'Sign Up')
    //     {
    //        this.$router.push('/verify-client'); 
    //     }
    //     else if(this.action === 'Read More')
    //     {
    //       this.$router.push('/about'); 
    //     }
    //   }
    // }
  }
</script>

