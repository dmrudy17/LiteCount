<template>
<div>
    <v-btn @click="generateData">Click Me</v-btn>
    <json-excel :data="documents" 
    :fields="json_fields"
    name="Items.xls"
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
          json_fields: {
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
                this.documents.push(pulledVal);
            })
            console.log(this.documents)
            this.showDownload = true
        }
    }


}
</script>