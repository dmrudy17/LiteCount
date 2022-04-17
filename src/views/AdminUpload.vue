<template>
  <div class="about">
    <SideBar />
    <div class="header" :style="{ color: '#000E89' }">
      <h1 class="ml-2 mt-3">My Inventory</h1>
    </div>
    <div class="header-2" :style="{ color: '#000E89' }">
      <h2 class="ml-2 mt-3">Upload or Delete Database Table</h2>
    </div>
    <div class="header-3" :style="{ color: '#000E89' }">
      <h3 class="ml-2 mt-3">Table must be in Excel (.xlsx) format</h3>
    </div>
    <FileSelect />
  </div>
</template>

<script>
import SideBar from '../components/SideBar';
import FileSelect from '../components/FileSelect';

export default {
    name: 'AdminUpload',
    components: {
        SideBar,
        FileSelect
    }
}
</script>


<style scoped>
.spacer {
  height: 100px;
}
.header-2 {
  text-align: center;
}
.header-3 {
  text-align: center;
  padding-bottom: 10px;
}
::v-deep .v-application--wrap {
  min-height: fit-content;
}
</style>
