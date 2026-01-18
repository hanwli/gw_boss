import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const avatarUrl = ref<string>('https://via.placeholder.com/200x200?text=Avatar')
  const nickname = ref<string>('公卫求职者')
  const collectedJobIds = ref<Set<string>>(new Set())

  const collectedCount = computed(() => collectedJobIds.value.size)

  function toggleCollect(jobId: string) {
    if (collectedJobIds.value.has(jobId)) {
      collectedJobIds.value.delete(jobId)
    } else {
      collectedJobIds.value.add(jobId)
    }
  }

  function isCollected(jobId: string): boolean {
    return collectedJobIds.value.has(jobId)
  }

  function setAvatar(url: string) {
    avatarUrl.value = url
  }

  function setNickname(name: string) {
    nickname.value = name
  }

  return {
    avatarUrl,
    nickname,
    collectedJobIds,
    collectedCount,
    toggleCollect,
    isCollected,
    setAvatar,
    setNickname
  }
})
