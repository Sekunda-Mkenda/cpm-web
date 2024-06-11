<script setup lang="ts">
const props = defineProps({
  label: String, route: { type: String, default: '#' }, customClasses: String
})
</script>

<template>
  <router-link :to="props.route"
    class="inline-flex items-center justify-center gap-2.5 py-2 px-2 text-center font-medium hover:bg-opacity-90 lg:px-8  bg-primary rounded-md text-neutral-800"
    :class="props.customClasses">
    <slot></slot>
    {{ props.label }}
  </router-link>
</template>
