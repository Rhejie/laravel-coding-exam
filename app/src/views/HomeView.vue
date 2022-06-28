<template>
  <div class="min-h-full">
      <HeaderComponent/>
      <router-view/>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
export default defineComponent({
  name: 'HomeView',
  components: {
      HeaderComponent
  },
  
});
</script>
