<template>
    <div class="py-10">
        <header>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold leading-tight text-gray-900">Roles</h1>
                <el-button type="primary" @click="handleCLickCreateRole" v-if="profile.role.name.toLowerCase() === 'admin'" round>Create Role</el-button>
            </div>
        </header>
        <main>
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <!-- Replace with your content -->
                <div class="px-4 py-8 sm:px-0">
                    <div class="border-4 p-2 border-dashed border-gray-200 rounded-lg h-96">
                        <el-table :data="roles" v-loading="loadingRoles" style="width: 100%">
                            <el-table-column prop="name" label="Name" />
                            <el-table-column prop="description" label="Description" />
                            <el-table-column fixed="right" label="Actions">
                                <template #default="scope">
                                    <el-button type="success" v-if="editable(scope.row)" @click="handleClickEdit(scope.row)" size="small">Edit</el-button>
                                    <el-button type="danger" size="small" v-if="profile.role.name.toLowerCase() == 'admin' && scope.row.name.toLowerCase() != 'admin'" @click="handleClickDelete(scope.row.id, scope.$index)">Delete</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- /End replace -->
            </div>
        </main>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import RolesInterface from '@/interfaces/Role';
import { useRouter } from 'vue-router';
import useEmitter from '@/composables/useEmitter';
import { getRoles, deleteRole } from '@/composables/role/role_services';
import { ElNotification } from 'element-plus';
import { useProfile } from '@/composables/user/useProfile';
import Role from '@/interfaces/Role';

export default defineComponent({
    name: 'RolesView',
    setup() {
        const roles = ref<RolesInterface[]>([])
        const router = useRouter()
        const emitter = useEmitter();

        const loadingRoles = ref<boolean>(false)
        const profile = useProfile();

        const getData = async () => {
            loadingRoles.value = true;
            await getRoles().then(res => {
                roles.value = res
            }).catch(error => {
                console.log(error)
            }).finally(() => loadingRoles.value = false)
        }
        
        const handleCLickCreateRole = () => {
            router.push('/create-role')
        }

        const handleClickEdit = (data : RolesInterface) => {
            router.push({name : 'Update Role', params: {id: data.id} })
        }

        const handleClickDelete = async (id: string | number, index : number) => {
            await deleteRole(id).then((res) => {
                ElNotification({
                    message: res,
                    type: 'success',
                })
            }).catch((errors) => {
                console.log(errors)
            }).finally(() => {
                roles.value.splice(index, 1)
            })
        }

        const editable = (data: Role) : boolean => {
            if(profile.role.name.toLowerCase() == 'admin') {
                return data.name.toLowerCase() === 'admin' ? false : true
            }
            else {
                return false
            }
        }

        onMounted(() => {
            getData()

            emitter.on('NEW_ROLE', (data : RolesInterface) => {
                roles.value.unshift(data);
            })
        })

        return {
            roles,
            loadingRoles,
            handleCLickCreateRole,
            handleClickEdit,
            handleClickDelete,
            profile,
            editable
        }
    }
})
</script>
