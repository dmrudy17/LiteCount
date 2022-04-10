<template>
<div>
    <v-card
    class="mx-auto"
    max-width="600"
    
    >
        <v-card-title primary-title class="justify-center">
            <h1>Item Puller</h1>
        </v-card-title>
        <v-autocomplete
        v-model='selectedId'
        @change="loadValues"
        :items="this.documents"
        color="white"
        label="Item Number"
    ></v-autocomplete>
      <h3>Item Name: {{dataObject["ItemName"]}}</h3>
      <h3>Item Quantity: {{dataObject.Quantity}}</h3> 

      <v-spacer class="spacer"></v-spacer>

      <v-text-field
      label="Increment Quantity"
      v-model="updatedValue"
      hide-details="auto"
    ></v-text-field>

    <v-layout justify-center>
        <v-card-actions>
            <v-btn  class="mr-10" color="primary" @click="incrementQuantity">
            <span>Increment</span>
            </v-btn>
            <v-btn  color="secondary" @click="decrementQuantity">
            <span>Decrement</span>
            </v-btn>
        </v-card-actions>
    </v-layout>
    </v-card>
</div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
export default {
    data() {
          return {
          documents: [],
          selectedId: '',
          dataObject: 0,
          updatedValue: 0,
          collectionName: this.$route.params.documentId,
          nameOfDocument: '',
          }
    },
    async mounted()
    {   
        const snapshot = await firebase.firestore().collection('Clients').doc("Litehouse").collection("Items").get()
            snapshot.forEach(doc => {
                const pulledVal = doc.id;
                this.documents.push(pulledVal);
            })
    },
    methods:
    {
       loadValues(e)
        {
            this.nameOfDocument = e;
            const db = firebase.firestore()
            const articleRef = db.collection('Clients').doc("Litehouse").collection("Items").doc(e)
                
            articleRef.get().then(articleDoc => {
                if(articleDoc.exists)
                {
                    const article = articleDoc.data()
                    this.dataObject = article
                }
            }) 
        },
        incrementQuantity()
        {
            const db = firebase.firestore();
            const increment = firebase.firestore.FieldValue.increment(this.updatedValue);
            const newRef = db.collection('Clients').doc("Litehouse").collection("Items").doc(this.nameOfDocument);
            newRef.update({Quantity:increment})

            //Update on card
            var number = parseInt(this.updatedValue)
            this.dataObject.Quantity = this.dataObject.Quantity + number;
        },
        decrementQuantity()
        {
            console.log(this.updatedValue);
            const db = firebase.firestore();
            const decrement = firebase.firestore.FieldValue.increment(-1 * this.updatedValue);
            const newRef = db.collection('Clients').doc("Litehouse").collection("Items").doc(this.nameOfDocument);
            newRef.update({Quantity:decrement})

            //Update on card
            var number = parseInt(this.updatedValue)
            this.dataObject.Quantity = this.dataObject.Quantity - number;
        }
    }


}
</script>

<style scoped>
.spacer{
  height: 50px;
}
</style>