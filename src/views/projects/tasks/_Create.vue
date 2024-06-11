<template>
    <el-form @submit="onSubmit" label-position="top" label-width="auto">
        <div class="mb-5 grid grid-cols-2 gap-x-4 space-y-2">
            <InputGroup label="Title" v-model="title" v-bind="titleProps" :errorMessage="errors.title" />

            <el-form-item label="Member" v-bind="memberProps">
                <el-select v-model="member" placeholder="Select Member" style="width: 100%" size="small" filterable>
                    <el-option v-for="option in managerMembers?.data" :key="option.id" :label="option.first_name"
                        :loading="managerMembers?.isLoading" :value="option.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Start date" v-bind="startDateProps">
                <el-date-picker style="width: 100%;" v-model="start_date" type="date" placeholder="Start date"
                    size="small" format="YYYY-MM-DD" />
            </el-form-item>

            <el-form-item label="End date" v-bind="endDateProps">
                <el-date-picker style="width: 100%;" v-model="end_date" type="date" placeholder="End date" size="small"
                    format="YYYY-MM-DD" />
            </el-form-item>

            <InputGroup label="Weight" v-model="weight" v-bind="weightProps" :errorMessage="errors.weight" type="number"
                :inputTypeNumberStepper="0.01" />

            <TextArea label="Description" v-model="description" v-bind="descProps" class="col-span-2 mb-4" :rows="4"
                :errorMessage="errors.desc" />

            <div class="col-span-2">
                <BaseButton type="submit" label="Create" customClasses="w-full"
                    :isLoading="useTaskStore()?.tasks?.isLoading" loading-text="Creating" />
            </div>
        </div>
    </el-form>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useAlertStore } from '@/stores/alert';
import { useTaskStore } from '@/stores/tasks';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const emits = defineEmits(['closeModalAfterSubmit'])
const taskStore = useTaskStore()
const route = useRoute()
const { managerMembers } = storeToRefs(taskStore)

const { defineField, handleSubmit, resetForm, errors, setFieldError, setFieldValue } = useForm({
    validationSchema: yup.object({
        title: yup.string().required().label('Title'),
        member: yup.string().required().label('Member'),
        weight: yup.number().max(100, 'Weight can not be greater than 100').label('Weight'),
        description: yup.string().required().label('Description'),
        start_date: yup.date().required().label('Start Date'),
        end_date: yup.date().required().label('End Date')
            .test('is-after-start-or-equal', 'End date must be equal or after start date', function (value) {
                const startDate = this.parent.start_date;
                const endDate = value;
                return new Date(startDate) <= new Date(endDate);
            }),
    }),
});

const elPlusConfig = (state: any) => ({
    props: {
        validateEvent: false,
        error: state.errors[0],
        required: state.required,

    },
});

const [title, titleProps] = defineField('title')
const [member, memberProps] = defineField('member', elPlusConfig)
const [weight, weightProps] = defineField('weight')
const [start_date, startDateProps] = defineField('start_date', elPlusConfig)
const [end_date, endDateProps] = defineField('end_date', elPlusConfig)
const [description, descProps] = defineField('description')

const onSubmit = handleSubmit(async (values) => {
    //Formatting date
    const startDate = new Date(values['start_date']);
    values['start_date'] = `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDay()}`
    const endDate = new Date(values['end_date']);
    values['end_date'] = `${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDay()}`
    //Attaching project id
    values['project']  = route.params['id']
    await useTaskStore().createTasks(values)
    if (!useAlertStore().errorMessage) {
        resetForm()
        emits('closeModalAfterSubmit')
    }
    useAlertStore().setErrorMessage()
});

onMounted(async () => {
    await useTaskStore().getManagerMembers()
})

</script>

<style scoped>
.el-form-item {
    margin-bottom: 6px;
}
</style>