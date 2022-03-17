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
       <v-btn @click="getData"></v-btn>
    </section>
    </div>
</template>

<script lang="js">
//import firebase from 'firebase/compat/app';
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
    getData () {
      this.mainCollection = this.$refs.mySlot.textContent
      console.log(this.mainCollection);
    }
  }
}

</script>
