<template>
    <v-container class ="my-5">

      <v-layout row wrap>
          <v-flex xs12 md12>
              <v-spacer class="spacer-2"></v-spacer>
              <home-page-carousel></home-page-carousel>
          </v-flex>
          <v-spacer class="spacer"></v-spacer>
          <v-flex xs12 md6>
            <image-card-1 title="Join us!" action="Sign Up" paragraph="We strive to be source of inventory management for small companies" :imageSource="require('@/assets/networking-1024x512.png')"></image-card-1>
          </v-flex>
          <v-flex xs12 md6>
            <image-card-1 title="Analytics" action="Read More" paragraph="Check out how fast we are growing by analyzing our database" :imageSource="require('@/assets/Analytics-Image.jpg')"></image-card-1>
          </v-flex>
      </v-layout>

      <v-layout row wrap>
         
      </v-layout>

    </v-container>
</template>

<script>
  import ImageCard1 from '../components/ImageCard1'
  import HomePageCarousel from '../components/HomePageCarousel'

  export default {
    name: 'HomeView',

    components: {
      ImageCard1,
      HomePageCarousel,
    },
  }
</script>
<style scoped>
.spacer{
  height: 600px;
}
.spacer-2{
  height: 75px;
}
</style>
