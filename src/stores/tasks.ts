import { ApiService } from '@/services/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAlertStore } from './alert'

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref()
    const project = ref()
    const managerMembers = ref()

    /*==============================Tasks==============================*/
    const getTasks = async (url: any) => {
        tasks.value = { isLoading: true };
        try {
            const response: any = await ApiService.get(url);
            tasks.value = response.data
        } catch (error: any) {
            console.log(error)
            tasks.value = { isLoading: false };
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

    const getManagerMembers = async () => {
        managerMembers.value = { isLoading: true };
        try {
            const response: any = await ApiService.get('manager/members');
            managerMembers.value = response.data
        } catch (error: any) {
            console.log(error)
            managerMembers.value = { isLoading: false };
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
        project.value = { isLoading: true };
        try {
            const response: any = await ApiService.get('projects/' + id);
            console.log(response.data)
            project.value = response.data
        } catch (error: any) {
            project.value = { isLoading: false };
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

    const createTasks = async (data: any) => {
        tasks.value = { isLoading: true };
        try {
            const response: any = await ApiService.post('tasks', data);
            const toastMessage = 'Task created successfully'
            useAlertStore().setSuccessToast(toastMessage)
            tasks.value = response.data.data
        } catch (error: any) {
            console.log(error)
            tasks.value = { isLoading: false };
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

    const updateTasks = async (data: any, id: string) => {
        tasks.value = { isLoading: true };
        try {
            const response: any = await ApiService.put('tasks/' + id, data);
            const toastMessage = 'Project updated successfully'
            useAlertStore().setSuccessToast(toastMessage)
            tasks.value = response.data.data
        } catch (error: any) {
            tasks.value = { isLoading: false };
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

    const changeTaskstatus = async (status: string, id: string) => {
        tasks.value = { isLoading: true };
        try {
            const response: any = await ApiService.patch('tasks/' + id + '/' + status);
            const toastMessage = 'Project updated successfully'
            useAlertStore().setSuccessToast(toastMessage)
            tasks.value = response.data.data
        } catch (error: any) {
            tasks.value = { isLoading: false };
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
        tasks.value = { isLoading: true };
        try {
            const response: any = await ApiService.delete('tasks/' + id,);
            const toastMessage = "Project deleted successfully"
            useAlertStore().setSuccessToast(toastMessage)
            tasks.value = response.data.data
        } catch (error: any) {
            console.log(error)
            tasks.value = { isLoading: false };
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
        tasks,
        getTasks,
        project,
        getProjectById,
        createTasks,
        updateTasks,
        deleteProject,
        changeTaskstatus,
        getManagerMembers,
        managerMembers
    }
})
