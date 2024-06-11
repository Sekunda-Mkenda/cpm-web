<template>
    <el-form @submit="onSubmit" label-position="top" label-width="auto">
        <div class="mb-5">
            <InputGroup label="Name" v-model="name" v-bind="nameProps" :errorMessage="errors.name" />
            <div class="col-span-3 mt-5">
                <BaseButton type="submit" label="Update" customClasses="w-full"
                    :isLoading="useItemStore()?.categories?.isLoading" />
            </div>
        </div>
    </el-form>
</template>

<script lang="ts" setup>
import { onMounted, toRefs } from 'vue'
import { useAlertStore } from '@/stores/alert';
import { useItemStore } from '@/stores/items';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const props = defineProps(['category', 'type'])
const emits = defineEmits(['closeModalAfterSubmit'])

const { category, type } = toRefs(props)

const { defineField, handleSubmit, resetForm, errors, setFieldValue } = useForm({
    validationSchema: yup.object({
        name: yup.string().required().label('Name'),
    }),
});

const [name, nameProps] = defineField('name')

const onSubmit = handleSubmit(async (values) => {
    values.type = type?.value
    await useItemStore().updateCategory(values, category?.value?.id)
    if (!useAlertStore().errorMessage) {
        resetForm()
        emits('closeModalAfterSubmit')
    }
    useAlertStore().setErrorMessage()
});

onMounted(() => {
    setFieldValue('name', category?.value?.name ?? '')
})

</script>

<style scoped>
.el-form-item {
    margin-bottom: 6px;
}
</style>