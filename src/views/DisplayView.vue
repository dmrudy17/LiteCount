<template>
<div>
    <v-spacer class="spacer"></v-spacer>
    <h1>Display View</h1>
    <v-autocomplete
        @click="dropDown"
        :items="this.documents"
        color="white"
        item-text="name"
        label="Item Number"
    ></v-autocomplete>
</div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default {
      data: () => ({
          documents: []
    }),
    beforeMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if(!user)
            {
                this.$router.push('/login');
            }
        })
    },
    methods:
    {
        async dropDown()
        {
            const snapshot = await firebase.firestore().collection('Clients').doc("Litehouse").collection("Items").get()
            snapshot.forEach(doc => {
                const pulledVal = doc.id;
                this.documents.push(pulledVal);
            })
        }

    }

}
</script>

<style scoped>
.spacer{
  height: 100px;
}
</style>