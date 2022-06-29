<template>
  <div class="py-10">
    <header>
      <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">Users</h1>
        <el-button type="primary" @click="handleCLickCreateUser" v-if="profile.role.name.toLowerCase() === 'admin'" round>Create User</el-button>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-8 sm:px-0">
          <div class="border-4 p-2 border-dashed border-gray-200 rounded-lg h-96">
            <el-table v-loading="loadingUsers" :data="users" style="width: 100%">
              <el-table-column prop="name" label="Name" />
              <el-table-column prop="email" label="Email" />
              <el-table-column prop="role.name" label="Role" />
              <el-table-column fixed="right" label="Actions">
                <template #default="scope">
                  <el-button type="success" v-if="editable(scope.row)" @click="handleClickEdit(scope.row.id)" size="small">Edit</el-button>
                  <el-button type="danger" v-if="profile.role.name.toLowerCase() == 'admin' && profile.id != scope.row.id" size="small" @click="handleClickDelete(scope.row.id, scope.$index)">Delete
                  </el-button>
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
import { useRouter } from 'vue-router';
import { deleteUser, getUsers } from '@/composables/user/user_services';
import User from '@/interfaces/User';
import { ElNotification } from 'element-plus';
import { useProfile } from '@/composables/user/useProfile';
import UserProfile from '@/interfaces/UserProfile';
export default defineComponent({
  name: 'UsersView',
  setup() {
    const users = ref<User[]>([])
    const router = useRouter()
    const loadingUsers = ref<boolean>(false)

    const profile = useProfile();

    const handleCLickCreateUser = () => {
      router.push('/create-user')
    }

    const getUsersData = async () => {
      loadingUsers.value = true
      await getUsers().then(res => {
        console.log(res)
        users.value = res
      }).catch(errors => {
        console.log(errors);
      }).finally(() => loadingUsers.value = false)
    }

    const handleClickEdit = (id: string | number) => {
      router.push({ name: 'Update User', params: { id } })
    }

    const handleClickDelete = async (id: string | number, index: number) => {
      await deleteUser(id).then((res) => {
        ElNotification({
          message: res,
          type: 'success',
        })
      }).catch((errors) => {
        console.log(errors)
      }).finally(() => {
        users.value.splice(index, 1)
      })
    }

    const editable = (user: UserProfile) : boolean => {
      if(profile.role.name.toLowerCase() == 'admin') {
        return true
      }
      else { 
        return user.id == profile.id ? true : false;
      }
    }
    onMounted(() => {
      getUsersData();
    })

    return {
      users,
      loadingUsers,
      handleCLickCreateUser,
      handleClickEdit,
      handleClickDelete,
      profile,
      editable
    }
  }
})
</script>
