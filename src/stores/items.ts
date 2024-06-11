import { ApiService } from '@/services/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAlertStore } from './alert'

export const useItemStore = defineStore('items', () => {
    const products = ref()
    const categories = ref()

    /*==============================CATEGORIES==============================*/
    const getCategories = async (url: any) => {
        categories.value = { isLoading: true };
        try {
            const response: any = await ApiService.get(url);
            categories.value = response.data
        } catch (error: any) {
            categories.value = { isLoading: false };
            const statusCode: any = error.response.status;
            switch (statusCode) {
                case 404:
                    useAlertStore().setErrorToast("The requested resource is not found on server");
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

    const createCategory = async (data: any) => {
        categories.value = { isLoading: true };
        try {
            const response: any = await ApiService.post('items/categories', data);
            const toastMessage = `${data['type']} category created successfully`
            useAlertStore().setSuccessToast(toastMessage)
            categories.value = response.data.data
        } catch (error: any) {
            categories.value = { isLoading: false };
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
                        "Something went wrong. Please try again later")
                    break;
            }
            useAlertStore().setErrorMessage(error);
        }
    }

    const updateCategory = async (data: any, id: string) => {
        categories.value = { isLoading: true };
        try {
            const response: any = await ApiService.put('items/categories/' + id, data);
            const toastMessage = `${data['type']} category updated successfully`
            useAlertStore().setSuccessToast(toastMessage)
            categories.value = response.data.data
        } catch (error: any) {
            categories.value = { isLoading: false };
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

    const deleteCategory = async (id: string) => {
        categories.value = { isLoading: true };
        try {
            const response: any = await ApiService.delete('items/categories/' + id,);
            const toastMessage = "Category deleted successfully"
            useAlertStore().setSuccessToast(toastMessage)
            categories.value = response.data.data
        } catch (error: any) {
            console.log(error)
            categories.value = { isLoading: false };
            const statusCode: any = error.response.status;
            switch (statusCode) {
                case 404:
                    useAlertStore().setErrorToast("Resource not found");
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
    const getProducts = async (url: string) => {
        categories.value = { isLoading: true };
        try {
            const response: any = await ApiService.get(url);
            console.log(response.data)
            products.value = response.data
        } catch (error: any) {
            console.log(error)
            categories.value = { isLoading: false };
            const statusCode: any = error.response.status;
            switch (statusCode) {
                case 401:
                case 403:
                    useAlertStore().setErrorToast("Unauthenticated!");
                    break;
                default:
                    useAlertStore().setErrorToast(
                        "Something went wrong. Please try again later."
                    )
                    break;
            }
            useAlertStore().setErrorMessage(error);
        }
    }
    const createProduct = async (data: any) => {
        products.value = { isLoading: true };
        try {
            await ApiService.post('items/products', data);
            useAlertStore().setSuccessToast('Product is created successfully')
        } catch (error: any) {
            console.log(error)
            products.value = { isLoading: false };
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

    const updateProduct = async (data: any, id: string) => {
        categories.value = { isLoading: true };
        try {
            const response: any = await ApiService.put('items/products/' + id, data);
            const toastMessage = `${data['type']} category updated successfully`
            useAlertStore().setSuccessToast(toastMessage)
            categories.value = response.data.data
        } catch (error: any) {
            categories.value = { isLoading: false };
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

    const deleteProduct = async (id: string) => {
        categories.value = { isLoading: true };
        try {
            const response: any = await ApiService.delete('items/products/' + id,);
            const toastMessage = "Category deleted successfully"
            useAlertStore().setSuccessToast(toastMessage)
            categories.value = response.data.data
        } catch (error: any) {
            console.log(error)
            categories.value = { isLoading: false };
            const statusCode: any = error.response.status;
            switch (statusCode) {
                case 404:
                    useAlertStore().setErrorToast("Resource not found");
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
    return { categories, getCategories, createCategory, products, getProducts, createProduct, deleteCategory, updateCategory, deleteProduct, updateProduct }
})
