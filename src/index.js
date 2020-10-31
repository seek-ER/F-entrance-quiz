import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import './style/reboot.scss';

// TODO GTB-工程实践: * 有小步提交，提交信息符合语义
// TODO GTB-知识点: * 组件划分层次不够，导致组件的业务逻辑过于复杂
// TODO GTB-完成度: * 基本功能都完成，分组列表有bug，刷新页面后不能显示分组结果
ReactDOM.render(<App />, document.getElementById('root'));
