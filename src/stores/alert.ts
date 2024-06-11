import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast()


export const useAlertStore = defineStore("alert", () => {
    const errorMessage = ref();
    const errors = ref({});

    //Setters
    const setErrorMessage = (data?: any) => {
        errorMessage.value = data;
    };
    const setErrors = (data?: any) => {
        errors.value = data?.response?._data.errors;
    };

    const setErrorToast = (data: string) => {
        setErrorMessage(data)
        $toast.error(data, {
            duration: 4000, position: 'top-right', queue: true
        })
    };

    const setSuccessToast = (message: string) => {
        $toast.success(message, {
            duration: 4000, position: 'top-right', queue: true
        })
    };

    return { errorMessage, setErrorMessage, setErrors, errors, setErrorToast, setSuccessToast };
});
