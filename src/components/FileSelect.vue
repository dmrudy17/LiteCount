<template>
<div ref="mySlot">
    <section>
      <v-card
        v-if="!inventoryTableExists"
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
          <v-btn
            color="blue-grey"
            class="ma-2 white--text"
            fab
            @click="sendData();"
          >
            <v-icon
              class="mr-2"
              right
              dark
            >
              mdi-cloud-upload
            </v-icon>
          </v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-card
        v-if="inventoryTableExists"
        class="mx-auto"
        max-width="400"
      >
        <v-layout justify-center>
          <v-card-actions>
            <v-btn
              color="error"
              class="ma-2 white--text"
              @click="wipeTable();"
            >
              Clear Inventory Data
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
      inventoryTableExists: false,
      file: null,
      selectedSheet: 0,
      mainCollection: [],
    };
  },
  beforeMount(){
    const dbStore = firebase.firestore();

    dbStore
    .collection("Clients")
    .doc("Litehouse")
    .collection("Items")
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        this.inventoryTableExists = true;
      }
    })
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
    },
    wipeTable () {
      alert("WARNING: BE SURE YOU HAVE EXPORTED NEEDED INVENTORY INFORMATION BEFORE WIPING TABLE");
      if (confirm("Are you sure you want to wipe all inventory data? All changes will be lost.")) {
        const db = firebase.firestore();
        let itemsRef = db.collection('Clients').doc("Litehouse").collection("Items");

        itemsRef.get().then(itemSnapshot => {
          itemSnapshot.forEach(doc => {
            itemsRef.doc(doc.id).delete();
          })
        })
      }
    }
  }
}
</script>

<style scoped>
.excel-output {
  display: none;
}
</style>
