// 监听插件安装事件
chrome.runtime.onInstalled.addListener(() => {
  console.log("React Chrome Extension 已安装");

  // 设置一个初始存储值
  chrome.storage.sync.set({ color: "#078df9ff" }, () => {
    console.log("默认颜色已设置");
  });
  chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel
      .setOptions({
        path: "src/sidebar/sidebar.html",
        enabled: true,
      })
      .catch(console.error);
  });

  // 点击事件只调用 open
  chrome.action.onClicked.addListener((tab) => {
    chrome.sidePanel.open({ tabId: tab.id }).catch(console.error);
  });
});
// 监听来自内容脚本的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("收到来自内容脚本的消息:", request);

  if (request.type === "GET_COLOR") {
    chrome.storage.sync.get("color", (data) => {
      sendResponse({ color: data.color });
    });
    return true; // 表示会异步发送响应
  }
  if (request.type === "CAPTURE_SCREENSHOT") {
    console.log("收到来自内容脚本的消息:", request);
    const tabId = request.tabId;
    chrome.tabs.captureVisibleTab(null, { format: "png" }, function (dataUrl) {
      if (chrome.runtime.lastError) {
        console.log("截图失败", chrome.runtime.lastError);
      } else {
        console.log("截图成功,转发给 content script");
        chrome.downloads.download(
          {
            url: dataUrl,
            filename: "screenshot.png",
            saveAs: false, // true 会弹出“另存为”对话框，false 直接下载
          },
          (downloadId) => {
            if (chrome.runtime.lastError) {
              console.error("下载失败：", chrome.runtime.lastError.message);
            } else {
              console.log("下载成功，ID:", downloadId);
            }
          }
        );
      }
    });
  }
});
