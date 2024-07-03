<script setup lang="ts">
import { ref, computed } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import ChagePassword from './ChagePassword.vue'

const pageTitle = ref('Profile')
const userCookie = useCookies(['USER_COOKIE'])
const isChangePasswordModalActive = ref(false)

const user = computed(() => {
  return userCookie.get('USER_COOKIE')
})

</script>

<template>
  <DefaultLayout>
    <div class="mx-auto max-w-242.5">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <!-- Breadcrumb End -->
      <!-- <ProfileCard /> -->

      <div class="w-full flex justify-center">
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
          <div class="px-6 py-4">
            <p class="text-gray-700 text-base">
              <strong>First Name:</strong> {{ user?.first_name }}<br>
              <strong>Middle Name:</strong> {{ user?.middle_name }}<br>
              <strong>Last Name:</strong> {{ user?.last_name }}<br>
              <strong>Email:</strong> {{ user?.email }}<br>
              <strong>Mobile:</strong> {{ user?.mobile }}<br>
              <strong>Role:</strong> {{ user?.role }}<br>
            </p>

            <div class="mt-2" >
              <BaseButtonSmall @click="isChangePasswordModalActive = true" customClasses="bg-red">
                <span class="text-white" >Change Password</span>
              </BaseButtonSmall>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>

  <!-- Create Projects -->
  <BaseModal :show="isChangePasswordModalActive" @close="isChangePasswordModalActive = false"
    modalTitle="Change Password" maxWidthValue="700px">
    <ChagePassword @closeModalAfterSubmit="isChangePasswordModalActive = false;" />
  </BaseModal>
</template>
