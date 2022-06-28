<template>
    <div class="py-10">
        <header>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold leading-tight text-gray-900">{{titlePage}}</h1>
            </div>
        </header>
        <main>
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <!-- Replace with your content -->
                <div class="px-4 py-8 sm:px-0">
                    <div class="border-2 p-2 border-gray-200 rounded-lg">
                        <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="220px"
                            class="demo-ruleForm" :size="formSize" status-icon>
                            <el-form-item label="Name" prop="name">
                                <el-input v-model="form.name" v-loading="loadingRole" />
                            </el-form-item>
                            <el-form-item label="Description" prop="description">
                                <el-input type="textarea" v-loading="loadingRole" v-model="form.description" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="handleClickSubmitForm(ruleFormRef)">{{id? 'Update' : 'Create'}}</el-button>
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
import CreateRoleInterface from '@/interfaces/CreateRoleInterface';
// import RoleInterface from '@/interfaces/Role';
import type { FormInstance, FormRules } from 'element-plus'
import { defineComponent, onMounted, PropType, reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { storeRole, getRole, updateRole } from '@/composables/role/role_services';
import { ElNotification } from 'element-plus'
import useEmitter from '@/composables/useEmitter';
import { computed } from '@vue/reactivity';
export default defineComponent({
    name: 'CreateUser',
    props: {
        id: {
            required: false,
            type: String as PropType<string | number>
        },
    },
    setup(props) {
        const router = useRouter()
        const form = ref<CreateRoleInterface>({
            name: '',
            description: '',
            id: '',
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
            description: [
                { required: true, message: 'Please input description', trigger: 'blur' },
            ],
        })

        const role = ref({})

        const loadingRole = ref<boolean>(false)
        const isUpdating = ref<boolean>(false)

        const emitter = useEmitter()

        const handleClickSubmitForm = async (formEl: FormInstance | undefined) => {
            if (!formEl) return;
            await formEl.validate((valid, fields) => {
                if (valid) {
                    if(props.id) {
                        updateRoleData(props.id, form.value)
                        return;
                    }
                    saveRole(form.value);
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
            router.push('/roles')
        }


        const saveRole = async (data: CreateRoleInterface) => {
            await storeRole(data).then((res) => {
                role.value = res
                emitter.emit('NEW_ROLE', role.value) // Pass to roles view
            }).catch((errors) => {
                console.log(errors);
            }).finally(() => {  
                ElNotification({
                    message: 'Successfully Created',
                    type: 'success',
                })
                router.push('/roles')
            })
        }

        const titlePage = computed(() => {
            if(props.id == null || typeof props.id == undefined) {
                return 'Create Role'
            }
            else {
                return 'Update Role'
            }
        })

        const getRoleData = async (id : string | number) => {
            loadingRole.value = true;
            await getRole(id).then(res => {
                form.value = res
            }).catch((errors) => {
                console.log(errors);
            }).finally(() => loadingRole.value = false);
        }

        const updateRoleData = async (id: string | number, data: CreateRoleInterface) => {
            isUpdating.value = true;
            await updateRole(id, data).then(res => {
                console.log(res)
                ElNotification({
                    message: 'Successfully updated',
                    type: 'success',
                })
                router.push({name: 'Roles'});
            }).catch(error => {
                console.log(error);
            }).finally(() => loadingRole.value = false);
        }

        onMounted(() => {
          if(props.id) {
            getRoleData(props.id)
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
            role,
            titlePage,
            loadingRole
        }
    }
})
</script>