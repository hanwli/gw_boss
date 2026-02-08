<template>
  <view :class="styles['job-details']" v-if="job">
    <!-- 标题区 -->
    <view :class="styles.header">
      <view :class="styles.title">{{ job.title }}</view>
      <view :class="styles.salary">{{ job.salary }}</view>
    </view>

    <!-- 基本信息 -->
    <view :class="styles['basic-info']">
      <nut-row :gutter="16">
        <nut-col :span="12">
          <view :class="styles['info-item']">
            <IconFont name="shop" size="14" :class="styles['info-icon']"></IconFont>
            <text :class="styles['info-label']">{{ job.company }}</text>
          </view>
        </nut-col>
        <nut-col :span="12">
          <view :class="styles['info-item']">
            <IconFont name="location" size="14" :class="styles['info-icon']"></IconFont>
            <text :class="styles['info-label']">{{ `${job.province} ${job.city} ${job.district}` }}</text>
          </view>
        </nut-col>
      </nut-row>
      <nut-row :gutter="16" style="margin-top: 16rpx;">
        <nut-col :span="12">
          <view :class="styles['info-item']">
            <IconFont name="category" size="14" :class="styles['info-icon']"></IconFont>
            <text :class="styles['info-label']">{{ job.jobType }}</text>
          </view>
        </nut-col>
        <nut-col :span="12">
          <view :class="styles['info-item']">
            <IconFont name="clock" size="14" :class="styles['info-icon']"></IconFont>
            <text :class="styles['info-label']">{{ job.publishTime }}</text>
          </view>
        </nut-col>
      </nut-row>
    </view>

    <!-- 任职要求 -->
    <view :class="styles.section">
      <view :class="styles['section-title']">
        <IconFont name="check-normal" size="16" :class="styles['section-icon']"></IconFont>
        任职要求
      </view>
      <scroll-view scroll-y :class="styles['content-scroll']">
        <view :class="styles.content">{{ job.requirements || '暂无详细要求' }}</view>
      </scroll-view>
    </view>

    <!-- 职位描述 -->
    <view :class="styles.section">
      <view :class="styles['section-title']">
        <IconFont name="edit" size="16" :class="styles['section-icon']"></IconFont>
        职位描述
      </view>
      <scroll-view scroll-y :class="styles['content-scroll']">
        <view :class="styles.content">{{ job.description || '暂无职位描述' }}</view>
      </scroll-view>
    </view>

    <!-- 底部操作按钮 -->
    <view :class="styles['footer-actions']">
      <nut-button
        type="primary"
        :custom-style="{ height: '88rpx', fontSize: '32rpx' }"
        block
        @click="toggleCollect"
      >
        <IconFont :name="job.isCollected ? 'star-fill-n' : 'star-n'" size="18" :class="styles['btn-icon']"></IconFont>
        {{ job.isCollected ? '取消收藏' : '立即收藏' }}
      </nut-button>
      <nut-button
        type="default"
        :custom-style="{ height: '88rpx', fontSize: '32rpx', marginTop: '16rpx' }"
        block
        @click="$emit('close')"
      >
        关闭
      </nut-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { JobInfo } from '@/types/job'  // 假设接口在这里
import { IconFont } from '@nutui/icons-vue';
import styles from './JobDetails.module.scss'

const props = defineProps<{
  job: JobInfo
}>()

const emit = defineEmits<{
  close: () => void
  // 如果需要外部处理收藏，可以再加 collect 事件
}>()

const toggleCollect = () => {
  // 这里可以 emit 事件给父级更新 store，或直接修改（但建议 store 统一管理）
  console.log('切换收藏状态：', props.job.id)
  // 示例：props.job.isCollected = !props.job.isCollected  // 但不推荐直接改 prop
}
</script>