<template>
  <div class="popup-container">
    <h1>Vue Chrome Extension</h1>
    <p>这是一个使用 Vue 和 Vite 构建的 Chrome 插件 aaa</p>
    <button @click="sendMessageToContent">与页面交互</button>
    <p v-if="pageTitle">当前页面标题: {{ pageTitle }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const pageTitle = ref('')

// 获取当前页面标题
onMounted(async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  pageTitle.value = tab.title
})

// 向内容脚本发送消息
const sendMessageToContent = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      // 这段代码会在页面上下文执行
      alert('来自插件的消息：Hello, 网页！')
    }
  })
}
</script>

<style scoped>
.popup-container {
  width: 300px;
  padding: 15px;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 18px;
  margin-bottom: 10px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px 0;
}

button:hover {
  background-color: #359e75;
}
</style>
