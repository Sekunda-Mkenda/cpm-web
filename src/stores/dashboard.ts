import { ApiService } from '@/services/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAlertStore } from './alert'

export const useDashboardStore = defineStore('dashboard', () => {
    const dashboard = ref()
    /*==============================Dashboard Data==============================*/
    const getDashboardData = async () => {
        dashboard.value = { isLoading: true };
        try {
            const response: any = await ApiService.get('dashboard');
            dashboard.value = response.data
        } catch (error: any) {
            console.log(error)
            dashboard.value = { isLoading: false };
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

    return {
        dashboard,
        getDashboardData
    }
})
