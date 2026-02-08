<template>
    <Positionpick
      @click="onPosClick"
    />
    <scroll-view 
      class="scroll-container"
      :scroll-y="true"
      :style="{ height: scrollHeight }"
    >
      <Jobcard
        v-for="job in activeJob"
        :key="job.id"
        :job="job"
        @click="jobClick"
      />
    </scroll-view>
    <nut-popup
    v-model:visible="showDetail"
    safe-area-inset-bottom
    position="bottom"
    :style="{ height: '85%' }"
    @close="showDetail = false"
  >
    <Jobdetail 
      :job="selectedJob" 
      @close="showDetail = false"
    />
  </nut-popup>
    <Tabbar />
</template>
<script lang="ts" setup>
import {ref, onMounted, computed} from "vue";
import { useJobStore } from '@/stores/job'
import Taro from "@tarojs/taro";
import Tabbar from "@/components/Tabbar.vue";
import Jobcard from "@/components/Jobcard.vue";
import Positionpick from "@/components/Positionpick.vue";
import Jobdetail from "@/components/Jobdetail.vue";
import type { JobInfo } from '@/types/job'  // 你的接口文件
const jobStore = useJobStore()
const scrollHeight = ref('100vh')
const activeJob = computed(() => jobStore.filteredActiveJobs)
const showDetail = ref(false)
const selectedJob = ref<JobInfo | null>(null)

onMounted(() => {
  const systemInfo = Taro.getWindowInfo()
  scrollHeight.value = `${systemInfo.windowHeight}px`
})

const refreshActiveJobs = (positionStr) => {
  jobStore.setSelectedRegion(positionStr)
}

const onPosClick = (positionStr: string) => {
  refreshActiveJobs(positionStr)
}

const jobClick = (job) => {
  selectedJob.value = job
  console.log('selectedJob:', selectedJob)
  showDetail.value = true
  console.log('打开详情：', job.title)
}
</script>