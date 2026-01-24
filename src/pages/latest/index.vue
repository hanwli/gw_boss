<template>
    <scroll-view 
      class="scroll-container"
      :scroll-y="true"
      :style="{ height: scrollHeight }"
    >
      <Jobcard
        v-for="job in activeJob"
        :key="job.id"
        :job="job"
      />
    </scroll-view>
    <Tabbar />
</template>
<script lang="ts" setup>
import {ref, onMounted} from "vue";
import { useJobStore } from '@/stores/job'
import Taro from "@tarojs/taro";
import Tabbar from "@/components/Tabbar.vue";
import Jobcard from "@/components/Jobcard.vue";
const jobStore = useJobStore()
const scrollHeight = ref('100vh')
const activeJob = jobStore.activeJobs

onMounted(() => {
  // const systemInfo = Taro.getSystemInfoSync()
  const systemInfo = Taro.getWindowInfo()
  scrollHeight.value = `${systemInfo.windowHeight}px`
})
</script>