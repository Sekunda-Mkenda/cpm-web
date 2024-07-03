<!-- eslint-disable vue/no-textarea-mustache -->
<template>
    <!-- Project Details -->
    <div class="grid grid-cols-4 mt-2 mx-2 gap-4">
        <label class="text-sm font-semibold text-neautral-600 "><span class="text-neutral-700">Title</span> : <span
                class="uppercase">{{ task?.title }}</span></label>
        <label class="text-sm font-semibold text-neautral-600"><span class="text-neutral-700">Number</span> : {{
            task?.number }}</label>

        <label class="text-sm font-semibold text-neautral-600"><span class="text-neutral-700">Start</span> : {{
            task?.start_date }}</label>
        <label class="text-sm font-semibold text-neautral-600"><span class="text-neutral-700">End</span> : {{
            task?.end_date }}</label>
        <label class="text-sm font-semibold text-neautral-600"><span class="text-neutral-700">Member Assigned</span> :
            {{
                task?.member?.name }}</label>
        <label class="text-sm font-semibold text-neautral-600"><span class="text-neutral-700">Weight</span> : {{
            task?.weight + "%" }}</label>
        <label class="text-sm font-semibold text-neautral-600"><span class="text-neutral-700">Status</span> : <span
                class="text-green-400">{{ task?.status }}</span></label>
        <div class="col-span-4">
            <label for="project-description" class="text-neutral-700 mb-2 font-semibold">Description</label>
            <textarea id="project-description" rows="1" class="bg-[#f1f1f1] focus:border-none focus:outline-none p-2 w-full"
                readonly>{{ task?.description }}</textarea>
        </div>
    </div>
    <h2 class="text-title-md2 font-semibold text-black dark:text-white my-4">
        Task Items
    </h2>
    <!-- Base Table -->
    <BaseTable :heads="heads" :lists="task?.task_items" :isLoading="project?.isLoading" @refetchData="refreshData" 
        :isPaginationActive="false" :isSearchActive="false" >
        <template #list-index="{ index }">{{ index + 1 }}</template>
        <template #list-amount="{ list }">
            <h5>{{ formatNumberWithCommas(list.amount) }}</h5>
        </template>
        <template #list-quantity="{ list }">
            <h5>{{ list.quantity ? formatNumberWithCommas(list.quantity) : 'N/A' }}</h5>
        </template>
        <template #list-unit="{ list }">
            <h5>{{ list.unit ? list.unit : 'N/A' }}</h5>
        </template>
        <template #list-description="{ list }">
          <div class="w-50" >
            <textarea cols="20" class="border-[1px] border-stroke rounded-sm p-2" >{{ list.description }}</textarea>
          </div>
        </template>
        <template #list-attachment="{ list }">
            <p v-if="list.attachment" > <a :href="list.attachment" target="_blank" class="underline text-blue-600" >attachment</a> </p>
            <p v-else class="text-sm" >N/A</p>
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

    <!-- Create Tasks -->
    <BaseModal :show="isCreateModalActive" @close="isCreateModalActive = false" modalTitle="create project task"
        maxWidthValue="800px">
        <Create @closeModalAfterSubmit="isCreateModalActive = false; fetchData(route.params['id'])" />
    </BaseModal>
</template>

<script setup lang="ts">
import { ref, onMounted, toRefs } from 'vue'
import Create from './_Create.vue'
import { useTaskStore } from '@/stores/tasks';
import { storeToRefs } from 'pinia';
import BaseButtonSmall from '@/components/Buttons/BaseButtonSmall.vue';
import DeleteIcon from '@/assets/images/icon/DeleteIcon.vue';
import UpdateIcon from '@/assets/images/icon/UpdateIcon.vue';
import CircleAddIcon from '@/assets/images/icon/CircleAddIcon.vue';
import { useRoute } from 'vue-router';
import EyeIcon from '@/assets/images/icon/EyeIcon.vue';
import { formatNumberWithCommas } from '@/utils/number_formatters';

const props = defineProps({task: {type: Object}})

const taskStore = useTaskStore()
const route = useRoute()
const { task } = toRefs(props)

const pageTitle = ref('Project Details')
const isCreateModalActive = ref(false)
const isChangeStatusModalActive = ref(false)
const isUpdateModalActive = ref(false)
const isShowMoreModalActive = ref(false)
const resourceUrl = ref<string>('manager/tasks ')
const product = ref()
const selectedTask = ref<any>('')

const handleViewMore = (task: any) => {
    selectedTask.value = task.task_items
    isShowMoreModalActive.value = true
}

const handleDelete = async (id: string) => {
    // await useTaskStore().deleteTask(id)
    await fetchData(resourceUrl.value)
}

const handleUpdate = (data: any) => {
    product.value = data
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
    { name: 'title', value: 'title' },
    { name: 'type', value: 'type' },
    { name: 'amount (TSh)', value: 'amount' },
    { name: 'quantity', value: 'quantity' },
    { name: 'unit', value: 'unit' },
    { name: 'description', value: 'description' },
    { name: 'attachment', value: 'attachment' },
]
</script>


<style></style>