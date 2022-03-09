<template>
<div>
    <v-autocomplete
        v-model='selectedId'
        @change="loadValues"
        :items="this.documents"
        color="white"
        label="Item Number"
    ></v-autocomplete>
    {{dataObject["Item Name"]}}
    <br>
    {{dataObject.Quantity}}

    <v-spacer class="spacer"></v-spacer>
    <v-text-field
      label="Increment Quantity"
      v-model="updatedValue"
      hide-details="auto"
    ></v-text-field>

    <v-btn
      color="success"
      @click="updateQuantity"
    >
      Submit
    </v-btn>
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
            // firebase.firestore().collection('Clients').doc("Litehouse").collection("Items").where()
            // .then((value) => 
            // console.log(value.data["Quantity"]));
            const db = firebase.firestore()
            const articleRef = db.collection('Clients').doc("Litehouse").collection("Items").doc(e)
                
            articleRef.get().then(articleDoc => {
                if(articleDoc.exists)
                {
                    const article = articleDoc.data()
                    this.dataObject = article
                }
            }) 
                // .get()
                //     .then(querySnapshot => {
                //         querySnapshot.forEach((doc) => {
                //             var firstName = doc.get("Item Name");
                //             console.log(firstName)
                //         });
                //     })
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
  height: 100px;
}
</style>