<template>
    <nut-cell title="请选择城市" :desc="String(positionStr)" @click="positionPick = true"></nut-cell>
    <nut-popup v-model:visible="positionPick" position="bottom">
      <nut-picker v-model="value" :columns="columns" title="城市选择" @confirm="confirm" />
    </nut-popup>
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
const jobStore = useJobStore()
const scrollHeight = ref('100vh')
var activeJob = jobStore.activeJobs
const value = ref(['all'])
const regionIdx = ref(0)
const positionPick = ref(false)
var positionStr = "请选择城市"

onMounted(() => {
  // const systemInfo = Taro.getSystemInfoSync()
  const systemInfo = Taro.getWindowInfo()
  scrollHeight.value = `${systemInfo.windowHeight}px`
})

const columns = ref([
  {
    text: '全部',
    value: 'all',
    children: []
  },
  {
    text: '江苏',
    value: 'Jiangsu',
    children: [
      {
        "text": "全部",
        "value": "all",
        "children": []
      },
      {
        text: '南京',
        value: 'Nanjing',
        children: [
          { text: '全部', value: 'all' },
          { text: '栖霞区', value: 'Qixia' },
          { text: '鼓楼区', value: 'Gulou' }
        ]
      },
      {
        text: '苏州',
        value: 'Suzhou',
        children: [
          { text: '全部', value: 'all' },
          { text: '姑苏区', value: 'Gusu' },
          { text: '吴江区', value: 'Wujiang' }
        ]
      }
    ]
  },
  {
    text: '浙江',
    value: 'Zhejiang',
    children: [
      {
        text: '全部',
        value: 'all',
        children: []
      },
      {
        text: '杭州',
        value: 'Hangzhou',
        children: [
          { text: '全部', value: 'all' },
          { text: '西湖区', value: 'Xihu' },
          { text: '滨江区', value: 'Binjiang' }
        ]
      },
      {
        text: '宁波',
        value: 'Ningbo',
        children: [
          { text: '全部', value: 'all' },
          { text: '海曙区', value: 'Haishu' },
          { text: '江北区', value: 'Jiangbei' }
        ]
      }
    ]
  },
  {
    text: '北京',
    value: 'Beijing',
    children: [
      {
        text: '北京',
        value: 'Beijing',
        children: [
          { text: '全部', value: 'all' },
          { text: '朝阳区', value: 'Chaoyang' },
          { text: '海淀区', value: 'Haidian' }
        ]
      },
    ]
  },
  {
    text: '上海',
    value: 'Shanghai',
    children: [
      {
        text: '上海',
        value: 'shanghai',
        children: [
          { text: '全部', value: 'all' },
          { text: '浦东新区', value: 'Pudong' },
          { text: '徐汇区', value: 'Xuhui' }
        ]
      }
    ]
  },
  {
    text: '广东',
    value: 'Guangdong',
    children: [
      {
        text: '全部',
        value: 'all',
        children: []
      },
      {
        text: '广州',
        value: 'Guangzhou',
        children: [
          { text: '全部', value: 'all' },
          { text: '天河区', value: 'Tianhe' },
          { text: '越秀区', value: 'Yuexiu' }
        ]
      },
      {
        text: '深圳',
        value: 'Shenzhen',
        children: [
          { text: '全部', value: 'all' },
          { text: '南山区', value: 'Nanshan' },
          { text: '福田区', value: 'Futian' }
        ]
      }
    ]
  }
])

const refreshActiveJobs = (positionStr) => {
  // jobStore.filterJobsByRegion(positionStr)
  console.log('过滤职位列表，当前选择城市：', positionStr)
  jobStore.setSelectedRegion(positionStr)
  activeJob = jobStore.filteredActiveJobs()
}
const confirm = ({ selectedValue, selectedOptions }) => {
  console.log('selectedValue', selectedValue)
  console.log('selectedOptions', selectedOptions)
  let regionList = []
  for (let i = 0; i < selectedOptions.length; i++) {
    if (selectedOptions[i] != undefined) {
      regionList.push(selectedOptions[i].text)
    }
  }
  positionStr = regionList.join(' / ')
  refreshActiveJobs(positionStr)
  positionPick.value = false
}
</script>