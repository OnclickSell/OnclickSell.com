<template>
  <div class="main_layout">
      <os-navbar/>
          <nuxt/>
      <os-loader v-if="loading"/>
      <!-- <os-footer class="layout_footer"/> -->
  </div>
</template>

<script>
import Navbar from '@/components/navbar/Navbar.vue'
import Footer from '@/components/footer/index.vue'
import Loader from '@/components/UI/loader/loader'
import swal from 'sweetalert'
import { mapGetters } from 'vuex'

export default {
  middleware: 'initAuth',
  computed: {
    ...mapGetters({
      loading: 'isLoading'
    })
  },
  components: {
    'os-navbar': Navbar,
    'os-footer': Footer,
    'os-loader': Loader
  }
}
</script>
<style lang='scss'>
@import '~assets/sass/grid.scss';
@import '~assets/sass/default.scss';

body {
  @include workSans_medium;
  line-height: 1.35;

  @media all and (min-width: 1900px) {
    width: 1900px !important;
  }

 /* @media all and (max-width: 479px) {
    width: 479px !important;
  }*/
}

html {
  height: 100%;
  position: relative;
  font-size: 17px;
}

body {
  padding: 0;
  margin: 0;
  height: 100%;
}

@media (max-width: 900px) {
  html { font-size: 15px; }
}
@media (max-width: 400px) {
  html { font-size: 13px; }
}


.nuxt-link-exact-active {
  color: #97b5ec !important;
}


.main_layout {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 50px;
}

#__nuxt, #__layout {
  height: 100%;
}


.layout_footer {
  top: 100%;
  bottom: 0;
}
</style>
