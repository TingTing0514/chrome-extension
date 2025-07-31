import { useState } from "react";
function App() {
  // 定义一个函数getCode
  const getCode = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => {
          return document.documentElement.outerHTML;
        },
      },
      (results) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else {
          const html = results[0].result;
          console.log("页面 HTML：", html);
          alert("页面源码已打印到控制台");
        }
      }
    );
  };
  const screenShot = async () => {
    //第一种实现方式
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
    // 第二种实现方式 到background统一调度
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.runtime.sendMessage({ type: "CAPTURE_SCREENSHOT", tabId: tab.id });
  };
  return (
    <div>
      <h1>React Chrome Extension</h1>
      <button onClick={getCode}>点击按钮,当前页面源代码</button>
      <button onClick={screenShot}>当前页面截图</button>
    </div>
  );
}

export default App;
