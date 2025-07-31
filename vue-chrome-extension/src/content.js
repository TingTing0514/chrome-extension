console.log('React Chrome Extension 内容脚本已加载')

// 向背景脚本请求数据
chrome.runtime.sendMessage({ type: 'GET_COLOR' }, (response) => {
  console.log('从背景脚本收到的颜色:', response.color)
  
  // 创建一个示例元素并添加到页面
  const div = document.createElement('div')
  div.style.position = 'fixed'
  div.style.bottom = '20px'
  div.style.right = '20px'
  div.style.padding = '10px'
  div.style.backgroundColor = response.color
  div.style.color = 'white'
  div.style.borderRadius = '4px'
  div.style.zIndex = '9999'
  div.textContent = 'React 插件已运行'
  document.body.appendChild(div)
  
  // 3秒后自动移除
  setTimeout(() => {
    div.remove()
  }, 3000)
})
