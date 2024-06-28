<script setup lang="ts">
import { ref, watch, toRefs, computed } from "vue";
import InputGroup from "../Auths/InputGroup.vue";

const props = defineProps({
  lists: Object,
  heads: Array<{ name: string, value: string }>,
  title: String,
  isLoading: Boolean,
  isPaginationActive: {
    type: Boolean,
    default: true
  },
  showActionSection: {
    type: Boolean,
    default: true
  },
  isSearchActive: {type: Boolean, default: true}
})

const { isLoading, lists, isPaginationActive } = toRefs(props)
const emits = defineEmits(['refetchData'])

const searchQuery = ref<string>('')
const noOfEntries = ref(5)
const currentPage = ref(lists?.value?.current)

const tableData = computed(() => {
  if(!isPaginationActive.value) {
  return lists?.value
  }
  return lists?.value?.data
})
const totalItems = computed(() => {
  return lists?.value?.count ?? 0
})

// const currentPage = computed(() => {
//   return lists?.value?.current_page ?? 1
// })

// watchEffect(() => {
//   noOfEntries.value = paginationData?.value?.page_size
// })

// const noOfEntriesTitle = {
//   value: "pageSize",
//   render: "pageSize"
// }

// const onClickHandler = (number: Number) => {
//   currentPage.value = number
//   currentPage.value
// }

const refreshData = () => {
  const url = `?page=${currentPage.value}&page_size=${noOfEntries.value ?? 5}&search=${searchQuery.value}`
  console.log(url)
  emits('refetchData', url)
}

watch(currentPage, () => {
  refreshData()
})

watch(searchQuery, () => {
  currentPage.value = 1
  refreshData()
})

watch(noOfEntries, () => {
  currentPage.value = 1
  refreshData()
})
</script>

<template>

  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div class="max-w-full overflow-x-auto pb-2">
      <div :class="[isSearchActive ? 'justify-between' : 'justify-end']" class="flex items-center mb-5">
        <!-- <div>
          <el-select v-model="noOfEntries" placeholder="No of entries" style="width: 140px">
            <el-option selected v-for="(item, index) in entriesOptions" :key="index" :label="item" :value="item" />
          </el-select>
        </div> -->
        <InputGroup v-if="isSearchActive" v-model="searchQuery" :isPrefixIcon="true" label="" placeholder="Search... ">
          <svg class="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary mt-[2px]" width="18"
            height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
              fill="" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
              fill="" />
          </svg>
        </InputGroup>
        <div>
          <slot name="action-buttons"></slot>
        </div>
      </div>
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-bodydark text-left dark:bg-meta-4">
            <th class="min-w-[120px] py-2 px-4 text-black dark:text-white uppercase font-bold text-sm" v-for=" (head, index)
              in heads" :key="index">
              <slot :name="'head-' + head?.name">{{ head.name }}</slot>
            </th>
            <!-- <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              Invoice date
            </th>
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">Actions</th> -->
          </tr>
        </thead>
        <tbody class="">
          <tr v-if="isLoading && isPaginationActive">
            <td :colspan="heads?.length" class="py-5 px-4 pl-9 xl:pl-11">
              <div class="h-40 flex justify-center items-center">
                <h1>Loading data</h1>
              </div>
            </td>
          </tr>
          <tr v-for="(list, index) in tableData" :key="index" class="border-b-[1px] border-stroke">
            <td class="py-2 px-4" v-for="head, i in heads" :key="i">
              <slot :list="list" :index="index" :name="'list-' + head.value">{{ list[head.value] }}</slot>
            </td>
          </tr>
          <tr class="col-span-full" v-if="!isLoading && tableData?.length == 0">
            <td :colspan="heads?.length">
              <div class="w-full flex justify-center items-center py-5 flex-col gap-y-3">
                <!-- <img src="@/assets/icons/empty.svg" class="h-[80px] lg:h-[140px]" alt=""> -->
                <p>No data found</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex w-full justify-end py-3">
      <el-pagination v-if="lists?.data" background v-model:current-page="currentPage" v-model:page-size="noOfEntries"
        :page-sizes="[5, 10, 25, 50, 100]" layout="total, sizes, prev, pager, next" :total="totalItems" />
    </div>
  </div>
</template>

<style>
:root {
  --el-color-primary: #F5B001;
}

html.dark {
  --el-color-primary: #F5B001;
}
</style>