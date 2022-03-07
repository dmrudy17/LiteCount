<template>
<div>
    <v-spacer class="spacer"></v-spacer>
    <h1>Display View</h1>
    <v-autocomplete
        v-model='selectedId'
        @change="loadValues"
        :items="this.documents"
        color="white"
        label="Item Number"
    ></v-autocomplete>
    {{dataObject["Item Name"]}}
    <br>
    {{dataObject.Quantity}}
</div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
export default {
      data: () => ({
          documents: [],
          selectedId: '',
          dataObject: '',
    }),
    beforeMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if(!user)
            {
                this.$router.push('/login');
            }
        })
    },
    async mounted()
    {
        const snapshot = await firebase.firestore().collection('Clients').doc("Litehouse").collection("Items").get()
            snapshot.forEach(doc => {
                const pulledVal = doc.id;
                this.documents.push(pulledVal);
            })
    },
    methods:
    {
       loadValues(e)
        {
            // firebase.firestore().collection('Clients').doc("Litehouse").collection("Items").where()
            // .then((value) => 
            // console.log(value.data["Quantity"]));
            console.log(e)
            const db = firebase.firestore()
            const articleRef = db.collection('Clients').doc("Litehouse").collection("Items").doc(e)
                
            articleRef.get().then(articleDoc => {
                if(articleDoc.exists)
                {
                    const article = articleDoc.data()
                    this.dataObject = article
                }
            }) 
            console.log(this.dataObject)
                // .get()
                //     .then(querySnapshot => {
                //         querySnapshot.forEach((doc) => {
                //             var firstName = doc.get("Item Name");
                //             console.log(firstName)
                //         });
                //     })
        }
    }


}
</script>

<style scoped>
.spacer{
  height: 100px;
}
</style>