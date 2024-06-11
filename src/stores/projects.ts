import { ApiService } from '@/services/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAlertStore } from './alert'

export const useProjectStore = defineStore('projects', () => {
    const projects = ref()

    /*==============================Projects==============================*/
    const getProjects = async (url: any) => {
        projects.value = { isLoading: true };
        try {
            const response: any = await ApiService.get(url);
            projects.value = response.data
        } catch (error: any) {
            console.log(error)
            projects.value = { isLoading: false };
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

    const getProjectById = async (id: string) => {
        projects.value = { isLoading: true };
        try {
            const response: any = await ApiService.get('manager/projects/' + id);
            projects.value = response.data
        } catch (error: any) {
            projects.value = { isLoading: false };
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

    const createProjects = async (data: any) => {
        projects.value = { isLoading: true };
        try {
            const response: any = await ApiService.post('projects', data);
            const toastMessage = 'Project created successfully'
            useAlertStore().setSuccessToast(toastMessage)
            projects.value = response.data.data
        } catch (error: any) {
            console.log(error)
            projects.value = { isLoading: false };
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

    const updateProjects = async (data: any, id: string) => {
        projects.value = { isLoading: true };
        try {
            const response: any = await ApiService.put('projects/' + id, data);
            const toastMessage =  'Project updated successfully'
            useAlertStore().setSuccessToast(toastMessage)
            projects.value = response.data.data
        } catch (error: any) {
            projects.value = { isLoading: false };
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

    const changeProjectStatus = async (status: string, id: string) => {
        projects.value = { isLoading: true };
        try {
            const response: any = await ApiService.patch('projects/' + id + '/' + status);
            const toastMessage =  'Project updated successfully'
            useAlertStore().setSuccessToast(toastMessage)
            projects.value = response.data.data
        } catch (error: any) {
            projects.value = { isLoading: false };
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

    const deleteProject = async (id: string) => {
        projects.value = { isLoading: true };
        try {
            const response: any = await ApiService.delete('projects/' + id,);
            const toastMessage = "Project deleted successfully"
            useAlertStore().setSuccessToast(toastMessage)
            projects.value = response.data.data
        } catch (error: any) {
            console.log(error)
            projects.value = { isLoading: false };
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
        projects,
        getProjects,
        getProjectById,
        createProjects,
        updateProjects,
        deleteProject,
        changeProjectStatus
     }
})
