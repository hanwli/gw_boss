import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Button,Popup,Tabbar, TabbarItem } from "@nutui/nutui-taro";
import { List } from '@nutui/nutui-taro'
import './app.scss'

const App = createApp({
  onShow(options) {
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
App.use(createPinia())
App.use(Button)
App.use(Popup)
App.use(Tabbar)
App.use(TabbarItem)
App.use(List)
export default App
