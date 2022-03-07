<template>
<div>
    <v-spacer class="spacer"></v-spacer>
    <SideBar />
</div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import SideBar from '../components/SideBar';

export default {
    name: 'DisplayView',
    components: {
        SideBar,
    },
    beforeMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if(!user)
            {
                this.$router.push('/login');
            }
        })
    }
}
</script>

<style scoped>
.spacer{
  height: 100px;
}
</style>