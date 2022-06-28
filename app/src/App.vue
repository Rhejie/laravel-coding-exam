<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import {isLoggedIn, getProfile} from './composables/auth/auth_service'
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    onMounted( async () => {
      if(isLoggedIn()) {
        
        await getProfile().then(res => {
          console.log(res)
          store.dispatch('authenticate', res)
        })
      } 
    })
  }
})
</script>

<style>

</style>
