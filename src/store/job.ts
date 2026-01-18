import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { JobInfo, RegionOption } from '../types/job'

// 模拟数据
const mockJobs: JobInfo[] = [
  {
    id: '1',
    title: '公共卫生医师',
    company: '北京市朝阳区疾控中心',
    location: '北京市朝阳区',
    salary: '15-25K',
    region: '北京',
    publishTime: '2026-01-17',
    isCollected: false,
    jobType: '全职',
    requirements: '本科及以上，公共卫生专业',
    description: '负责辖区内疾病预防控制、健康促进等工作',
    end: false
  },
  {
    id: '2',
    title: '流行病学调查员',
    company: '上海市浦东新区卫健委',
    location: '上海市浦东新区',
    salary: '12-20K',
    region: '上海',
    publishTime: '2026-01-16',
    isCollected: false,
    jobType: '全职',
    requirements: '预防医学或相关专业',
    description: '开展传染病流行病学调查和疫情处置',
    end: false
  },
  {
    id: '3',
    title: '公共卫生管理员',
    company: '广州市天河区医院',
    location: '广州市天河区',
    salary: '10-18K',
    region: '广州',
    publishTime: '2026-01-15',
    isCollected: false,
    jobType: '全职',
    requirements: '公共卫生管理相关专业',
    description: '负责医院公共卫生管理和健康教育工作',
    end: false
  },
  {
    id: '4',
    title: '健康监测专员',
    company: '深圳市南山区疾控中心',
    location: '深圳市南山区',
    salary: '13-22K',
    region: '深圳',
    publishTime: '2026-01-14',
    isCollected: false,
    jobType: '实习',
    requirements: '医学或公共卫生专业背景',
    description: '负责健康监测数据收集分析工作',
    end: false
  },
  {
    id: '5',
    title: '疫苗接种管理员',
    company: '杭州市西湖区社区卫生服务中心',
    location: '杭州市西湖区',
    salary: '9-15K',
    region: '杭州',
    publishTime: '2026-01-13',
    isCollected: false,
    jobType: '全职',
    requirements: '护理或医学相关专业',
    description: '负责疫苗接种管理和健康宣教工作',
    end: false
  },
  {
    id: '6',
    title: '环境卫生监督员',
    company: '北京市海淀区卫健委',
    location: '北京市海淀区',
    salary: '14-24K',
    region: '北京',
    publishTime: '2026-01-12',
    isCollected: false,
    jobType: '全职',
    requirements: '环境卫生或公共卫生专业',
    description: '负责辖区内环境卫生监督和检查工作',
    end: true
  }
]

const regions: RegionOption[] = [
  { id: 'all', name: '全部地区' },
  { id: '北京', name: '北京' },
  { id: '上海', name: '上海' },
  { id: '广州', name: '广州' },
  { id: '深圳', name: '深圳' },
  { id: '杭州', name: '杭州' }
]

export const useJobStore = defineStore('job', () => {
  const jobs = ref<JobInfo[]>([...mockJobs])
  const selectedRegion = ref<string>('all')

  // 未结束的工作（用于最新招聘）
  const activeJobs = computed(() => {
    return jobs.value.filter(job => !job.end)
  })

  // 已结束的工作
  const endedJobs = computed(() => {
    return jobs.value.filter(job => job.end)
  })

  // 最新招聘 - 只显示未结束的
  const latestJobs = computed(() => {
    return [...activeJobs.value].sort((a, b) =>
      new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
    )
  })

  // 招聘库 - 显示所有（包括已结束的）
  const filteredJobs = computed(() => {
    const regionFiltered = selectedRegion.value === 'all' 
      ? jobs.value 
      : jobs.value.filter(job => job.region === selectedRegion.value)
    return regionFiltered
  })

  const regionOptions = computed(() => regions)

  function setSelectedRegion(region: string) {
    selectedRegion.value = region
  }

  function toggleCollect(jobId: string) {
    const job = jobs.value.find(j => j.id === jobId)
    if (job) {
      job.isCollected = !job.isCollected
    }
  }

  function getJobById(id: string): JobInfo | undefined {
    return jobs.value.find(j => j.id === id)
  }

  return {
    jobs,
    activeJobs,
    endedJobs,
    filteredJobs,
    latestJobs,
    regionOptions,
    selectedRegion,
    setSelectedRegion,
    toggleCollect,
    getJobById
  }
})
