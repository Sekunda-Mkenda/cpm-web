<template>
    <el-form @submit.prevent="onSubmit" label-position="top" label-width="auto">
        <div class=" gap-y-2 mb-5 grid grid-cols-3 gap-x-5">
                <InputGroup v-model="first_name" v-bind="firstNameProps" :errorMessage="errors.first_name"
                    label="First Name" type="text" placeholder="Beatrice" :isPrefixIcon="true" class="mb-1">
                    <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.5">
                            <path
                                d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                                fill="" />
                            <path
                                d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                                fill="" />
                        </g>
                    </svg>
                </InputGroup>
                <InputGroup v-model="middle_name" v-bind="middleNameProps" :errorMessage="errors.middle_name"
                    label="Middle Name" type="text" placeholder="John" :isPrefixIcon="true" class="mb-1">
                    <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.5">
                            <path
                                d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                                fill="" />
                            <path
                                d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                                fill="" />
                        </g>
                    </svg>
                </InputGroup>
                <InputGroup v-model="last_name" v-bind="lastNameProps" :errorMessage="errors.last_name"
                    label="Last Name" type="text" placeholder="Mkenda" :isPrefixIcon="true" class="mb-1">
                    <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.5">
                            <path
                                d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                                fill="" />
                            <path
                                d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                                fill="" />
                        </g>
                    </svg>
                </InputGroup>

                <InputGroup v-model="mobile" v-bind="mobileProps" :errorMessage="errors.mobile" label="Mobile"
                    type="number" leftPadding="75px" placeholder="744968968" :isPrefixIcon="true" class="mb-1">
                    <div class="flex items-center mt-[2px]">
                        <svg class="fill-current text-[#8888]" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                            viewBox="0 0 24 24">
                            <path fill=""
                                d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3" />
                        </svg>
                        <p class="text-[16px] font-bold ms-0.5 text-neutral-500">+255</p>
                    </div>
                </InputGroup>

                <InputGroup v-model="email" v-bind="emailProps" :errorMessage="errors.email" label="Email" type="email"
                    placeholder="beatrice@outlook.com" :isPrefixIcon="true" class="mb-1">
                    <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.5">
                            <path
                                d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                fill="" />
                        </g>
                    </svg>
                </InputGroup>

                <el-form-item label="Gender" v-bind="genderProps">
                    <el-select v-model="gender" filterable clearable style="width: 100%"
                        placeholder="Select Gender">
                        <el-option v-for="option in ['Male', 'Female']" :key="option" :label="option"
                            :value="option"></el-option>
                    </el-select>
                </el-form-item>

                <label class="text-[14px] text-neutral-600 dark:text-gray col-span-3 mt-2">Existing Profile Image</label>
                <div class="col-span-3 mb-4" >
                    <img :src="member?.profile" class="w-[100px] h-[100px] object-cover" alt="member-profile-image">
                </div>

                <label class="text-[14px] text-neutral-600 dark:text-gray col-span-3">New Profile Image</label>
                <div class="col-span-3 gap-4">
                    <div v-for="(item, index) in imagesList" :key="index"
                        class="relative flex justify-center flex-col items-center">
                        <img :src="item.image" alt="project-image" class="h-[150px]">
                        <p class="text-xs text-neutral-600">{{ item.name }}</p>
                        <TrashIcon @click="handleDeleteImage(item)" :size="25" fillColor="red"
                            class="absolute top-0 right-0 cursor-pointer" />
                    </div>
                </div>
     
            <div v-if="imagesList.length < 1" class="flex justify-center col-span-3 ">
                <FilePicker @getFileData="getImageData" :multiple="true" v-model="images" v-bind="imagesProps"
                    :error="errors.images || customValidationMessage"
                    :allowedExtensions="['jpeg', 'jpg', 'webp', 'png']" :use-custom-label="true" label="images">
                    <template #file-label>
                        <ImagePickerIcon :size="80" class="cursor-pointer" />
                    </template>""
                </FilePicker>
            </div>
            <div class="col-span-3 mt-1">
                <BaseButton type="submit" label="Update" customClasses="w-full"
                    :isLoading="useMemberStore()?.members?.isLoading" loading-text="Updating..." />
            </div>
        </div>
    </el-form>
</template>

<script lang="ts" setup>
import FilePicker from '@/components/Forms/FilePicker.vue'
import { watch, ref, watchEffect, toRefs } from 'vue'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { regions } from '@/utils/tanzania_regions'
import type TextArea from '@/components/Forms/TextArea.vue';
import ImagePickerIcon from 'vue-material-design-icons/Image.vue';
import TrashIcon from 'vue-material-design-icons/Delete.vue';
import { useAlertStore } from '@/stores/alert';
import { ref as yupRef } from 'yup'
import { useAuthStore } from '@/stores/auth';
import  { useMemberStore } from '@/stores/members';
import { getStaticAssetUrl } from '@/utils/link_generators';

const props  = defineProps(['member'])

const { member } = toRefs(props)
const emits = defineEmits(['closeModalAfterSubmit'])
const districts = ref<string[]>([])
const imagesList = ref<{ image: string, name: string }[]>([])
const customValidationMessage = ref<string>('')

const { defineField, handleSubmit, resetForm, errors, setFieldError, setFieldValue } = useForm({
    validationSchema: yup.object({
        first_name: yup.string().required().label('First name'),
        middle_name: yup.string().required().label('Middle name'),
        last_name: yup.string().required().label('Last name'),
        mobile: yup.string().required().min(9).label('Mobile'),
        email: yup.string().email().required().label('email'),
        gender: yup.string().required().label('gender'),
        images: yup.string().required().label('Profile'),
    }),
});

watchEffect(()=> {
    setFieldValue('first_name', member?.value?.first_name ?? 'Loading...')
    setFieldValue('middle_name', member?.value?.middle_name ?? 'Loading...')
    setFieldValue('last_name', member?.value?.last_name ?? 'Loading...')
    setFieldValue('mobile', member?.value?.mobile.substring(3) ?? 'Loading...')
    setFieldValue('email', member?.value?.email  ?? 'Loading...')
    setFieldValue('gender', member?.value?.gender  ?? 'Loading...')
    setFieldValue('images', member?.value?.profile  ?? 'Loading...')
})

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

    },
});

const [email, emailProps] = defineField('email')
const [mobile, mobileProps] = defineField('mobile')
const [first_name, firstNameProps] = defineField('first_name')
const [middle_name, middleNameProps] = defineField('middle_name')
const [last_name, lastNameProps] = defineField('last_name')
const [gender, genderProps] = defineField('gender', elPlusConfig)
const [images, imagesProps] = defineField('images')


const onSubmit = handleSubmit(async (values) => {
    if(imagesList.value[0]) {
        values['profile'] = imagesList.value[0].image
    }
    values['mobile'] = '255' + values['mobile']
    delete values['images']
    //Submit datra to api
    await useMemberStore().updateMember(values, member?.value.id)
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