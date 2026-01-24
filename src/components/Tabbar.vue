<template>
  <nut-tabbar v-model="active" @tab-switch="tabSwitch" bottom safe-area-inset-bottom placeholder>
    <nut-tabbar-item v-for="item in List" :key="item.name" :name="item.name" :tab-title="item.title" :icon="item.icon">
    </nut-tabbar-item>
  </nut-tabbar>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import { Home, Category, My } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'

const pages = Taro.getCurrentPages()
const page = pages[pages.length-1]

const path = page.route
const parts = path.split("/"); // 使用 "/" 分割字符串
const target = parts[1]; // 获取第三个部分（索引为2）
console.log('target', target)

const active = target
const List = [
  {
    title: 'Home',
    icon: h(Home),
    name: 'home',
    path: '/pages/latest/index'
  },
  {
    title: 'Category',
    icon: h(Category),
    name: 'category',
    path: '/pages/jobs/index'
  },
  {
    title: 'My',
    icon: h(My),
    name: 'my',
    path: '/pages/user/index'
  }
]

const tabSwitch = (item: Record<string, unknown>, name: string) => {
    // 找到List里面name对应的path
    let index = List.findIndex(i => i.name === name)
   let url = List[index].path as string
   console.log('url', url)
   Taro.redirectTo({
     url: url
   })
}
</script>
