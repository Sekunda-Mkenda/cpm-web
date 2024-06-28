<template>
  <DefaultLayout>
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Base Table -->
    <BaseTable :heads="heads" :lists="members" :isLoading="members?.data?.isLoading" @refetchData="refreshData">
      <template #action-buttons>
        <BaseButton @click="isCreateModalActive = true">
          <div class="flex items-center">
            <CircleAddIcon  :size="18" /> <span class="ms-1">Create</span>
          </div>
        </BaseButton>
      </template>

      <template #list-index="{ index }">{{ index + 1 }}</template>
      <template #list-name="{ list: list }">
        <h4 class="uppercase">{{ list.first_name + " " + list.middle_name + " " + list.last_name }}</h4>
      </template>
      <template #list-profile="{ list: list }">
        <img class="rounded-full h-[60px] w-[60px]" :src="list.profile" alt="">
      </template>
      <!-- Actions Buttons -->
      <template #list-actions="{ list: list }">
        <div class="space-x-2 flex items-center">
          <!-- <BaseButtonSmall
            @click="isChangeStatusModalActive = true; selectedProjectId = list.id; selectedStatus = list.status"
            label="Status" customClasses="bg-blue text-white">
          </BaseButtonSmall> -->
          <BaseButtonSmall @click="selectedMember=list; isUpdateModalActive = true">
            <UpdateIcon />
          </BaseButtonSmall>
          <BaseButtonSmall @click="handleDelete(list.id)" customClasses="bg-red">
            <DeleteIcon />
          </BaseButtonSmall>
        </div>
      </template>
    </BaseTable>
  </DefaultLayout>

  <!-- Update members -->
  <BaseModal :show="isCreateModalActive" @close="isCreateModalActive = false" modalTitle="create new member"
    maxWidthValue="800px">
    <Create @closeModalAfterSubmit="isCreateModalActive = false; fetchData(resourceUrl)" />
  </BaseModal>

  <!-- Update members -->
  <BaseModal :show="isUpdateModalActive" @close="isUpdateModalActive = false" modalTitle="update member"
    maxWidthValue="800px">
    <Update @closeModalAfterSubmit="isUpdateModalActive = false; fetchData(resourceUrl)" :member="selectedMember" />
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Create from './_Create.vue'
import Update from './_Update.vue'
import { useMemberStore } from '@/stores/members';
import { storeToRefs } from 'pinia';
import BaseButtonSmall from '@/components/Buttons/BaseButtonSmall.vue';
import DeleteIcon from '@/assets/images/icon/DeleteIcon.vue';
import UpdateIcon from '@/assets/images/icon/UpdateIcon.vue';
import CircleAddIcon from '@/assets/images/icon/CircleAddIcon.vue';

const itemStore = useMemberStore()
const { members } = storeToRefs(itemStore)

const pageTitle = ref('Members')
const isCreateModalActive = ref(false)
const isChangeStatusModalActive = ref(false)
const isUpdateModalActive = ref(false)
const resourceUrl = ref<string>('members')
const product = ref()
const selectedStatus = ref<string>('')
const projectStatusOptions = ['In Progress', 'Closed', 'Pending']
const selectedProjectId = ref('')
const selectedMember = ref('')

const handleDelete = async (id: string) => {
  if(confirm("Are you sure you want to delete this member?")) {
    await useMemberStore().deleteMember(id)
    await fetchData(resourceUrl.value)
  }
}

const refreshData = async (paginationUrl: string) => {
  const newUrl = resourceUrl.value + paginationUrl
  await fetchData(newUrl)
}

const fetchData = async (url: string) => {
  await useMemberStore().getMembers(url)
}

onMounted(async () => {
  await fetchData(resourceUrl.value)
})

const heads = [
  { name: 'S/no', value: 'index' },
  { name: 'profile', value: 'profile' },
  { name: 'name', value: 'name' },
  { name: 'mobile', value: 'mobile' },
  { name: 'email', value: 'email' },
  { name: 'gender', value: 'gender' },
  { name: 'actions', value: 'actions' },
]
</script>


<style></style>