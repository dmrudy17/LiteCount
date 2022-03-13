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
      <h3>Item Name: {{dataObject["Item Name"]}}</h3>
      <h3>Item Quantity: {{dataObject.Quantity}}</h3> 

      <v-spacer class="spacer"></v-spacer>

      <v-text-field
      label="Increment Quantity"
      v-model="updatedValue"
      hide-details="auto"
    ></v-text-field>

    <v-layout justify-center>
        <v-card-actions>
            <v-btn  color="primary" @click="updateQuantity">
            <span>Increment</span>
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
          dataObject: '',
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
        updateQuantity()
        {
            const db = firebase.firestore();
            const increment = firebase.firestore.FieldValue.increment(this.updatedValue);
            const newRef = db.collection('Clients').doc("Litehouse").collection("Items").doc(this.nameOfDocument);
            newRef.update({Quantity:increment})
        }
    }


}
</script>

<style scoped>
.spacer{
  height: 50px;
}
</style>