<template>
    <div class="py-10">
        <header>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold leading-tight text-gray-900">{{ id ? 'Update' : 'Create' }} User</h1>
            </div>
        </header>
        <main>
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <!-- Replace with your content -->
                <ul v-if="errors">
                    <li class="text-red-500" v-for="err in errors" :key="err">{{ err[0] }}</li>
                </ul>
                <div class="px-4 py-8 sm:px-0">
                    <div class="border-2 p-2 border-gray-200 rounded-lg">
                        <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="220px"
                            class="demo-ruleForm" :size="formSize" status-icon>
                            <el-form-item label="Full Name" prop="name">
                                <el-input v-model="form.name" />
                            </el-form-item>
                            <el-form-item label="Email Address" prop="email">
                                <el-input v-model="form.email" />
                            </el-form-item>
                            <el-form-item label="Role" prop="role_id">
                                <el-select v-loading="loadingRoles" v-model="form.role_id" class="w-full"
                                    placeholder="please select role">
                                    <el-option v-for="item in roles" :key="item.id" :label="item.name"
                                        :value="item.id" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Password" prop="password">
                                <el-input type="password" v-model="form.password" />
                            </el-form-item>
                            <el-form-item label="Confirm Password" prop="password_confirmation">
                                <el-input type="password" v-model="form.password_confirmation" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="handleClickSubmitForm(ruleFormRef)">{{ id ? 'Update' :
                                        'Create'
                                }}</el-button>
                                <el-button @click="handleClickResetForm(ruleFormRef)">Reset</el-button>
                                <el-button type="danger" @click="handleClickCancel">Cancel</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <!-- /End replace -->
            </div>
        </main>
    </div>
</template>
<script lang="ts">
import { ElNotification, FormInstance, FormRules } from 'element-plus'
import { defineComponent, onMounted, PropType, reactive, ref } from 'vue'
import CreateUserInterface from '@/interfaces/CreateUserInterface';
import { useRouter } from 'vue-router';
import Role from '@/interfaces/Role';
import { getRoles } from '@/composables/role/role_services';
import { getUser, storeUser, updateUser } from '@/composables/user/user_services';
export default defineComponent({
    name: 'CreateUser',
    props: {
        id: {
            required: false,
            type: String as PropType<string | number>
        }
    },
    setup(props) {
        const router = useRouter()
        const form = ref<CreateUserInterface>({
            name: '',
            password: '',
            email: '',
            role_id: '',
            password_confirmation: ''
        })
        const ruleFormRef = ref<FormInstance>()
        const formSize = ref('default')

        const rules = reactive<FormRules>({
            name: [
                { required: true, message: 'Please input name', trigger: 'blur' },
            ],
            role_id: [
                {
                    required: true,
                    message: 'Please select role',
                    trigger: 'change',
                },
            ],
            email: [
                { required: true, message: 'Please input email', trigger: 'blur' },
                {
                    type: 'email',
                    message: 'Please input correct email address',
                    trigger: ['blur', 'change'],
                },
            ],
            password: [
                { required: true, message: 'Please input password', trigger: 'blur' },
                { min: 8, message: 'Length should be 8 ', trigger: 'blur' },
            ],
            password_confirmation: [
                { required: true, message: 'Please input confirm password', trigger: 'blur' },
            ],
        })

        const roles = ref<Role[]>([]);
        const loadingRoles = ref<boolean>(false)
        const loadingUser = ref<boolean>(false)
        const errors = ref<object>({})

        const getRoleData = async () => {
            loadingRoles.value = true;
            await getRoles().then(res => {
                roles.value = res
            }).catch(error => {
                console.log(error)
            }).finally(() => loadingRoles.value = false)
        }

        const handleClickSubmitForm = async (formEl: FormInstance | undefined) => {
            if (!formEl) return;
            await formEl.validate((valid, fields) => {
                if (valid) {
                    if(props.id) {
                        updateUserData(props.id, form.value);
                        return;
                    }
                    saveUser(form.value);
                } else {
                    console.log('error submit!', fields)
                }
            })
        }

        const handleClickResetForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.resetFields()
        }

        const handleClickCancel = () => {
            router.push('/users')
        }

        const saveUser = async (data: CreateUserInterface) => {
            await storeUser(data).then(res => {
                form.value = res;
                ElNotification({
                    message: 'Successfully Created',
                    type: 'success',
                })
                router.push('/users')
            }).catch(err => {
                errors.value = err.response.data.errors
            })
        }

        const updateUserData = async (id : string | number,data: CreateUserInterface) => {
            console.log('update');
            await updateUser(id, data).then(res => {
                console.log(res);
                ElNotification({
                    message: 'Successfully Updated',
                    type: 'success',
                })
                router.push('/users')
            }).catch(err => {
                errors.value = err.response.data.errors
            })
        }   

        const getUserData = async (id: string | number) => {
            loadingUser.value = true;
            await getUser(id).then(res => {
                form.value = res
            }).catch((err) => {
                console.log(err.errors, 'error - data')
            }).finally(() => loadingUser.value = false);
        }

        onMounted(() => {
            getRoleData();

            if (props.id) {
                getUserData(props.id);
            }
        })

        return {
            form,
            ruleFormRef,
            formSize,
            rules,
            handleClickSubmitForm,
            handleClickResetForm,
            handleClickCancel,
            roles,
            loadingRoles,
            errors
        }
    }
})
</script>