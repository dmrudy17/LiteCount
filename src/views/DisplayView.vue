<template>
<div>
    <v-container class ="my-5">
        <v-layout row wrap>
            <v-flex xs6>
                <item-puller @sendId="setId"></item-puller>
            </v-flex>
            <v-flex xs6>
                <logging-card :itemId="this.itemId"></logging-card>
            </v-flex>
            <SideBar />
            <v-spacer class="spacer"></v-spacer>
        </v-layout>
    </v-container>
</div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import ItemPuller from '../components/ItemPuller.vue';
import SideBar from '../components/SideBar';
import LoggingCard from '../components/LoggingCard'

export default {
    name: 'DisplayView',
    components: {
        SideBar,
        ItemPuller,
        LoggingCard,
    },
    data() {
          return {
              itemId: ''
          }
    },
        
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
        setId(event)
        {
            this.itemId = event
        }
    }

}
</script>

<style scoped>
.spacer{
  height: 100px;
}
</style>