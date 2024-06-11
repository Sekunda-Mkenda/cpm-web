<template>
    <DefaultLayout>
        <div class="mx-auto max-w-7xl">
            <!-- Breadcrumb Start -->
            <BreadcrumbDefault :pageTitle="pageTitle" :breadCumbItems="breadCumbItems" />
            <div class="flex justify-end mb-5">
                <BaseButton @click="isCreateModalActive = true">
                    <div class="flex items-center">
                        <CircleAddIcon size="18" /> <span class="ms-1">Create</span>
                    </div>
                </BaseButton>
            </div>
            <!-- Breadcrumb End -->
            <!-- <ChatCard />\ -->
            <div>
                <TableThree :heads="heads" :lists="packages" :isLoading="true" />
            </div>
        </div>



    </DefaultLayout>

    <BaseModal :show="isCreateModalActive" @close="isCreateModalActive = false" modalTitle="create service"
        maxWidthValue="800px">
        <Create />
    </BaseModal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import CircleAddIcon from 'vue-material-design-icons/PlusCircle.vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TableThree from '@/components/Tables/BaseTable.vue';
import Create from './_Create.vue'

const formRef = ref<FormInstance>()
const pageTitle = ref('Services')
const isCreateModalActive = ref(false)
// const breadCumbItems = [{ label: 'Products', path: '/products' }]

const form = reactive({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    region: '',
    district: '',
    ward_or_street: '',
    budget: null,
    is_priority: false,
    progress_percentage: '',
    images: []
});

// const rules = reactive<FormRules<RuleForm>>(// )

const packages = ref([
    { name: 'Free Package', price: '$0.00', invoiceDate: 'Jan 13, 2025', status: 'Paid' },
    { name: 'Standard Package', price: '$59.00', invoiceDate: 'Jan 13, 2025', status: 'Paid' },
    { name: 'Business Package', price: '$99.00', invoiceDate: 'Jan 13, 2025', status: 'Unpaid' },
    { name: 'Standard Package', price: '$59.00', invoiceDate: 'Jan 13, 2025', status: 'Pending' }
])

const heads = [
    { name: 'name', value: 'name' },
    { name: 'price', value: 'price' },
    { name: 'invoiceDate', value: 'invoiceDate' },
    { name: 'status', value: 'status' },
]
</script>


<style></style>