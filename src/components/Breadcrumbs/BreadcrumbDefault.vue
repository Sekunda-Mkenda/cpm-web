<script setup lang="ts">
const props = defineProps({
  pageTitle: String,
  breadCumbItems: {
    type: Array,
    // default: () => [{ label: 'Dashboard', path: '/' }]
  }
})
</script>

<template>
  <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <h2 class="text-title-md2 font-semibold text-black dark:text-white">
      {{ props.pageTitle }}
    </h2>

    <nav>
      <ol class="flex items-center gap-2">
        <li>
          <router-link class="font-medium" to="/"> Dashboard / </router-link>
        </li>
        <li v-for="(item, index) in breadCumbItems" :key="index">
          <router-link class="font-medium" :to="item.path"> {{ item.label }} / </router-link>
        </li>
        <li class="font-medium text-primary">{{ props.pageTitle }}</li>
      </ol>
    </nav>
  </div>
</template>
