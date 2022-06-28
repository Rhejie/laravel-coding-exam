<template> 
    <div class="py-10">
        <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold leading-tight text-gray-900">Home</h1>
        </div>
        </header>
        <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <!-- Replace with your content -->
            <div class="px-4 py-8 sm:px-0">
            <div class="border-4 p-2 border-dashed border-gray-200 rounded-lg h-96">
                <span class="text-gray-500 text-4xl">Welcome: {{name.name}}</span>
            </div>
            </div>
            <!-- /End replace -->
        </div>
        </main>
    </div>
</template>
<script lang="ts">
import Role from "@/interfaces/Role";
import UserProfile from "@/interfaces/UserProfile";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";


export default defineComponent({
    name: 'WelcomeView',
    setup() {
        const store = useStore();

        const name = ref<UserProfile>({
            email: '',
            name: '',
            id: '',
            role_id: '',
            role: {} as Role
        })

        name.value = store.state.profile

        return {
            name
        }
    }
})
</script>
