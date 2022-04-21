<template>
  <div class="about">
    <SideBar />
    <div class="header" :style="{ color: '#000E89' }">
      <h1 class="ml-2 mt-3">My Profile</h1>
    </div>
    <ProfileCard />
  </div>
</template>

<script>
import SideBar from '../components/SideBar';
import ProfileCard from '../components/ProfileCard';
export default {
    name: 'UserProfile',
    components: {
        SideBar,
        ProfileCard
    }
}
</script>


<style scoped>
.spacer {
  height: 100px;
}
</style>