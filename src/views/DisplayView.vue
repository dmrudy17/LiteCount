<template>
<div>
    <v-spacer class="spacer"></v-spacer>
    <h1>Display View</h1>
    <item-puller></item-puller>
</div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import ItemPuller from '../components/ItemPuller.vue';
export default {
  components: { ItemPuller },
    beforeMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if(!user)
            {
                this.$router.push('/login');
            }
        })
    },
}
</script>

<style scoped>
.spacer{
  height: 100px;
}
</style>