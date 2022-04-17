<template>
<div ref="mySlot">
    <section>
      <v-card
        class="mx-auto"
        max-width="400"
      >
        <input type="file" @change="onChange" />
          <xlsx-read :file="file">
            <xlsx-json :sheet="selectedSheet">
              <template #default="{collection}" >
                <div class="excel-output">
                  {{ collection }}
                </div>
              </template>
            </xlsx-json>
          </xlsx-read>
        <v-layout justify-center>
          <v-card-actions>
            <!-- <v-btn @click="sendData"></v-btn> -->
          <v-btn
            color="blue-grey"
            class="ma-2 white--text"
            fab
            @click="sendData();"
          >
            <v-icon
              right
              dark
            >
              mdi-cloud-upload
            </v-icon>
          </v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
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
      var allowedExtensions = /(\.xlsx)$/i
      if(!allowedExtensions.exec(this.file.name)) {
        alert("Invalid file type!");
      }
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
          Quantity: 0,
        })
      }

      alert("Table upload successful!")
    }
  }
}
</script>

<style scoped>
.excel-output {
  display: none;
}
</style>
