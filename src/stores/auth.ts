import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useAlertStore } from './alert'
import { ApiService } from '@/services/api'
import { getDateOneWeekLater } from '@/utils/dates'

export const useAuthStore = defineStore('auth', () => {
  const token = useCookies(['ACCESS_TOKEN_COOKIE'])
  const userCookie = useCookies(['USER_COOKIE'])
  const user = ref()

  //Setters
  const setUser = (data?: any) => (
    (user.value = { isLoading: false }),
    (user.value = data),
    setUserId(data)
  );
  const setToken = (data?: string) => (token.set('ACCESS_TOKEN_COOKIE', data, { path: '/', expires: getDateOneWeekLater() }));
  const setUserId = (data?: string) => (userCookie.set('USER_COOKIE', data, { path: '/', expires: getDateOneWeekLater() }));
  const clearAuthCredentials = () => (setToken(), setUser());
  const isUserAuthenticated = () => (token.get('ACCESS_TOKEN_COOKIE') == undefined ? false : true)

  //Actions
  //Register
  const register = async (data: any) => {
    user.value = { isLoading: true };
    try {
      const response: any = await ApiService.post("users/managers/registration", data);
      //Set user and token
      setToken(response.data.token);
      setUser(response.data.user);
      useAlertStore().setSuccessToast("Registered successfully");
    } catch (error: any) {
      user.value = { isLoading: false };
      const errors: any = error.response.data
      const statusCode: any = error.response.status;
      switch (statusCode) {
        case 400:
          useAlertStore().setErrorToast(errors[Object.keys(errors)[0]][0]);
          break;
        case 401:
          useAlertStore().setErrorToast("Invalid creadentials");
          break;
        default:
          useAlertStore().setErrorToast(
            "Something went wrong. Please try again later."
          );
          break;
      }
      useAlertStore().setErrorMessage(error);
    }
  };

  //Login
  const login = async (data: any) => {
    user.value = { isLoading: true };
    try {
      const response: any = await ApiService.post("auth/login", data);
      //Check if role of the user is not Manager
      if (response?.data?.user?.role !== 'Manager') {
        useAlertStore().setErrorToast("Invalid creadentials");
        return null
      }
      //Set user and token after successful login
      setToken(response.data.token);
      setUser(response.data.user);
      useAlertStore().setSuccessToast("Login successfully");
    } catch (error: any) {
      const errors: any = error.response.data
      const statusCode: any = error.response.status;
      user.value = { isLoading: false };
      switch (statusCode) {
        case 400:
          useAlertStore().setErrorToast(errors[Object.keys(errors)[0]][0]);
          break;
        case 401:
          useAlertStore().setErrorToast("Invalid creadentials");
          break;
        default:
          useAlertStore().setErrorToast(
            "Something went wrong. Please try again later."
          );
          break;
      }
      useAlertStore().setErrorMessage(error);
    }
  };
  //Logout
  const logout = async () => {
    try {
      await ApiService.post("auth/logout");
      clearAuthCredentials();
      useAlertStore().setSuccessToast("Logged out successfully");
    } catch (error: any) {
      console.log(error);
      switch (error.response.status) {
        case 401:
        case 403:
          useAlertStore().setErrorToast("Unauthenticated");
          break;
        default:
          useAlertStore().setErrorToast(
            "Something went wrong. Please try again later."
          );
          break;
      }
    }
  };

  return {
    user,
    token,
    setToken,
    setUser,
    userCookie,
    register,
    login,
    setUserId,
    clearAuthCredentials,
    logout,
    isUserAuthenticated
  };

})
