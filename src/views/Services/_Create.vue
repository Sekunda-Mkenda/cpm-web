<template>
    <el-form @submit="onSubmit" label-position="top" label-width="auto">
        <div class="grid grid-cols-3 gap-x-5 gap-y-2 mb-5">
            <InputGroup label="Title" v-model="title" v-bind="titleProps" :errorMessage="errors.title" />

            <el-form-item label="Start date" v-bind="startDateProps">
                <el-date-picker style="width: 100%;" v-model="start_date" type="date" placeholder="Start date"
                    size="small" format="YYYY-MM-DD" date-format="YYYY/MM/DD" />
            </el-form-item>

            <el-form-item label="End date" v-bind="endDateProps">
                <el-date-picker style="width: 100%;" v-model="end_date" type="date" placeholder="End date" size="small"
                    format="YYYY-MM-DD" date-format="YYYY/MM/DD" />
            </el-form-item>

            <InputGroup label="Budget" v-model="budget" v-bind="budgetProps" :errorMessage="errors.budget" />
            <InputGroup label="Progress Percentage" v-model="progress_percentage" v-bind="progressPercentageProps"
                :errorMessage="errors.progress_percentage" />
            <InputGroup label="Ward/Street" v-model="ward_or_street" v-bind="wardOrStreetProps"
                :errorMessage="errors.ward_or_street" />

            <el-form-item label="Region" v-bind="regionProps">
                <el-select v-model="region" placeholder="Region" style="width: 100%" filterable>
                    <el-option v-for="option in regions" :key="option.name" :label="option.name"
                        :value="option.name"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="District" v-bind="districtProps">
                <el-select :disabled="districts?.length == 0" v-model="district" filterable clearable
                    style="width: 100%" placeholder="Select district">
                    <el-option v-for="option in districts" :key="option" :label="option" :value="option"></el-option>
                </el-select>
            </el-form-item>

            <TextArea label="Description" v-model="description" v-bind="descProps" class="col-span-3" :rows="4"
                :errorMessage="errors.desc" />

            <div class="col-span-3 grid grid-cols-3 md:grid-cols-4 gap-4">
                <label class="text-xs text-neutral-600 dark:text-gray col-span-4">Project Images</label>
                <div v-for="(item, index) in imagesList" :key="index" class="relative">
                    <img :src="item.image" alt="project-image" height="">
                    <p class="text-xs text-neutral-600">{{ item.name }}</p>
                    <TrashIcon @click="handleDeleteImage(item)" :size="25" fillColor="red"
                        class="absolute top-0 right-0 cursor-pointer" />
                </div>
            </div>

            <div class="flex justify-center col-span-3 ">
                <FilePicker @getFileData="getImageData" :multiple="true" v-model="images" v-bind="imagesProps"
                    :error="errors.images || customValidationMessage"
                    :allowedExtensions="['jpeg', 'jpg', 'webp', 'png']" :use-custom-label="true" label="images">
                    <template #file-label>
                        <ImagePickerIcon :size="80" class="cursor-pointer" />
                    </template>""
                </FilePicker>
            </div>
            <div class="col-span-3 mt-1">
                <BaseButton type="submit" label="Create" customClasses="w-full" />
            </div>
        </div>
    </el-form>
</template>

<script lang="ts" setup>
import FilePicker from '@/components/Forms/FilePicker.vue'
import { watch, ref } from 'vue'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { regions } from '@/utils/tanzania_regions'
import type TextArea from '@/components/Forms/TextArea.vue';
import ImagePickerIcon from 'vue-material-design-icons/Image.vue';
import TrashIcon from 'vue-material-design-icons/Delete.vue';

const districts = ref<string[]>([])
const imagesList = ref<{ image: string, name: string }[]>([])
const customValidationMessage = ref<string>('')

const { defineField, handleSubmit, resetForm, errors, setFieldError, setFieldValue } = useForm({
    validationSchema: yup.object({
        title: yup.string().required().label('Title'),
        budget: yup.string().required().label('Budget'),
        region: yup.string().required().label('Region'),
        district: yup.string().required().label('District'),
        description: yup.string().required().label('Description'),
        ward_or_street: yup.string().label('Ward'),
        progress_percentage: yup.string().required().max(100, "Maximum value is 100").label('Progress Percentage'),
        start_date: yup.date().required().label('Start Date'),
        images: yup.string().required().label('Images'),
        end_date: yup.date().required().label('End Date')
            .test('is-after-start-or-equal', 'End date must be equal or after start date', function (value) {
                const startDate = this.parent.start_date;
                const endDate = value;
                return new Date(startDate) <= new Date(endDate);
            }),
    }),
});

const getImageData = ({ fileData, fileName }: { fileData: any, fileName: any }) => {
    const isExists = imagesList.value.some(item => (item.name === fileName.value))
    console.log(isExists)
    if (isExists) {
        customValidationMessage.value = `Image with name ${fileName.value} already selected`
        setFieldError('images', customValidationMessage.value)
    } else {
        customValidationMessage.value = ''
        setFieldError('images', undefined)
        imagesList.value.push({ image: fileData, name: fileName.value })
    }
    setFieldValue('images', 'image is selected')
}

const handleDeleteImage = (imageObject: any) => {
    const isExists = imagesList.value.some(item => item.name === imageObject.name);
    console.log(isExists);
    if (isExists) {
        imagesList.value = imagesList.value.filter(item => item.name != imageObject.name);
    }
};

const elPlusConfig = (state: any) => ({
    props: {
        validateEvent: false,
        error: state.errors[0],
        required: state.required,
        validateOnRuleChange: true

    },
});

const [title, titleProps] = defineField('title')
const [budget, budgetProps] = defineField('budget')
const [ward_or_street, wardOrStreetProps] = defineField('ward_or_street')
const [progress_percentage, progressPercentageProps] = defineField('progress_percentage')
const [start_date, startDateProps] = defineField('start_date', elPlusConfig)
const [end_date, endDateProps] = defineField('end_date', elPlusConfig)
const [region, regionProps] = defineField('region', elPlusConfig)
const [district, districtProps] = defineField('district', elPlusConfig)
const [description, descProps] = defineField('description')
const [images, imagesProps] = defineField('images')

watch(region, () => {
    district.value = ''
    districts.value = []
    if (region.value) {
        const distrs: any[] = regions.filter((item: any) => item.name == region.value)
        if (distrs) {
            distrs[0].districts.forEach((element: { name: any }) => {
                districts.value.push(element.name)
            });
        }
    }

})

const onSubmit = handleSubmit((values) => {
    values['images'] = imagesList.value.map(item => item.image)
});

</script>

<style scoped>
.el-form-item {
    margin-bottom: 6px;
}
</style>