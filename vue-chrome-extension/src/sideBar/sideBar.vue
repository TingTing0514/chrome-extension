<template>
  <div class="sidebar">
    <h3>扩展侧边栏</h3>
    <p>这是通过内容脚本注入的侧边栏</p>
    <button @click="sendMsg">发送消息到扩展</button>
    <button @click="getCode">点击按钮,当前页面源代码</button>
    <button @click="screenShot">当前页面截图</button>
  </div>
</template>

<script setup>
const sendMsg = () => {
  // 向扩展扩展背景页或popup发送消息
  chrome.runtime.sendMessage({ type: 'sidebar_msg', data: '来自侧边栏的消息' }, (res) => {
    console.log('收到回复：', res);
  });
};
const getCode = async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      // 获取当前页面的源代码
      return document.documentElement.outerHTML;
    },
  }, (result) => {
    console.log('当前页面的源代码：', result[0]);
    alert('页面源码已打印到控制台')
  })
}
const screenShot = async () => {
  // 第一种写法
    // chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
    //   if (chrome.runtime.lastError) {
    //     console.error(chrome.runtime.lastError.message);
    //   } else {
    //     chrome.downloads.download({
    //       url: dataUrl,
    //       filename: "screenshot.png"
    //     });
    //     alert("截图已保存！");
    //   }
    // });
    // 第二种写法
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    })
    chrome.runtime.sendMessage({ type: "CAPTURE_SCREENSHOT", tabId: tab.id });
  }

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
  z-index: 9999;
  /* 确保在页面内容上方 */
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
