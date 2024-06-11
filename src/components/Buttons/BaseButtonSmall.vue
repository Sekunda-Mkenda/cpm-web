<script setup lang="ts">
import ProgressIndicator from '../../assets/images/icon/ProgressIndicator.vue'

const props = defineProps({
    label: String,
    customClasses: String,
    type: {
        type: String as () => "button" | "submit",
        default: "button"
    },
    isLoading: {
        type: Boolean, default: false
    },
    loadingText: { type: String, default: 'Loading...' }
});
</script>

<template>
    <button v-if="!isLoading" :type="props.type"
        class="inline-flex items-center justify-center gap-2.5 py-[4px] text-center font-medium hover:bg-opacity-90 lg:px-2 bg-primary rounded-md text-neutral-800 cursor-pointer text-xs"
        :class="props.customClasses">
        <slot>
            {{ props.label }}
        </slot>
    </button>
    <button v-else type="button" disabled
        class="inline-flex items-center justify-center gap-2.5 py-2 text-center font-medium bg-opacity-100 lg:px-4 bg-primary rounded-md text-neutral-800 cursor-not-allowed text-sm"
        :class="props.customClasses">
        <slot>
            {{ loadingText }}
            <ProgressIndicator />
        </slot>
    </button>
</template>
