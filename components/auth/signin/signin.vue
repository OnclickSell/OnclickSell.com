<template>
      <os-auth-panel>

          <div slot="controlls" class="auth_signin-controlls">

            <transition name="auth_error">
              <os-auth-errors
                v-on:closed="cancelError"
                v-show="errors.any()" 
                :errors="errors.items" />
            </transition>


                    <os-input 
                      class="auth_sigin-input"
                      title="Email Address"
                      v-model="credentials.email"
                      InputType='email'
                      v-validate="'required|email'"
                      InputName='password'
                      data-vv-value-path="innerValue"
                      data-vv-name="email"
                      InputHolder="e.g Aliakbar.su@myself.com"
                      :InputError="errors.first('email')"
                      :tooltip="{position: 'right', distance: 260}"/>

                    <os-input 
                      class="auth_sigin-input"
                      title="Password"
                      v-model="credentials.password"
                      InputType='password'
                      v-validate="'required'"
                      InputName='password'
                      data-vv-value-path="innerValue"
                      data-vv-name="password"
                      InputHolder="Your password"
                      :InputError="errors.first('password')"
                      :tooltip="{position: 'top', distance: 20}"/>


                  <os-auth-buttons 
                    class="auth_sigin-input"
                    v-on:clicked="signin"
                    v-on:linkClicked="signup"
                    text="Sign In" 
                    link="Sign Up"/>
                </div>


            <div slot="describtion" class="auth_signin-description">
              <h1 class="auth_signin-title">Sign In</h1>
              <p class="auth_signin-body">Sign to Onclicksell.com to be notified of any events!</p>
            </div>
      </os-auth-panel>   
</template>
<script>
import { mapGetters } from 'vuex'
import FromInput from '@/components/auth/input/index'
import swal from 'sweetalert'
import AuthPanel from '@/components/auth/panel/index'
import AuthButtons from '@/components/auth/buttons/index'
import AuthErrors from '@/components/auth/errors/index'

export default {
  props: ['data'],
  data () {
    return {
      credentials: this.data
    }
  },
  computed: {
    ...mapGetters({
      loading: 'loader/isLoading'
    })
  },
  methods: {
    cancelError() {
      this.errors.clear()
    },
    signin () {
      // swal({
      //   title: "Good job!",
      //   text: "You clicked the button!",
      //   icon: "success",
      //   button: "Aww yiss!",
      // })
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.credentials.url = '/signin'
          this.$emit('submit', { ...this.credentials })
        }
      })
    },
    signup() {
      // this.$emit('switchComponent', { component: 'signup', values: this.credentials })
      this.$router.push('/auth/signup')
    }
  },
  components: {
      'os-input': FromInput,
      'os-auth-panel': AuthPanel,
      'os-auth-buttons': AuthButtons,
      'os-auth-errors': AuthErrors
  }
}
</script>

<style lang='scss'>
@import '~assets/sass/grid.scss';
@import '~assets/sass/default.scss';


.auth_sigin-input {
  margin-top: 25px;
}


.auth_signin-title {
  text-align: left;
  color: #FFFFFF;
  @include workSans_light;
  margin: 0;
  padding: 5px;
}

.auth_signin-body {
  text-align: left;
  color: #FFFFFF;
  @include sourceSans;
  padding: 5px;
  margin: 0;
}

.auth_signin-controlls {
  padding: 5%;
}

.auth_signin-description {
  padding: 5%;
}


.auth_error-enter-active {
   transition: opacity .2s ease;
}

.auth_error-leave-active {
  transition: opacity .1s ease;
}

.auth_error-enter, .auth_error-leave-to {
  opacity: 0;
}

.auth_error-leave-to {
  transform: translate(0, -10px);
}
</style>