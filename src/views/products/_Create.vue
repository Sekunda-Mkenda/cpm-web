<template>
    <el-form @submit="onSubmit" label-position="top" label-width="auto">
        <div class="grid grid-cols-3 gap-x-5 gap-y-2 mb-5">
            <InputGroup label="Title" v-model="title" v-bind="titleProps" :errorMessage="errors.title" />

            <InputGroup label="price" v-model="price" v-bind="priceProps" :errorMessage="errors.price" />

            <el-form-item label="category" v-bind="categoryProps">
                <el-select v-model="category" :loading="categories?.isLoading" placeholder="category"
                    style="width: 100%" size="small" filterable>
                    <el-option v-for="option in categories.data" :key="option.name" :label="option.name"
                        :value="option.id"></el-option>
                </el-select>
            </el-form-item>

            <TextArea label="Description" v-model="description" v-bind="descProps" class="col-span-3" :rows="4"
                :errorMessage="errors.desc" />

            <div class="col-span-3 grid grid-cols-3 md:grid-cols-4 gap-4">
                <label class="text-xs text-neutral-600 dark:text-gray col-span-4">Product Images</label>
                <div v-for="(item, index) in imagesList" :key="index" class="relative">
                    <img :src="item.image" alt="project-image" class="max-h-[120px]" height="100">
                    <p class="text-xs text-neutral-600">{{ item.name }}</p>
                    <DeleteIcon @click="handleDeleteImage(item)" :size="25" fillColor="#E81326"
                        class="absolute top-0 right-0 cursor-pointer" />
                    <input ref="selectAsCoverBox" @change="handleOnSelectCover(item.image, index)" type="checkbox"
                        class="absolute right-0 bottom-0 cursor-pointer" />
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
                <BaseButton type="submit" label="Create" customClasses="w-full" :isLoading="products?.isLoading" />
            </div>
        </div>
    </el-form>
</template>

<script lang="ts" setup>
import FilePicker from '@/components/Forms/FilePicker.vue'
import { ref, onMounted } from 'vue'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import type TextArea from '@/components/Forms/TextArea.vue';
import ImagePickerIcon from 'vue-material-design-icons/Image.vue';
import { useItemStore } from '@/stores/items';
import { useAlertStore } from '@/stores/alert';
import { storeToRefs } from 'pinia';
import DeleteIcon from '@/assets/images/icon/DeleteIcon.vue';

const itemStore = useItemStore()
const { categories, products } = storeToRefs(itemStore)

const emits = defineEmits(['closeModalAfterSubmit'])
const imagesList = ref<{ image: string, name: string }[]>([])
const customValidationMessage = ref<string>('')
const imageAsCover = ref<string>()
const selectAsCoverBox = ref<HTMLInputElement[]>()

const { defineField, handleSubmit, resetForm, errors, setFieldError, setFieldValue } = useForm({
    validationSchema: yup.object({
        title: yup.string().required().label('Title'),
        price: yup.string().required().label('price'),
        category: yup.string().required().label('category'),
        description: yup.string().required().label('Description'),
        images: yup.string().required().label('Images'),
    }),
});

const getImageData = ({ fileData, fileName }: { fileData: any, fileName: any }) => {
    const isExists = imagesList.value.some(item => (item.name === fileName.value))
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
    if (isExists) {
        imagesList.value = imagesList.value.filter(item => item.name != imageObject.name);
    }
};

const handleOnSelectCover = (image: string, index: Number) => {
    imageAsCover.value = image
    console.log(index)
    console.log(selectAsCoverBox.value)
    selectAsCoverBox?.value?.forEach((item: HTMLInputElement, position: Number) => {
        if (position !== index) {
            item.checked = false
        }
    })
}

const elPlusConfig = (state: any) => ({
    props: {
        validateEvent: false,
        error: state.errors[0],
        required: state.required,
    },
});

const [title, titleProps] = defineField('title')
const [price, priceProps] = defineField('price')
const [category, categoryProps] = defineField('category', elPlusConfig)
const [description, descProps] = defineField('description')
const [images, imagesProps] = defineField('images')

const onSubmit = handleSubmit(async (values) => {
    //Modifying the request body
    values['images'] = imagesList.value.map(item => item.image)
    values['cover_image'] = imageAsCover.value
    values['item_category_id'] = values['category']
    delete values['cover']
    delete values['category']
    //Submit data to the api endpont
    await useItemStore().createProduct(values)
    if (!useAlertStore().errorMessage) {
        resetForm()
        emits('closeModalAfterSubmit')
    }
    useAlertStore().setErrorMessage()
});

onMounted(async () => {
    //Fetch product categories
    await useItemStore().getCategories('items/categories/products?page_size=100')
})

</script>

<style scoped>
.el-form-item {
    margin-bottom: 6px;
}
</style>