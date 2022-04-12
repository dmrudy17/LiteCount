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
      label="Adjust Quantity"
      v-model="updatedValue"
      hide-details="auto"
    ></v-text-field>

    <v-layout justify-center>
        <v-card-actions>
            <v-btn class="mr-6" color="primary" @click="updateQuantity(); addMap();">
              <span>Increment</span>
            </v-btn>
            <v-btn class="mr-6" color="secondary" @click="decrementQuantity">
              <span>Decrement</span>
            </v-btn>
            <v-btn v-if="isAdminUser" color="error" @click="overwriteQuantity()">
              <span>Overwrite Quantity</span>
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
      userId: '',
      fullName: '',
      isAdminUser: false,
    }
  },
  beforeMount(){
    const dbStore = firebase.firestore();

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.userId = user.uid

        var userName = dbStore.collection('Clients').doc("Litehouse").collection("Users").doc(user.uid)
        userName.get().then(articleDoc => {
          if(articleDoc.exists) {
              const article = articleDoc.data()
              this.fullName = article.name
          }
        })

        dbStore
        .collection("Clients")
        .doc("Litehouse")
        .collection("Users")
        .where('isAdmin', '==', true)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const adminUser = querySnapshot.docs[0].data();
            if (adminUser.email == user.email) {
              this.isAdminUser = true;
            }
          } else {
            console.log("No admin found");
          }
        })
      }
    })
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
    loadValues(e) {
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
    updateQuantity() {
      const db = firebase.firestore();
      const increment = firebase.firestore.FieldValue.increment(this.updatedValue);
      const newRef = db.collection('Clients').doc("Litehouse").collection("Items").doc(this.nameOfDocument);
      newRef.update({Quantity:increment})

      //Update on card
      var number = parseInt(this.updatedValue)
      this.dataObject.Quantity = this.dataObject.Quantity + number;
    },
    async addMap() {
      const db = firebase.firestore();
      console.log(this.fullName)
      var itemRef = db.collection('Clients').doc("Litehouse").collection("Items").doc(this.selectedId);
      var time = new Date().toLocaleDateString("en-US");
      var logObject = {
          "User" : this.fullName,
          "Quantity": this.dataObject.Quantity,
          "Date": time, 
      }
      itemRef.update({
          "logs": firebase.firestore.FieldValue.arrayUnion(logObject)
      })
    },
    decrementQuantity() {
      const db = firebase.firestore();
      const decrement = firebase.firestore.FieldValue.increment(-1 * this.updatedValue);
      const newRef = db.collection('Clients').doc("Litehouse").collection("Items").doc(this.nameOfDocument);
      newRef.update({Quantity:decrement})

      //Update on card
      var number = parseInt(this.updatedValue)
      this.dataObject.Quantity = this.dataObject.Quantity - number;
    },
    overwriteQuantity() {
      if (confirm("Are you sure you would like to overwrite this quantity?")) {
        const db = firebase.firestore();
        const overwrite = firebase.firestore.FieldValue.increment(this.updatedValue);
        const newRef = db.collection('Clients').doc("Litehouse").collection("Items").doc(this.nameOfDocument);
        newRef.set({Quantity:overwrite})

        //Update on card
        var number = parseInt(this.updatedValue)
        this.dataObject.Quantity = number;
      }
    }
  }


}
</script>

<style scoped>
.spacer{
  height: 50px;
}
</style>