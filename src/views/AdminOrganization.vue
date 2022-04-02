<template>
  <div class="about">
    <SideBar />
    <div class="header" :style="{ color: '#000E89' }">
      <h1 class="ml-2">My Organization</h1>
    </div>
    <UserCard />
  </div>
</template>

<script>
import SideBar from '../components/SideBar';
import UserCard from '../components/UserCard';

export default {
    name: 'AdminOrganization',
    components: {
        SideBar,
        UserCard
    }
}
</script>


<style scoped>
.spacer {
  height: 100px;
}
</style>
