<template>
    <DefaultLayout>
            <!-- Breadcrumb Start -->
            <BreadcrumbDefault :pageTitle="pageTitle" :breadCumbItems="breadCumbItems" />

            <!-- Base Table -->
            <BaseTable :heads="heads" :lists="categories" :isLoading="categories?.data?.isLoading"
                @refetchData="refreshData">
                <template #action-buttons>
                    <BaseButton @click="isCreateModalActive = true">
                        <div class="flex items-center">
                            <CircleAddIcon :size="18" /> <span class="ms-1">Create</span>
                        </div>
                    </BaseButton>
                </template>
                <template #list-index="{ index }">{{ index + 1 }}</template>
                <!-- Actions Buttons -->
                <template #list-actions="{ list: list }">
                    <div class="space-x-2">
                        <BaseButtonSmall @click="handleUpdate(list)">
                            <UpdateIcon />
                        </BaseButtonSmall>
                        <BaseButtonSmall @click="handleDelete(list.id)" customClasses="bg-red">
                            <DeleteIcon />
                        </BaseButtonSmall>
                    </div>
                </template>
            </BaseTable>
        <!-- </div> -->
    </DefaultLayout>
    <!-- Create Modal -->
    <BaseModal :show="isCreateModalActive" @close="isCreateModalActive = false" modalTitle="create product category"
        maxWidthValue="500px">
        <Create @closeModalAfterSubmit="isCreateModalActive = false; fetchData(resourceUrl)" type="Product" />
    </BaseModal>
    <!-- Update Modal -->
    <BaseModal :show="isUpdateModalActive" @close="isUpdateModalActive = false" modalTitle="Update product category"
        maxWidthValue="500px">
        <Update @closeModalAfterSubmit="isUpdateModalActive = false; fetchData(resourceUrl)" :category="category"
            type="Product" />
    </BaseModal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import CircleAddIcon from 'vue-material-design-icons/PlusCircle.vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseTable from '@/components/Tables/BaseTable.vue';
import Create from '@/views/products/categories/_Create.vue'
import Update from '@/views/products/categories/_Update.vue'
import { useItemStore } from '@/stores/items';
import { storeToRefs } from 'pinia';
import UpdateIcon from '@/assets/images/icon/UpdateIcon.vue';
import DeleteIcon from '@/assets/images/icon/DeleteIcon.vue';
import CircleAddIcon from '@/assets/images/icon/CircleAddIcon.vue';
const itemStore = useItemStore()
const { categories } = storeToRefs(itemStore)

const pageTitle = ref('Categories')
const isCreateModalActive = ref<boolean>(false)
const isUpdateModalActive = ref<boolean>(false)
const breadCumbItems = [{ label: 'Products', path: '/products' }]
const resourceUrl = ref<string>('items/categories?page_size=5')
const category = ref<any>()

const handleDelete = async (id: string) => {
    await useItemStore().deleteCategory(id)
    await fetchData(resourceUrl.value)
}

const handleUpdate = (data: any) => {
    category.value = data
    isUpdateModalActive.value = true
}

const refreshData = async (paginationUrl: string) => {
    const resourceUrlPlain = resourceUrl.value.split('?')[0]
    const newUrl = resourceUrlPlain + paginationUrl
    await fetchData(newUrl)
}

const fetchData = async (url: string) => {
    await useItemStore().getCategories(url)
}

onMounted(async () => {
    await fetchData(resourceUrl.value)
})

const heads = [
    { name: 'index', value: 'index' },
    { name: 'name', value: 'name' },
    { name: 'actions', value: 'actions' },
]
</script>


<style></style>