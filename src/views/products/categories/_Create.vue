<template>
    <el-form @submit="onSubmit" label-position="top" label-width="auto">
        <div class="mb-5">
            <InputGroup label="Name" v-model="name" v-bind="nameProps" :errorMessage="errors.name" />
            <div class="col-span-3 mt-5">
                <BaseButton type="submit" label="Create" customClasses="w-full"
                    :isLoading="useItemStore()?.categories?.isLoading" />
            </div>
        </div>
    </el-form>
</template>

<script lang="ts" setup>
import { useAlertStore } from '@/stores/alert';
import { useItemStore } from '@/stores/items';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const emits = defineEmits(['closeModalAfterSubmit'])

const { defineField, handleSubmit, resetForm, errors } = useForm({
    validationSchema: yup.object({
        name: yup.string().required().label('Name'),
    }),
});

const [name, nameProps] = defineField('name')

const onSubmit = handleSubmit(async (values) => {
    values.type = 'Product'
    await useItemStore().createCategory(values)
    if (!useAlertStore().errorMessage) {
        resetForm()
        emits('closeModalAfterSubmit')
    }
    useAlertStore().setErrorMessage()
});

</script>

<style scoped>
.el-form-item {
    margin-bottom: 6px;
}
</style>