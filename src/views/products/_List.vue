<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="pageTitle" />
        <!-- Base Table -->
        <BaseTable :heads="heads" :lists="products" :isLoading="products?.data?.isLoading" @refetchData="refreshData">
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
                    <BaseButtonSmall @click="handleDelete(list.id)" customClasses="bg-[tomato]">
                        <DeleteIcon />
                    </BaseButtonSmall>
                </div>
            </template>
        </BaseTable>
    </DefaultLayout>

    <BaseModal :show="isCreateModalActive" @close="isCreateModalActive = false" modalTitle="create project"
        maxWidthValue="800px">
        <Create @closeModalAfterSubmit="isCreateModalActive = false; fetchData(resourceUrl)" />
    </BaseModal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Create from './_Create.vue'
import { useItemStore } from '@/stores/items';
import { storeToRefs } from 'pinia';

const itemStore = useItemStore()
const { products } = storeToRefs(itemStore)

const pageTitle = ref('Products')
const isCreateModalActive = ref(false)
const isUpdateModalActive = ref(false)
const resourceUrl = ref<string>('items/products')
const product = ref()

const handleDelete = async (id: string) => {
    await useItemStore().deleteProduct(id)
    await fetchData(resourceUrl.value)
}

const handleUpdate = (data: any) => {
    product.value = data
    isUpdateModalActive.value = true
}

const refreshData = async (paginationUrl: string) => {
    const resourceUrlPlain = resourceUrl.value.split('?')[0]
    const newUrl = resourceUrlPlain + paginationUrl
    await fetchData(newUrl)
}

const fetchData = async (url: string) => {
    await useItemStore().getProducts(url)
}

onMounted(async () => {
    await fetchData(resourceUrl.value)
})

const heads = [
    { name: 's/no', value: 'index' },
    { name: 'name', value: 'title' },
    { name: 'category', value: 'category' },
    { name: 'price', value: 'price' },
    { name: 'ratings', value: 'total_ratings' },
    { name: 'product', value: 'product' },
    { name: 'Cover image', value: 'cover_image' },
    { name: 'owner', value: 'owner' },
    { name: 'status', value: 'status' },
    { name: 'actions', value: '' },
]
</script>


<style></style>