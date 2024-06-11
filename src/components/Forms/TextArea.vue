<script setup lang="ts">
// const props = defineProps(['label', 'type', 'placeholder'])
const props = defineProps({
    modelValue: [String, Number],
    label: String,
    type: String,
    placeholder: String,
    isPrefixIcon: { type: Boolean, default: false },
    errorMessage: String,
    rows: { type: Number, default: 2 },
    cols: { type: Number, default: 2 },
})
</script>

<template>
    <div class="">
        <label class="block text-neutral-500  dark:text-gray mb-1.5 text-[10px]">{{ props.label }}</label>
        <div class="relative">
            <textarea :type="props.type" :placeholder="props.placeholder" :value="modelValue" :rows="rows" :cols="cols"
                @input="$emit('update:modelValue', $event?.target?.value)" @blur="$emit('blur')"
                :class="[isPrefixIcon ? 'pl-7 pr-2' : 'pl-3 pr-10', errorMessage ? 'border-red dark:border-red' : 'border-stroke']"
                class="w-full rounded-[5px] border  bg-transparent outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"></textarea>

            <span class="absolute left-2 top-1">
                <slot></slot>
            </span>

        </div>
        <p class="text-red text-xs" v-if="props.errorMessage">{{ errorMessage }}</p>

    </div>

</template>


<style scoped>
::placeholder {
    font-size: 14px;
    color: #F5B001
}
</style>