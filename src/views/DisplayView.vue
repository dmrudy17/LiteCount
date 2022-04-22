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
            <div v-if="isAdminUser">
                <v-spacer></v-spacer>
                <v-flex>
                    <div class="AddDoc">
                        <AddDocumentCard/>
                    </div>
                </v-flex>
            </div>
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
import AddDocumentCard from '../components/AddDocumentCard'

export default {
    name: 'DisplayView',
    components: {
        SideBar,
        ItemPuller,
        LoggingCard,
        AddDocumentCard,
    },
    data() {
          return {
              itemId: '',
              isAdminUser: false,
          }
    },
        
    beforeMount(){
        const dbStore = firebase.firestore();
        firebase.auth().onAuthStateChanged((user) => {
            if(!user)
            {
                this.$router.push('/login');
            }

            dbStore
            .collection("Clients")
            .doc("Litehouse")
            .collection("Users")
            .where('isAdmin', '==', true)
            .get()
            .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                const adminUser = querySnapshot.docs[0].data();
                if (adminUser.email == user.email) {
                this.isAdminUser = true;
                }
            } else {
                console.log("No admin found");
            }
            })
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
.AddDoc {
    position: absolute;
    top: 50%;
    left: 40%;
}
</style>