<template>
<div>
    <SideBar />
    <div class="header" :style="{ color: '#000E89' }">
      <h1 class="ml-2">My Workspace</h1>
    </div>
    <v-container class ="my-5 mt-16">
      <v-row>
        <v-col>
        <item-puller @sendId="setId"></item-puller>
        </v-col>
        <v-col>
        <logging-card :itemId="this.itemId"></logging-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col :align-self="start">
          <div v-if="isAdminUser">
            <v-spacer></v-spacer>
                <div class="AddDoc">
                    <AddDocumentCard/>
                </div>
          </div>
        </v-col>
      </v-row>
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
    top:12px;
}
/* .AddDoc {
    position: absolute;
    top: 50%;
    left: 8%;
    padding-top: 125px;
} */
</style>