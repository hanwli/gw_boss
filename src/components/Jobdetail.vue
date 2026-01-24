<!-- src/components/JobDetails.vue -->
<template>
  <view class="job-details" v-if="job">
    <!-- 标题区 -->
     <nut-cell size="large" style="padding-top: 20rpx;">
        <template #title>
            <span style="color: red;">{{ job.title }}</span>
        </template>
        <template #desc>
            <span style="color: red;">{{ job.salary }}</span>
        </template>
     </nut-cell>
    <!-- <view class="header">
        
      <view class="title">{{ job.title }}</view>
      <view class="salary">{{ job.salary }}</view>
    </view> -->

    <!-- 基本信息 -->
    <view class="basic-info">
      <nut-row :gutter="10">
        <nut-col :span="12">
            <nut-divider>公司</nut-divider>
            <view style="text-align: center;">{{ job.company }}</view>
        </nut-col>
        <nut-col :span="12">
            <nut-divider>地点</nut-divider>
            <view style="text-align: center;">{{ `${job.province} ${job.city} ${job.district}` }}</view>
        </nut-col>
      </nut-row>
        <nut-row :gutter="10">
            <nut-col :span="12">
                <nut-divider>职位类型</nut-divider>
                <view style="text-align: center;">{{ job.jobType }}</view>
            </nut-col>
            <nut-col :span="12">
                <nut-divider>发布时间</nut-divider>
                <view style="text-align: center;">{{ job.publishTime }}</view>
            </nut-col>
        </nut-row>
      <!-- <nut-cell title="公司" :desc="job.company" /> -->
      <!-- <nut-cell title="工作地点" :desc="`${job.province} ${job.city} ${job.district}`" /> -->
      <!-- <nut-cell title="职位类型" :desc="job.jobType" /> -->
      <!-- <nut-cell title="发布时间" :desc="job.publishTime" /> -->
    </view>

    <!-- 要求 -->
     <nut-col :span="24">
        <nut-divider>任职要求</nut-divider>
        <view class="content">{{ job.requirements || '暂无详细要求' }}</view>
     </nut-col>
    <!-- <view class="section">
      <view class="section-title">任职要求</view>
      <view class="content">{{ job.requirements || '暂无详细要求' }}</view>
    </view> -->

    <!-- 描述 -->
     <nut-col :span="24">
        <nut-divider>职位描述</nut-divider>
        <view class="content">{{ job.description || '暂无职位描述' }}</view>
    </nut-col>
    <!-- <view class="section">
      <view class="section-title">职位描述</view>
      <view class="content">{{ job.description || '暂无职位描述' }}</view>
    </view> -->

    <!-- 底部操作按钮 -->
    <view class="footer-actions">
      <nut-button 
        type="primary" 
        block 
        @click="toggleCollect"
      >
        {{ job.isCollected ? '取消收藏' : '立即收藏' }}
      </nut-button>
      <nut-button 
        type="default" 
        block 
        style="margin-top: 12rpx;"
        @click="$emit('close')"
      >
        关闭
      </nut-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { JobInfo } from '@/types/job'  // 假设接口在这里

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

<style scoped>
.job-details {
  padding: 32rpx 28rpx 100rpx;  /* 底部留空间给按钮 */
  background: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  flex: 1;
  margin-right: 24rpx;
}

.salary {
  font-size: 36rpx;
  font-weight: bold;
  color: #fa2c19;
  white-space: nowrap;
}

.basic-info {
  margin-bottom: 40rpx;
}

.section {
  margin-bottom: 48rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #222;
  margin-bottom: 20rpx;
}

.content {
  font-size: 28rpx;
  line-height: 48rpx;
  color: #555;
  white-space: pre-wrap;
}

.footer-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24rpx 28rpx;
  background: #fff;
  border-top: 1rpx solid #eee;
  box-sizing: border-box;
}
</style>