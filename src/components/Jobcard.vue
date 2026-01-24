<!-- src/components/JobCard.vue -->
<template>
  <nut-cell class="job-card" @click="handleClick">
    <!-- 头部：标题 + 薪资（用 prolist 插槽自定义并排布局） -->
    <template #prolist>
      <view class="job-header">
        <view class="title">{{ job.title }}</view>
        <view class="salary">{{ job.salary }}</view>
      </view>
    </template>

    <!-- 主体内容：公司 + 地点 + 其他信息 -->
    <view class="job-body">
      <view class="company-location">
        <text class="company">{{ job.company }}</text>
        <text class="location"> · {{ job.location }}</text>
      </view>

      <view class="tags-time">
        <!-- 用 nut-tag 展示职位类型 -->
        <nut-tag type="primary" plain round size="small">{{ job.jobType }}</nut-tag>
        <text class="publish-time">{{ job.publishTime }}</text>
      </view>

      <!-- 可选：如果有 region 或其他标签 -->
      <view v-if="job.region" class="region">
        <nut-tag type="warning" plain round size="mini">{{ job.region }}</nut-tag>
      </view>
    </view>

    <!-- 底部：可选操作，如收藏（这里简化成图标） -->
    <template #footer>
      <view class="job-footer">
        <IconFont name="s-follow" />
      </view>
    </template>
  </nut-cell>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import type { JobInfo } from '@/types/job'  // 你的接口文件

const props = defineProps<{
  job: JobInfo
}>()

const emits = defineEmits<{
  (e: 'click', job: JobInfo): void
}>()


const handleClick = () => {
  emits('click', props.job )
}
</script>

<style scoped>
.job-card {
  margin-bottom: 32rpx;          /* 改 rpx */
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  background: #fff;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx 32rpx 16rpx;
}
.title {
  font-size: 34rpx;              /* ≈17px 在 375 宽度下 */
  font-weight: bold;
  color: #333;
  flex: 1;
  margin-right: 24rpx;
}
.salary {
  font-size: 32rpx;
  font-weight: bold;
  color: #fa2c19;
  white-space: nowrap;
}

.job-body {
  padding: 0 32rpx 24rpx;
}
.company-location {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 16rpx;
}
.tags-time {
  display: flex;
  align-items: center;
  gap: 24rpx;
  font-size: 26rpx;
  color: #999;
}
.publish-time {
  margin-left: auto;
}

/* 窄屏微调（可选，如果业务需要） */
@media (max-width: 320px) {      /* 极窄屏，如老设备 */
  .title { font-size: 30rpx; }
  .salary { font-size: 28rpx; }
  .job-header { padding: 24rpx 24rpx 12rpx; }
}
</style>