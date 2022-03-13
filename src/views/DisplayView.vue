<template>
<div>
    <v-spacer class="spacer"></v-spacer>
    <item-puller></item-puller>
    <SideBar />
    <FileSelect />
</div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import ItemPuller from '../components/ItemPuller.vue';
import SideBar from '../components/SideBar';
import FileSelect from '../components/FileSelect';

export default {
    name: 'DisplayView',
    components: {
        SideBar,
        FileSelect,
        ItemPuller,
    },
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