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
              v-for="(item, i) in items"
              :key="i"
              active-class="border"
              :ripple="false"
              class="ml-1 my-3"
            >
              <b></b>
              <b></b>
              <v-list-item-icon active-class="border">
                <v-icon v-text="item.icon"></v-icon>
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
      selectedItem:0,
      drawer: null,
      items: [
        { icon: 'mdi-home-city' },
        { icon: 'mdi-account' },
        { icon: 'mdi-account-group-outline' },
      ],
    }
  },
  methods: {
    logOut()
    {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("Signed out");
          this.$router.push("/");
        })
        .catch(err => alert(err.message));
    }
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