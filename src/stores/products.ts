import { ApiService } from '@/services/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAlertStore } from './alert'

export const useProductStore = defineStore('product', () => {
    const products = ref()
    const itemCategories = ref()

    /*==============================CATEGORIES==============================*/
    const getItemCategories = async (url: any) => {
        itemCategories.value = { isLoading: true };
        try {
            const response: any = await ApiService.get(url);
            itemCategories.value = response.data.data
        } catch (error: any) {
            itemCategories.value = { isLoading: false };
            const errors = error.response.data
            const statusCode: any = error.response.status;
            switch (statusCode) {
                case 422:
                    useAlertStore().setErrorToast(errors[Object.keys(errors)[0]]);
                    break;
                case 401:
                case 403:
                    useAlertStore().setErrorToast("Unauthenticated!");
                    break;
                default:
                    useAlertStore().setErrorToast(
                        "Something went wrong. Please try again later."
                    );
                    break;
            }
            useAlertStore().setErrorMessage(error);
        }
    }

    const createItemCategories = async (data: any) => {
        itemCategories.value = { isLoading: true };
        try {
            const response: any = await ApiService.post('items/categories', data);
            const toastMessage = `${data['type']} category created successfully`
            useAlertStore().setSuccessToast(toastMessage)
            itemCategories.value = response.data.data
        } catch (error: any) {
            itemCategories.value = { isLoading: false };
            const errors = error.response.data
            const statusCode: any = error.response.status;
            switch (statusCode) {
                case 422:
                    useAlertStore().setErrorToast(errors[Object.keys(errors)[0]]);
                    break;
                case 401:
                case 403:
                    useAlertStore().setErrorToast("Unauthenticated!");
                    break;
                default:
                    useAlertStore().setErrorToast(
                        "Something went wrong. Please try again later."
                    );
                    break;
            }
            useAlertStore().setErrorMessage(error);
        }
    }

    /*==============================PRODUCTS==============================*/
    const createProducts = async (data: any) => {
        itemCategories.value = { isLoading: true };
        try {
            const response: any = await ApiService.post('items/categories', data);
            itemCategories.value = response.data.data
        } catch (error: any) {
            itemCategories.value = { isLoading: false };
            const errors = error.response.data
            const statusCode: any = error.response.status;
            switch (statusCode) {
                case 422:
                    useAlertStore().setErrorToast(errors[Object.keys(errors)[0]]);
                    break;
                case 401:
                case 403:
                    useAlertStore().setErrorToast("Unauthenticated!");
                    break;
                default:
                    useAlertStore().setErrorToast(
                        "Something went wrong. Please try again later."
                    );
                    break;
            }
            useAlertStore().setErrorMessage(error);
        }
    }
    return {}
})
