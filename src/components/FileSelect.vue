<template>
    <section>
      <input type="file" @change="onChange" />
      <xlsx-read :file="file">
        <xlsx-json :sheet="selectedSheet">
          <template #default="{collection}">
            <div>
              {{ collection }}
            </div>
          </template>
        </xlsx-json>
      </xlsx-read>
    </section>
</template>

<script>
//import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { XlsxRead, XlsxJson } from "vue-xlsx"

export default {
  components: {
    XlsxRead,
    XlsxJson
  },
  data() {
    return {
      file: null,
      selectedSheet: 0,
      collection: [{ a: 1, b: 2 }]
    };
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
      console.log(...this.collection);
    },
  }
}

</script>
