<template>
    <DefaultAuthCard subtitle="Welcome back" title="Sign In">
        <form @submit.prevent="handleLogin">
            <InputGroup v-model="mobile" v-bind="mobileProps" :errorMessage="errors.mobile" label="Mobile" type="number"
                leftPadding="75px" placeholder="744968968" :isPrefixIcon="true" class="mb-2">
                <div class="flex items-center mt-[2px]">
                    <svg class="fill-current text-[#8888]" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                        viewBox="0 0 24 24">
                        <path fill=""
                            d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3" />
                    </svg>
                    <p class="text-[16px] font-bold ms-0.5 text-neutral-500">+255</p>
                </div>
            </InputGroup>
            <InputGroup v-model="password" v-bind="passwordProps" :errorMessage="errors.password" label="Password"
                type="password" placeholder="*********" :isPrefixIcon="true">
                <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.5">
                        <path
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill="" />
                        <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                            fill="" />
                    </g>
                </svg>
            </InputGroup>
<!-- 
            <div class=" text-end mt-2">
                <p class="font-medium text-xs">
                    Forgort Password?
                    <router-link to="/auth/signup" class="text-primary">Reset here</router-link>
                </p>
            </div> -->

            <div class="mb-5 mt-6">
                <BaseButton :isLoading="useAuthStore()?.user?.isLoading" class="w-full text-white" label="Login"
                    type="submit" />
            </div>

            <div class="mt-6 text-center">
                <p class="font-medium">
                    Don’t have any account?
                    <router-link to="/auth/signup" class="text-primary">Sign up</router-link>
                </p>
            </div>
        </form>
    </DefaultAuthCard>
</template>

<script setup>
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth'
import { useAlertStore } from '@/stores/alert'
import { useForm } from 'vee-validate'
import router from '@/router';

const { defineField, handleSubmit, resetForm, errors } = useForm({
    validationSchema: yup.object({
        mobile: yup.string().length(9, 'Mobile number must have 9 digits').required().label('mobile'),
        password: yup.string().required().label('Password'),
    }),
});

const [mobile, mobileProps] = defineField('mobile')
const [password, passwordProps] = defineField('password')

const handleLogin = handleSubmit(async (values) => {
    values['mobile'] = '255' + values['mobile']
    await useAuthStore().login(values)
    if (!useAlertStore().errorMessage) {
        resetForm()
        router.push({ name: 'dashboard', replace: true })
    }
    useAlertStore().setErrorMessage()
});
</script>
