import { ApiService } from '@/services/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAlertStore } from './alert'

export const useMemberStore = defineStore('members', () => {
    const members = ref()

    /*==============================Members==============================*/
    const getMembers = async (url: any) => {
        members.value = { isLoading: true };
        try {
            const response: any = await ApiService.get(url);
            members.value = response.data
        } catch (error: any) {
            console.log(error)
            members.value = { isLoading: false };
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

    const getMemberById = async (id: string) => {
        members.value = { isLoading: true };
        try {
            const response: any = await ApiService.get('manager/members/' + id);
            members.value = response.data
        } catch (error: any) {
            members.value = { isLoading: false };
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

    const createMember = async (data: any) => {
        members.value = { isLoading: true };
        try {
            const response: any = await ApiService.post('members', data);
            const toastMessage = 'Member created successfully'
            useAlertStore().setSuccessToast(toastMessage)
            members.value = response.data.data
        } catch (error: any) {
            console.log(error)
            members.value = { isLoading: false };
            const errors = error.response.data
            const statusCode: any = error.response.status;
            switch (statusCode) {
                case 400:
                    useAlertStore().setErrorToast(errors[Object.keys(errors)[0]][0]);
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

    const updateMember = async (data: any, id: string) => {
        members.value = { isLoading: true };
        try {
            const response: any = await ApiService.put('members/' + id, data);
            const toastMessage =  'Member updated successfully'
            useAlertStore().setSuccessToast(toastMessage)
            members.value = response.data.data
        } catch (error: any) {
            members.value = { isLoading: false };
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

    const changeMemberstatus = async (status: string, id: string) => {
        members.value = { isLoading: true };
        try {
            const response: any = await ApiService.patch('members/' + id + '/' + status);
            const toastMessage =  'Member updated successfully'
            useAlertStore().setSuccessToast(toastMessage)
            members.value = response.data.data
        } catch (error: any) {
            members.value = { isLoading: false };
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

    const deleteMember = async (id: string) => {
        members.value = { isLoading: true };
        try {
            const response: any = await ApiService.delete('members/' + id,);
            const toastMessage = "Member deleted successfully"
            useAlertStore().setSuccessToast(toastMessage)
            members.value = response.data.data
        } catch (error: any) {
            console.log(error)
            members.value = { isLoading: false };
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

    return {
        members,
        getMembers,
        getMemberById,
        createMember,
        updateMember,
        deleteMember,
        changeMemberstatus
     }
})
