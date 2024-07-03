<!-- eslint-disable vue/no-textarea-mustache -->
<template>
  <DefaultLayout>
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Project Details -->
    <div class="grid grid-cols-4 my-5 mx-2 gap-y-4">
      <label class="text-sm font-semibold text-neautral-600"><span
          class="text-neutral-700">Title</span > : <span class="uppercase" >{{ project?.title }}</span></label>
      <label class="text-sm font-semibold text-neautral-600"><span class="text-neutral-700">Budget</span> : 
        {{project?.budget  }}</label>
      <label class="text-sm font-semibold text-neautral-600"><span class="text-neutral-700">Start Date</span> : {{
        project?.start_date }}</label>
      <label class="text-sm font-semibold text-neautral-600"><span class="text-neutral-700">End Date</span> : {{
        project?.end_date }}</label>
      <label class="text-sm font-semibold text-neautral-600"><span class="text-neutral-700">Region</span> : {{
        project?.region }}</label>
      <label class="text-sm font-semibold text-neautral-600"><span class="text-neutral-700">District</span> : {{
        project?.district }}</label>
      <label class="text-sm font-semibold text-neautral-600"><span class="text-neutral-700">Status</span> : <span
          class="text-green-400">{{ project?.status }}</span></label>
      <div class="col-span-4">
        <label for="project-description" class="text-neutral-700 mb-2 font-semibold">Description</label>
        <textarea id="project-description" rows="3" class=" focus:border-none focus:outline-none p-2 w-full"
          readonly>{{ project?.description }}</textarea>
      </div>
    </div> 
    <h2 class="text-title-md2 font-semibold text-black dark:text-white mb-4">
      Tasks
    </h2>
    <!-- Base Table -->
    <BaseTable :heads="heads" :lists="project?.tasks" :isLoading="project?.isLoading" @refetchData="refreshData" :isPaginationActive="false" :isSearchActive="false" >
      <template #action-buttons>
        <BaseButton @click="isCreateModalActive = true">
          <div class="flex items-center">
            <CircleAddIcon :size="18" /> <span class="ms-1">Create</span>
          </div>
        </BaseButton>
      </template>

      <template #list-index="{ index }">{{ index + 1 }}</template>
      <template #list-member="{ list }"> 
        <h5 class="uppercase" >{{ list.member.name }}</h5>
      </template>
      <!-- Actions Buttons -->
      <template #list-actions="{ list: list }">
        <div class="space-x-2 flex items-center">
          <BaseButtonSmall @click="handleViewMore(list)">
            <EyeIcon />
          </BaseButtonSmall>
          <BaseButtonSmall class="bg-blue-600" @click="handleUpdate(list)">
            <UpdateIcon />
          </BaseButtonSmall>
          <BaseButtonSmall @click="handleDelete(list.id)" customClasses="bg-red">
            <DeleteIcon />
          </BaseButtonSmall>
        </div>
      </template>
    </BaseTable>
  </DefaultLayout>

  <!-- Create Tasks -->
  <BaseModal :show="isCreateModalActive" @close="isCreateModalActive = false" modalTitle="create project task"
    maxWidthValue="800px">
    <Create @closeModalAfterSubmit="isCreateModalActive = false; fetchData(route.params['id'])" />
  </BaseModal>
  <!--  Task show more -->
  <BaseModal :show="isShowMoreModalActive" @close="isShowMoreModalActive = false" modalTitle="Project task details"
    maxWidthValue="1200px">
    <ShowMore @closeModalAfterSubmit="isShowMoreModalActive = false; fetchData(route.params['id'])" :task="selectedTask" />
  </BaseModal>
  
  <!--  Update Task model -->
  <BaseModal :show="isUpdateModalActive" @close="isUpdateModalActive = false" modalTitle="Update task"
    maxWidthValue="1200px">
    <Update @closeModalAfterSubmit="isUpdateModalActive = false; fetchData(route.params['id'])" :task="selectedTask" />
  </BaseModal>

  <!-- Change Status Modal -->
  <!-- <BaseModal :show="isChangeStatusModalActive" @close="isChangeStatusModalActive = false"
    modalTitle="Change project Status" maxWidthValue="500px">
    <div class="flex flex-col space-y-5 mb-5 mt-2">
      <el-select v-model="selectedStatus" placeholder="Select Status" style="width: 100%">
        <el-option selected v-for="(item, index) in projectStatusOptions" :key="index" :label="item" :value="item" />
      </el-select>
      <BaseButton @click="handleChangeTasksStatus" label="Change Status" :isLoading="useTasksStore()?.tasks?.isLoading"
        loadingText="Updating" />
    </div>
  </BaseModal> -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Create from './_Create.vue'
import Update from './_Update.vue'
import ShowMore from './_More.vue'
import { useTaskStore } from '@/stores/tasks';
import { storeToRefs } from 'pinia';
import BaseButtonSmall from '@/components/Buttons/BaseButtonSmall.vue';
import DeleteIcon from '@/assets/images/icon/DeleteIcon.vue';
import UpdateIcon from '@/assets/images/icon/UpdateIcon.vue';
import CircleAddIcon from '@/assets/images/icon/CircleAddIcon.vue';
import { useRoute } from 'vue-router';
import EyeIcon from '@/assets/images/icon/EyeIcon.vue';

const taskStore = useTaskStore()
const route = useRoute()
const { tasks, project } = storeToRefs(taskStore)

const pageTitle = ref('Project Details')
const isCreateModalActive = ref(false)
const isChangeStatusModalActive = ref(false)
const isUpdateModalActive = ref(false)
const isShowMoreModalActive = ref(false)
const resourceUrl = ref<string>('manager/tasks ')
const product = ref()
const selectedStatus = ref<string>('')
const projectStatusOptions = ['In Progress', 'Closed', 'Pending']
const selectedTasksId = ref('')
const selectedTask = ref<any>('')

const handleViewMore = (task: any) => {
  selectedTask.value = task
  isShowMoreModalActive.value = true
}

const handleDelete = async (id: string) => {
  if(confirm("Proceed to delete this task?")) {
    await useTaskStore().deleteTask(id)
    await fetchData(route.params['id'])
  }
}

const handleUpdate = (data: any) => {
  selectedTask.value = data
  isUpdateModalActive.value = true
}

// const handleChangeTasksStatus = async() => {
//     const status = selectedStatus.value === 'In Progress' ? 'progress' : selectedStatus.value
//     await useTaskStore().changeTasksStatus(status, selectedTasksId.value)
//     await fetchData(resourceUrl.value)
//     isChangeStatusModalActive.value = false
// }

const refreshData = async (paginationUrl: string) => {
  const newUrl = resourceUrl.value + paginationUrl
  await fetchData(newUrl)
}

const fetchData = async (id: any) => {
  await useTaskStore().getProjectById(id)
}

onMounted(async () => {
  await fetchData(route.params['id'])
})

const heads = [
  { name: 'S/no', value: 'index' },
  { name: 'number', value: 'number' },
  { name: 'title', value: 'title' },
  { name: 'start date', value: 'start_date' },
  { name: 'end date', value: 'end_date' },
  { name: 'weight (%)', value: 'weight' },
  { name: 'member', value: 'member' },
  { name: 'status', value: 'status' },
  { name: 'actions', value: 'actions' },
]
</script>


<style></style>