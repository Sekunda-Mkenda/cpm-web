<template>
  <DefaultLayout>
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Base Table -->
    <BaseTable :heads="heads" :lists="projects" :isLoading="projects?.data?.isLoading" @refetchData="refreshData">
      <template #action-buttons>
        <BaseButton @click="isCreateModalActive = true">
          <div class="flex items-center">
            <CircleAddIcon :size="18" /> <span class="ms-1">Create</span>
          </div>
        </BaseButton>
      </template>

      <template #list-index="{ index }">{{ index + 1 }}</template>
      <template #list-more="{ list }"> <a :href="`project/${list.id}/tasks`" class="underline text-blue-600" >view tasks</a> </template>
      <!-- Actions Buttons -->
      <template #list-actions="{ list: list }">
        <div class="space-x-2 flex items-center">
          <BaseButtonSmall class="bg-blue-600"  @click="isChangeStatusModalActive = true; selectedProjectId = list.id; selectedStatus = list.status" label="Status" customClasses="bg-blue-500 text-white">
            <!-- <DeleteIcon /> -->
          </BaseButtonSmall>
          <BaseButtonSmall @click="handleUpdate(list)">
            <UpdateIcon />
          </BaseButtonSmall>
          <BaseButtonSmall @click="handleDelete(list.id)" customClasses="bg-red">
            <DeleteIcon />
          </BaseButtonSmall>
        </div>
      </template>
    </BaseTable>
  </DefaultLayout>

  <!-- Update Projects -->
  <BaseModal :show="isCreateModalActive" @close="isCreateModalActive = false" modalTitle="create project"
    maxWidthValue="800px">
    <Create @closeModalAfterSubmit="isCreateModalActive = false; fetchData(resourceUrl)" />
  </BaseModal>

  <!-- Change Status Modal -->
  <BaseModal :show="isChangeStatusModalActive" @close="isChangeStatusModalActive = false" modalTitle="Change project Status" maxWidthValue="500px">
    <div class="flex flex-col space-y-5 mb-5 mt-2">
      <el-select v-model="selectedStatus" placeholder="Select Status" style="width: 100%">
        <el-option selected v-for="(item, index) in projectStatusOptions" :key="index" :label="item" :value="item" />
      </el-select>
      <BaseButton @click="handleChangeProjectStatus" label="Change Status" :isLoading="useProjectStore()?.projects?.isLoading" loadingText="Updating" />
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Create from './_Create.vue'
import { useProjectStore } from '@/stores/projects';
import { storeToRefs } from 'pinia';
import BaseButtonSmall from '@/components/Buttons/BaseButtonSmall.vue';
import DeleteIcon from '@/assets/images/icon/DeleteIcon.vue';
import UpdateIcon from '@/assets/images/icon/UpdateIcon.vue';
import CircleAddIcon from '@/assets/images/icon/CircleAddIcon.vue';

const itemStore = useProjectStore()
const { projects } = storeToRefs(itemStore)

const pageTitle = ref('Projects')
const isCreateModalActive = ref(false)
const isChangeStatusModalActive = ref(false)
const isUpdateModalActive = ref(false)
const resourceUrl = ref<string>('manager/projects')
const product = ref()
const selectedStatus = ref<string>('')
const projectStatusOptions = ['In Progress', 'Closed', 'Pending']
const selectedProjectId = ref('')

const handleDelete = async (id: string) => {
  await useProjectStore().deleteProject(id)
  await fetchData(resourceUrl.value)
}

const handleUpdate = (data: any) => {
  product.value = data
  isUpdateModalActive.value = true
}

const handleChangeProjectStatus = async() => {
    const status = selectedStatus.value === 'In Progress' ? 'progress' : selectedStatus.value
    await useProjectStore().changeProjectStatus(status, selectedProjectId.value)
    await fetchData(resourceUrl.value)
    isChangeStatusModalActive.value = false
}

const refreshData = async (paginationUrl: string) => {
  const newUrl = resourceUrl.value + paginationUrl
  await fetchData(newUrl)
}

const fetchData = async (url: string) => {
  await useProjectStore().getProjects(url)
}

onMounted(async () => {
  await fetchData(resourceUrl.value)
})

const heads = [
  { name: 'S/no', value: 'index' },
  { name: 'title', value: 'title' },
  { name: 'start date', value: 'start_date' },
  { name: 'end date', value: 'end_date' },
  { name: 'status', value: 'status' },
  { name: 'more', value: 'more' },
  { name: 'actions', value: 'actions' },
]
</script>


<style></style>