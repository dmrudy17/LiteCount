<template>
  <div class="about">
    <SideBar />
    <div class="header" :style="{ color: '#000E89' }">
      <h1 class="ml-2">My Organization</h1>
    </div>
    <UserCard />
    <AdminSignUpCard />
  </div>
</template>

<script>
import SideBar from '../components/SideBar';
import UserCard from '../components/UserCard';
import AdminSignUpCard from '../components/AdminSignUpCard.vue'

export default {
    name: 'AdminOrganization',
    components: {
        SideBar,
        UserCard,
        AdminSignUpCard
    }
}
</script>


<style scoped>
.spacer {
  height: 100px;
}
::v-deep .v-application--wrap {
  min-height: fit-content;
}
</style>
