<script setup lang="ts">
import { onMounted } from 'vue'
import DataStatsOne from '@/components/DataStats/DataStatsOne.vue'
import ChartOne from '@/components/Charts/ChartOne.vue'
import ChartTwo from '@/components/Charts/ChartTwo.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useDashboardStore } from '@/stores/dashboard'
import { storeToRefs } from 'pinia'

const dashboardStore = useDashboardStore()
const { dashboard } = storeToRefs(dashboardStore)

onMounted(async () => {
  await dashboardStore.getDashboardData()
})
</script>

<template>
  <DefaultLayout v-if="!dashboard?.isLoading" >
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <DataStatsOne :summary="dashboard?.summary" />
    </div>

    <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <!-- ====== Chart One Start -->
      <ChartOne :projectsDistribution="dashboard?.yearly_projects_distribution"  />
      <!-- ====== Chart One End -->

      <!-- ====== Chart Two Start -->
      <ChartTwo :recentProjects="dashboard?.recent_projects_progress" />

    </div>
  </DefaultLayout>
</template>
