<script setup lang="ts">
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: String,
  placeholder: String,
  isPrefixIcon: { type: Boolean, default: false },
  errorMessage: String,
  leftPadding: String,
  inputTypeNumberStepper: { type: Number, default: 1},
})
</script>

<template>
  <div class="">
    <label class="block text-neutral-800  dark:text-gray mb-1.5 text-[13px]">{{ props.label }}</label>
    <div class="relative">
      <input :type="props.type" :placeholder="props.placeholder" :value="modelValue" :step="inputTypeNumberStepper"
        :style="{ 'padding-left': leftPadding ? leftPadding : '' }"
        @input="$emit('update:modelValue', $event?.target?.value)" @blur="$emit('blur')"
        :class="[isPrefixIcon ? 'pl-8 pr-4' : 'pl-3 pr-4', errorMessage ? 'border-red dark:border-red' : 'border-stroke']"
        class="w-full rounded-[5px] border py-[4px] bg-transparent outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white" />

      <span class="absolute left-2 top-[3px] flex">
        <slot></slot>
      </span>

    </div>
    <p class="text-red text-xs" v-if="props.errorMessage">{{ errorMessage }}</p>

  </div>

</template>


<style scoped>
::placeholder {
  font-size: 16px;
}

.el-form-item {
  font-size: 200px;
}
</style> 