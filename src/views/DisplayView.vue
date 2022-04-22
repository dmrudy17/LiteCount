<template>
<div>
    <v-container class ="my-5">
        <v-layout row wrap>
            <v-flex xs12>
                <div class="header">
                    <h1>My Workspace</h1>
                </div>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs6>
                <item-puller @sendId="setId"></item-puller>
            </v-flex>
            <v-flex xs6>
                <logging-card :itemId="this.itemId"></logging-card>
            </v-flex>
            <SideBar />
            <AddDocumentCard/>
            <v-spacer class="spacer"></v-spacer>
            <excel-download></excel-download>
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
import ExcelDownload from '../components/ExcelDownload';
import LoggingCard from '../components/LoggingCard'
import AddDocumentCard from '../components/AddDocumentCard'

export default {
    name: 'DisplayView',
    components: {
        SideBar,
        ItemPuller,
        ExcelDownload,
        LoggingCard,
        AddDocumentCard,
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
h1 {
    color:#000E89;
    position: absolute;
    left:0;
}
</style>