<template>
<div>
    <v-btn @click="generateData">Click Me</v-btn>
    <json-excel :data="documents" 
    :fields="json_fields"
    :name="this.fileName"
    />
</div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import JsonExcel from "../../node_modules/vue-json-excel";
export default {
    components: {
    JsonExcel,
    },
    data() {
          return {
          documents: [],
          showDownload: false,
          fileName: '',
          json_fields: {
          "Item Id" : "itemId",
          "Item Name" : "ItemName",
          "Quantity" : "Quantity",
          }
          }
    },
    methods:
    {
        async generateData()
        {
            const snapshot = await firebase.firestore().collection('Clients').doc("Litehouse").collection("Items").get()
            snapshot.forEach(doc => {
                const pulledVal = doc.data();
                pulledVal.itemId = doc.id
                this.documents.push(pulledVal);
            })
            console.log(this.documents)
            this.showDownload = true
            this.fileName = new Date().toLocaleDateString("en-US");
            console.log(this.fileName)
        }
    }


}
</script>