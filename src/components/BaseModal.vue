<script setup>
import { onMounted, onUnmounted, watch } from 'vue';
import Close from 'vue-material-design-icons/Close.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '2xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    closeOnClickOutside: {
        type: Boolean,
        default: false,
    },
    modalTitle: {
        type: String
    },
    maxWidthValue: {
        type: String,
        default: "700px"
    },
    topDistance: {
        type: String,
        default: '5%'
    }
});

const emit = defineEmits(['close']);

watch(
    () => props.show,
    () => {
        if (props.show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = null;
        }
    }
);

const close = () => {
    if (props.closeable) {
        emit('close');
    }
};

const closeOnEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
        close();
    }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));

onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEscape);
    document.body.style.overflow = null;
});

</script>

<template>
    <div v-show="show" class="fixed inset-0 md:top-[8px]  overflow-y-hidden px-4 pb-2 sm:px-0 z-[1000]" scroll-region
        style="overflow-y: scroll;" :style="{ top: topDistance }">
        <Transition enter-active-class="ease-out duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100"
            leave-active-class="ease-in duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div  v-if="show" class="fixed inset-0 transform transition-all">
                <div class="absolute inset-0 bg-graydark opacity-75 overlay" />
            </div>
        </Transition>

        <Transition enter-active-class="ease-out duration-300"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100" leave-active-class="ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div v-show="show" :style="{ maxWidth: maxWidthValue }"
                class=" bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto relative">
                <div
                    class="w-full py-2 bg-darkColor flex justify-between items-center px-6 bg-primary">
                    <h4 class="text-white uppercase  font-[600]">{{ modalTitle }}</h4>
                    <div @click="close"
                        class="rounded-full h-6 w-6 bg-white px-1 cursor-pointer flex justify-center items-center focus:opacity-75">
                        <Close fillColor="#8A1A56" :size="18" />
                    </div>
                </div>
                <div class="pt-[10px] pb-[5px] dark:bg-form-input px-10 py-4">
                    <slot v-if="show" />
                </div>
            </div>
        </Transition>
    </div>
    <!-- </Transition> -->
</template>

<style scoped>
.overlay {
    overflow-y: scroll;
}

.modal-trans-enter-from {
    transform: scale(0.4);
}

.modal-trans-leave-to {
    opacity: 0;
}

.modal-trans-enter-active,
.modal-trans-leave-active {
    transition: all 0.5s ease;
}
</style>