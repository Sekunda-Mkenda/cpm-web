<script setup lang="ts">
const props = defineProps(['subtitle', 'title', 'customClasses'])
</script>

<template>
  <!-- ====== Forms Section Start -->
  <div
    class="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark h-[100vh] overflow-y-hidden">
    <div class="flex overflow-hidden h-full items-center">
      <div class="max-lg:hidden w-full overflow-hidden flex justify-center">
        <span>
          <img src="@/assets/images/backgrounds/login-bg.png" class="h-[60vh]" alt="illustration" />
        </span>
        <!-- </div> -->
      </div>
      <div class="h-full w-1 bg-neutral-300" ></div>
      <div class="w-full dark:border-strokedark flex flex-col items-center justify-center overflow-auto">
        <div class="lg:w-[400px]">
          <h2 class="mb-1.5 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            {{ props.title }}
          </h2>
          <span class="mb-3 block font-medium ">{{ props.subtitle }}</span>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
  <!-- ====== Forms Section End -->
</template>
