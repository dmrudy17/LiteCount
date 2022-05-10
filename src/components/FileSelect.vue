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
        max-width="600"
      >
        <v-layout justify-center>
          <v-card-actions>
            <v-btn color="success" class="mr-8" @click="generateData">Export Inventory</v-btn>
            <json-excel :data="documents" 
            :fields="json_fields"
            :name="this.fileName"
            />
          </v-card-actions>
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
import { XlsxRead, XlsxJson } from "../../node_modules/vue-xlsx";
import JsonExcel from "../../node_modules/vue-json-excel";
export default {
  components: {
    XlsxRead,
    XlsxJson,
    JsonExcel
  },
  data() {
    return {
      documents: [],
      showDownload: false,
      fileName: '',
      json_fields: {
          "Part Number" : "itemId",
          "Description" : "ItemName",
          "On Hand" : "Quantity",
      },
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
          if (item["Part Number"].includes("/")) {
            alert(item["Part Number"] + " is not a permitted part number and it has been skipped");
            alert("Part numbers with '/' are not permitted.");
            alert("Please navigate to 'My Workspace' and add this part without the '/'");
            continue;
          } else {
            dbStore.collection("Clients").doc("Litehouse").collection("Items").doc(item["Part Number"]).set({
              ItemName: item["Description"],
              Quantity: 0,
            });
          }
      }

      alert("Table upload complete");
    },
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
    },
    wipeTable () {
      alert("WARNING: BE SURE YOU HAVE EXPORTED NEEDED INVENTORY INFORMATION BEFORE WIPING TABLE");
      if (confirm("Are you sure you want to wipe all inventory data? All changes will be lost.")) {
        const db = firebase.firestore();
        let itemsRef = db.collection('Clients').doc("Litehouse").collection("Items");

        itemsRef.get().then(itemSnapshot => {
          itemSnapshot.forEach(doc => {
            itemsRef.doc(doc.id).delete();
          });
          alert("Table deletion successful");
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
