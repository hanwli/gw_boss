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
      />
    </scroll-view>
    <Tabbar />
</template>
<script lang="ts" setup>
import {ref, onMounted, computed} from "vue";
import { useJobStore } from '@/stores/job'
import Taro from "@tarojs/taro";
import Tabbar from "@/components/Tabbar.vue";
import Jobcard from "@/components/Jobcard.vue";
import Positionpick from "@/components/Positionpick.vue";
const jobStore = useJobStore()
const scrollHeight = ref('100vh')
const activeJob = computed(() => jobStore.filteredActiveJobs)

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
</script>