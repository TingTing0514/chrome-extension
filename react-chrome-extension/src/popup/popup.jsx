import React from "react";
import './popup.css'

import { useState, useEffect } from 'react';

function App() {
  const [pageTitle, setPageTitle] = useState('');

  // 获取当前页面标题
  useEffect(() => {
    const getPageTitle = async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      setPageTitle(tab.title);
    };
    
    getPageTitle();
  }, []);

  // 向内容脚本发送消息
  const sendMessageToContent = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // 这段代码会在页面上下文执行
        alert('来自插件的消息：Hello, 网页！');
      }
    });
  };

  return (
    <div className="popup-container">
      <h1>React Chrome Extension</h1>
      <p>这是一个使用 React 构建的 Chrome 插件</p>
      <button onClick={sendMessageToContent}>与页面交互</button>
      {pageTitle && <p>当前页面标题: {pageTitle}</p>}
    </div>
  );
}

export default App;
    