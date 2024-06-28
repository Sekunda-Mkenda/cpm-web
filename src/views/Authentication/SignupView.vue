<template>
  <DefaultAuthCard subtitle="Welcome Again" title="Sign Up">
    <form @submit.prevent="handleLogin">
      <InputGroup v-model="first_name" v-bind="firstNameProps" :errorMessage="errors.first_name" label="First Name" type="text"
        placeholder="Beatrice" :isPrefixIcon="true" class="mb-1">
        <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.5">
            <path
              d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
              fill="" />
            <path
              d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
              fill="" />
          </g>
        </svg>
      </InputGroup>
      <InputGroup v-model="middle_name" v-bind="middleNameProps" :errorMessage="errors.middle_name" label="Middle Name" type="text"
        placeholder="John" :isPrefixIcon="true" class="mb-1">
        <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.5">
            <path
              d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
              fill="" />
            <path
              d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
              fill="" />
          </g>
        </svg>
      </InputGroup>
      <InputGroup v-model="last_name" v-bind="lastNameProps" :errorMessage="errors.last_name" label="Last Name" type="text"
        placeholder="Mkenda" :isPrefixIcon="true" class="mb-1">
        <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.5">
            <path
              d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
              fill="" />
            <path
              d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
              fill="" />
          </g>
        </svg>
      </InputGroup>

      <InputGroup v-model="mobile" v-bind="mobileProps" :errorMessage="errors.mobile" label="Mobile" type="number"
        leftPadding="75px" placeholder="744968968" :isPrefixIcon="true" class="mb-1">
        <div class="flex items-center mt-[2px]">
          <svg class="fill-current text-[#8888]" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
            viewBox="0 0 24 24">
            <path fill=""
              d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3" />
          </svg>
          <p class="text-[16px] font-bold ms-0.5 text-neutral-500">+255</p>
        </div>
      </InputGroup>

      <InputGroup v-model="email" v-bind="emailProps" :errorMessage="errors.email" label="Email" type="email"
        placeholder="beatrice@outlook.com" :isPrefixIcon="true" class="mb-1">
        <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.5">
            <path
              d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
              fill="" />
          </g>
        </svg>
      </InputGroup>

      <InputGroup v-model="password" v-bind="passwordProps" :errorMessage="errors.password" label="Password"
        type="password" placeholder="Enter your password" :isPrefixIcon="true" class="mb-1">
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

      <InputGroup v-model="passwordConfirmation" v-bind="passwordConfirmationProps"
        :errorMessage="errors.passwordConfirmation" label="Re-type Password" type="password"
        placeholder="Re-enter your password" :isPrefixIcon="true" class="mb-2">
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

      <div class="mb-5 mt-6">
        <BaseButton :isLoading="useAuthStore().user?.isLoading" class="w-full text-white" label="Create Account"
          type="submit" />
      </div>
      <div class="mt-2 text-center">
        <p class="font-medium">
          Already have an account?
          <router-link to="/auth/login" class="text-primary">Sign in</router-link>
        </p>
      </div>
    </form>
  </DefaultAuthCard>
</template>

<script setup lang="ts">
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { ref as yupRef } from 'yup'
import { useAuthStore } from '@/stores/auth';
import { useAlertStore } from '@/stores/alert';
import router from '@/router';

const { defineField, handleSubmit, resetForm, errors } = useForm({
  validationSchema: yup.object({
    first_name: yup.string().required().label('First name'),
    middle_name: yup.string().required().label('Middle name'),
    last_name: yup.string().required().label('Last name'),
    mobile: yup.string().required().min(9).label('Mobile'),
    email: yup.string().email().required().label('email'),
    password: yup.string().required().label('Password'),
    passwordConfirmation: yup.string()
      .oneOf([yupRef("password") as unknown as string], "Passwords must match")
      .required("Password confirmation is required")
      .label("Confirm Password"),
  }),
});

const [email, emailProps] = defineField('email')
const [mobile, mobileProps] = defineField('mobile')
const [first_name, firstNameProps] = defineField('first_name')
const [middle_name, middleNameProps] = defineField('middle_name')
const [last_name, lastNameProps] = defineField('last_name')
const [password, passwordProps] = defineField('password')
const [passwordConfirmation, passwordConfirmationProps] = defineField('passwordConfirmation')

const handleLogin = handleSubmit(async (values) => {
  values['mobile'] = '255' + values['mobile']
  values['password_confirmation'] = values['passwordConfirmation'];
  delete values['passwordConfirmation']
  await register(values)

});

const register = async (data: any) => {
  await useAuthStore().register(data)
  if (!useAlertStore().errorMessage) {
    resetForm()
    router.push({ name: 'dashboard', replace: true })
  }
  useAlertStore().setErrorMessage()
}

</script>
