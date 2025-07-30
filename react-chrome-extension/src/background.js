// 监听插件安装事件
chrome.runtime.onInstalled.addListener(() => {
  console.log('React Chrome Extension 已安装')
  
  // 设置一个初始存储值
  chrome.storage.sync.set({ color: '#42b983' }, () => {
    console.log('默认颜色已设置')
  })
})

// 监听来自内容脚本的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('收到来自内容脚本的消息:', request)
  
  if (request.type === 'GET_COLOR') {
    chrome.storage.sync.get('color', (data) => {
      sendResponse({ color: data.color })
    })
    return true // 表示会异步发送响应
  }
})
