<template>
  <nav>
    <v-navigation-drawer
      app
      width="100"
      color="#F7FBFE"
    >
      <div class="text-center mt-5 pb-5">
        <font-awesome-icon
          icon="fa-solid fa-sailboat"
          size="2x"
          color="#000E89"
          style="cursor: pointer"
          @click="$router.push('/')"/>
      </div>

      <v-divider></v-divider>

      <div class="text-center">
        <v-list flat class="mt-5">
          <v-list-item-group
            v-model="selectedItem"
            color="blue"
            link
          >
            <v-list-item
              active-class="border"
              :ripple="false"
              class="ml-1 my-3"
            >
              <b></b>
              <b></b>
              <v-list-item-icon active-class="border" @click="accessDisplayView()">
                <v-icon>mdi-pencil</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item
              active-class="border"
              :ripple="false"
              class="ml-1 my-3"
            >
              <b></b>
              <b></b>
              <v-list-item-icon active-class="border" @click="accessUserPage()">
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item
              v-if="isAdminUser"
              active-class="border"
              :ripple="false"
              class="m1-1 my-3 ml-1"
            >
              <b></b>
              <b></b>
              <v-list-item-icon active-class="border" @click="accessOrganization()">
                <v-icon>mdi-account-group-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item
              v-if="isAdminUser"
              active-class="border"
              :ripple="false"
              class="m1-1 my-3 ml-1"
            >
              <b></b>
              <b></b>
              <v-list-item-icon active-class="border" @click="accessInventoryPage()">
                <v-icon>mdi-database-edit</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <div class="signout-button">
          <v-btn text @click="logOut()">
            <font-awesome-icon icon="fas fa-sign-out-alt" size="lg" />
          </v-btn>
        </div>
      </div>

    </v-navigation-drawer>
  </nav>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default {
  name: 'SideBar',
  data () {
    return {
      isAdminUser: false,
      selectedItem: 0,
      drawer: null,
    }
  },
  beforeMount(){
    const dbStore = firebase.firestore();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dbStore
        .collection("Clients")
        .doc("Litehouse")
        .collection("Users")
        .where('isAdmin', '==', true)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const adminUser = querySnapshot.docs[0].data()
            if (adminUser.email == user.email) {
              this.isAdminUser = true;
            }
          } else {
            console.log("No admin found");
          }
        })
      }
    })
  },
  mounted:function() {
    this.checkSelectedItem()
  },
  methods: {
    checkSelectedItem:function() {
      if (this.$route.name == "DisplayView") {
        this.selectedItem = 0;
      } else if (this.$route.name == "UserProfile") {
        this.selectedItem = 1;
      } else if (this.$route.name == "AdminOrganization") {
        this.selectedItem = 2;
      } else if (this.$route.name == "AdminUpload") {
        this.selectedItem = 3;
      }
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("Signed out");
          this.$router.push("/");
        })
        .catch(err => alert(err.message));
    },
    accessDisplayView() {
      this.$router.push("/displayview");
    },
    accessUserPage() {
      this.$router.push("/displayview/user-profile");
    },
    accessOrganization() {
      this.$router.push("/displayview/admin-organization");
    },
    accessInventoryPage() {
      this.$router.push("/displayview/admin-upload");
    },
  }
}
</script>

<style>
.border b:nth-child(1) {
  position: absolute;
  top: 5px;
  left: 18px;
  height: 50px;
  width: 55%;
  background:#DFE2FF;
  border-radius: 10px;
}
.border b:nth-child(2) {
  position: absolute;
  top: 12px;
  left: -50px;
  height: 35px;
  width: 55%;
  background:#000E89;
  border-radius: 5px;
}
.signout-button {
  position: absolute;
  bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  left: 0;
  right: 0;
}
</style>