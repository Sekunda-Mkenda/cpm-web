<template>
    <div>
        <label :for="label" :class="[useCustomLabel ? 'flex justify-center' : 'block']"
            class=" text-neutral-500  dark:text-gray mb-1.5 text-[15px]">
            <slot name="file-label">{{ label }}</slot>
            <span v-if="isRequired" class="text-red-500">*</span>
        </label>
        <div class="relative flex items-center">
            <span v-if="withIcon" class="absolute left-0 inset-y-0 flex items-center pl-2">
                <slot name="input-icon" />
            </span>
            <input :readonly="isReadOnly" :id="label" :multiple="multiple"
                :class="{ 'border-red': error || customErrorMessage, 'hidden': useCustomLabel }" type="file"
                :required="required"
                class="w-full rounded-[5px] border py-[0.5px] bg-transparent outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
                :placeholder="placeholder" @input="validateImage" />
        </div>
        <p v-if="customErrorMessage" class="text-red text-xs">{{ customErrorMessage }}</p>
        <p v-else class="text-red text-xs">{{ error }}</p>
    </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue'

const props = defineProps({
    isRequired: { type: Boolean, default: false },
    label: { Type: String, required: false },
    placeholder: String,
    multiple: { default: false },
    isReadOnly: {
        Type: Boolean,
        default: false
    },
    name: String,
    withIcon: {
        Type: Boolean,
        default: false
    },
    error: {
        type: String,
        default: ''
    },
    docMaxSize: {
        Type: Number,
        default: 2
    },
    allowedExtensions: {
        type: Array,
        default: () => ['jpg', 'jpeg', 'png', 'gif', 'svg', 'ico', 'pdf', 'docx', 'xls', 'webp']
    },
    index: [Object, Number],
    useCustomLabel: { default: false },
    required: {
        type: Boolean,
        default: false
    }
});

const emits = defineEmits(['getFileData'])

const { docMaxSize, label, allowedExtensions, index } = toRefs(props)
const imageFileData = ref<string>('')
const customErrorMessage = ref<string>('')
const fileName = ref<string>('')

const validateImage = (event: any) => {
    const inputElement = event.target;
    const maxFileSize = docMaxSize.value * 1024 * 1024; // 2MB in bytes

    if (!inputElement || !inputElement.files || inputElement.files.length === 0) {
        customErrorMessage.value = 'No file selected.';
        return false;
    }

    const file = inputElement.files[0];
    imageFileData.value = file;
    fileName.value = file.name.toLowerCase();
    const fileExtension = fileName.value.split('.').pop();

    if (!allowedExtensions.value.includes(fileExtension)) {
        customErrorMessage.value = `Invalid file extension. Allowed: ${allowedExtensions.value.join(', ')}`;
        imageFileData.value = ''
        return false;
    }

    if (file.size > maxFileSize) {
        customErrorMessage.value = `File size exceeds ${docMaxSize.value}MB.`;
        imageFileData.value = ''
        return false;
    }

    if (customErrorMessage.value === '') {
        return imageFileData.value
    }

    customErrorMessage.value = '';
};

const toBase64 = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

watch(imageFileData, async (newValue) => {
    if (newValue !== '') {
        const fileString: any = await toBase64(newValue)
        emits('getFileData', { fileData: fileString, error: customErrorMessage, index: index?.value, fileName: fileName })
    }
})


</script>

<style scoped>
.form-control {
    /* padding: 8px 5px; */
    cursor: pointer;
}

.errorClass {
    border: 1px red solid;
}
</style>