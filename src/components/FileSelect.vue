<template>
<div ref="mySlot">
    <section>
      <input type="file" @change="onChange" />
      <xlsx-read :file="file">
        <xlsx-json :sheet="selectedSheet">
          <template #default="{collection}" >
            <div>
              {{ collection }}
            </div>
          </template>
        </xlsx-json>
      </xlsx-read>
       <v-btn @click="sendData"></v-btn>
    </section>
    </div>
</template>

<script lang="js">
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { XlsxRead, XlsxJson } from "../../node_modules/vue-xlsx"
export default {
  components: {
    XlsxRead,
    XlsxJson
  },
  data() {
    return {
      file: null,
      selectedSheet: 0,
      mainCollection: [],
    };
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    sendData () {
      this.mainCollection = this.$refs.mySlot.textContent    
      var object = JSON.parse(this.mainCollection) //Parse String and turn into object
      var mainArray = []
      for(var i in object)
      {
        mainArray.push(object[i])
      }
      const dbStore = firebase.firestore();

      for(let item of mainArray)
      {
        dbStore.collection("Clients").doc("Litehouse").collection("Items").doc(item["Item Number"]).set({
          ItemName: item["Item Name"],
          Quantity: item["Quantity"],
        })
      }
      
    }
  }
}
</script>
