<template>
    <el-form @submit="onSubmit" label-position="top" label-width="auto">
        <div class="mb-5">
            <InputGroup label="Name" v-model="name" v-bind="nameProps" :errorMessage="errors.name" />
            <div class="col-span-3 mt-5">
                <BaseButton type="submit" label="Create" customClasses="w-full" />
            </div>
        </div>
    </el-form>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';


const { defineField, handleSubmit, resetForm, errors, setFieldValue } = useForm({
    validationSchema: yup.object({
        name: yup.string().required().label('Name'),
    }),
});

const [name, nameProps] = defineField('name')

const onSubmit = handleSubmit((values) => {
    values.type = 'Product'
    console.log(values)
});

</script>

<style scoped>
.el-form-item {
    margin-bottom: 6px;
}
</style>