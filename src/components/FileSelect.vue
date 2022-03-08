<template>
  <v-file-input
    v-model="inputFile"
    accept=".xlsx"
    label="File input"
    outlined
    dense
    @change="sendFile()"
  ></v-file-input>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

export default {
  name: 'ImportFile',
  data: () => ({
    inputFile: [],
  }),
  methods: {
    sendFile() {
      const file = this.inputFile
      if(file) {
          var user = firebase.auth().currentUser;
          const storage = firebase.storage().ref('users/' + user.uid + '/index.xlsx');
          const storageRef = storage.put(file);
          console.log(storageRef);
          alert("File Uploaded!")
      }
    }
  }
}
</script>
