<template>
  <div class="sidebar">
    <h3>扩展侧边栏</h3>
    <p>这是通过内容脚本注入的侧边栏</p>
    <button @click="sendMsg">发送消息到扩展</button>
  </div>
</template>

<script setup>
const sendMsg = () => {
  // 向扩展扩展背景页或popup发送消息
  chrome.runtime.sendMessage({ type: 'sidebar_msg', data: '来自侧边栏的消息' }, (res) => {
    console.log('收到回复：', res);
  });
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: white;
  border-right: 1px solid #eee;
  padding: 1rem;
  z-index: 9999; /* 确保在页面内容上方 */
}
button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>