<template>
    <view>{{ job.title }}</view>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import type { JobInfo } from '../../types/job'
interface Props {
  job: JobInfo
}

const prop = defineProps<Props>()
onMounted(() => {
  console.log('Jobcard mounted with job:', prop.job);
});

</script>