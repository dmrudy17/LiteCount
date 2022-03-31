<template>
  <div class="about">
    <SideBar />
    <FileSelect />
  </div>
</template>

<script>
import SideBar from '../components/SideBar';
import FileSelect from '../components/FileSelect';

export default {
    name: 'AdminOrganization',
    components: {
        SideBar,
        FileSelect
    }
}
</script>


<style scoped>
.spacer{
  height: 100px;
}
</style>
