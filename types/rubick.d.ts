interface RubickHooks {
  onPluginEnter?: (cb: Function) => void;
  onPluginReady?: (cb: Function) => void;
  onPluginOut?: (cb: Function) => void;
  onSubInputChange?: (text: string) => void;
  onScreenCapture?: (data: { data: any }) => void;
}

interface RubickDB {
  put: (data: any) => any;
  get: (id: string) => any;
  remove: (doc: any) => any;
  bulkDocs: (docs: any[]) => any;
  allDocs: (key: string) => any;
  postAttachment: (docId: string, attachment: any, type: string) => any;
  getAttachment: (docId: string) => any;
  getAttachmentType: (docId: string) => any;
}

interface RubickDBStorage {
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => any;
  removeItem: (key: string) => void;
}

interface Rubick {
  hooks: RubickHooks;
  __event__: Record<string, any>;

  // 事件相关
  onPluginEnter: (cb: Function) => void;
  onPluginReady: (cb: Function) => void;
  onPluginOut: (cb: Function) => void;
  openPlugin: (plugin: any) => void;

  // 窗口交互
  hideMainWindow: () => void;
  showMainWindow: () => void;
  showOpenDialog: (options: any) => any;
  showSaveDialog: (options: any) => any;
  setExpendHeight: (height: number) => void;
  setSubInput: (
    onChange: Function,
    placeholder?: string,
    isFocus?: boolean
  ) => void;
  removeSubInput: () => void;
  setSubInputValue: (text: string) => void;
  subInputBlur: () => void;
  getPath: (name: string) => string;
  showNotification: (body: string, clickFeatureCode?: string) => void;
  copyImage: (img: string) => boolean;
  copyText: (text: string) => boolean;
  copyFile: (file: string) => boolean;

  // 数据库相关
  db: RubickDB;
  dbStorage: RubickDBStorage;

  // 系统相关
  isDarkColors: () => boolean;
  getFeatures: () => any[];
  setFeature: (feature: any) => void;
  screenCapture: (cb: Function) => void;
  removeFeature: (code: string) => void;
  shellOpenExternal: (url: string) => void;
  isMacOs: () => boolean;
  isWindows: () => boolean;
  isLinux: () => boolean;
  shellOpenPath: (path: string) => void;
  getLocalId: () => string;
  removePlugin: () => void;
  shellShowItemInFolder: (path: string) => void;
  redirect: (label: string, payload: any) => void;
  shellBeep: () => void;
  getFileIcon: (path: string) => any;
  getCopyedFiles: () => any[];
  simulateKeyboardTap: (key: string, ...modifier: string[]) => void;
  getCursorScreenPoint: () => { x: number; y: number };
  getDisplayNearestPoint: (point: { x: number; y: number }) => any;
  outPlugin: () => void;
  createBrowserWindow: (url: string, options: any, callback?: Function) => any;
}

declare global {
  interface Window {
    require: (module: string) => any;
    rubick: Rubick;
  }
}

export {};

// ----------------- rubick api source code -----------------
// https://github.com/rubickCenter/rubick/blob/master/public/preload.js#L26
// const { ipcRenderer, shell } = require('electron');
// const { BrowserWindow, nativeTheme, screen, app } = require('@electron/remote');
// const os = require('os');
// const path = require('path');

// const appPath = app.getPath('userData');

// const baseDir = path.join(appPath, './rubick-plugins-new');

// const ipcSendSync = (type, data) => {
//   const returnValue = ipcRenderer.sendSync('msg-trigger', {
//     type,
//     data,
//   });
//   if (returnValue instanceof Error) throw returnValue;
//   return returnValue;
// };

// const ipcSend = (type, data) => {
//   ipcRenderer.send('msg-trigger', {
//     type,
//     data,
//   });
// };

// window.rubick = {
//   hooks: {},
//   __event__: {},
//   // 事件
//   onPluginEnter(cb) {
//     typeof cb === 'function' && (window.rubick.hooks.onPluginEnter = cb);
//   },
//   onPluginReady(cb) {
//     typeof cb === 'function' && (window.rubick.hooks.onPluginReady = cb);
//   },
//   onPluginOut(cb) {
//     typeof cb === 'function' && (window.rubick.hooks.onPluginOut = cb);
//   },
//   openPlugin(plugin) {
//     ipcSendSync('loadPlugin', plugin);
//   },
//   // 窗口交互
//   hideMainWindow() {
//     ipcSendSync('hideMainWindow');
//   },
//   showMainWindow() {
//     ipcSendSync('showMainWindow');
//   },
//   showOpenDialog(options) {
//     return ipcSendSync('showOpenDialog', options);
//   },
//   showSaveDialog(options) {
//     return ipcSendSync('showSaveDialog', options);
//   },

//   setExpendHeight(height) {
//     ipcSendSync('setExpendHeight', height);
//   },
//   setSubInput(onChange, placeholder = '', isFocus) {
//   },
//   removeSubInput() {
//     delete window.rubick.hooks.onSubInputChange;
//     ipcSendSync('removeSubInput');
//   },
//   setSubInputValue(text) {
//     ipcSendSync('setSubInputValue', { text });
//   },
//   subInputBlur() {
//     ipcSendSync('subInputBlur');
//   },
//   getPath(name) {
//     return ipcSendSync('getPath', { name });
//   },
//   showNotification(body, clickFeatureCode) {
//     ipcSend('showNotification', { body, clickFeatureCode });
//   },
//   copyImage(img) {
//     return ipcSendSync('copyImage', { img });
//   },
//   copyText(text) {
//     return ipcSendSync('copyText', { text });
//   },
//   copyFile: (file) => {
//     return ipcSendSync('copyFile', { file });
//   },
//   db: {
//     put: (data) => ipcSendSync('dbPut', { data }),
//     get: (id) => ipcSendSync('dbGet', { id }),
//     remove: (doc) => ipcSendSync('dbRemove', { doc }),
//     bulkDocs: (docs) => ipcSendSync('dbBulkDocs', { docs }),
//     allDocs: (key) => ipcSendSync('dbAllDocs', { key }),
//     postAttachment: (docId, attachment, type) =>
//       ipcSendSync('dbPostAttachment', { docId, attachment, type }),
//     getAttachment: (docId) => ipcSendSync('dbGetAttachment', { docId }),
//     getAttachmentType: (docId) => ipcSendSync('dbGetAttachmentType', { docId }),
//   },
//   dbStorage: {
//     setItem: (key, value) => {
//     },
//     getItem: (key) => {
//       const res = ipcSendSync('dbGet', { id: key });
//       return res && 'value' in res ? res.value : null;
//     },
//     removeItem: (key) => {
//       const res = ipcSendSync('dbGet', { id: key });
//       res && ipcSendSync('dbRemove', { doc: res });
//     },
//   },
//   isDarkColors() {
//     return false;
//   },
//   getFeatures() {
//     return ipcSendSync('getFeatures');
//   },
//   setFeature(feature) {
//     return ipcSendSync('setFeature', { feature });
//   },
//   screenCapture(cb) {
//     typeof cb === 'function' &&
//       (window.rubick.hooks.onScreenCapture = ({ data }) => {
//         cb(data);
//       });
//     ipcSendSync('screenCapture');
//   },
//   removeFeature(code) {
//     return ipcSendSync('removeFeature', { code });
//   },

//   // 系统
//   shellOpenExternal(url) {
//     shell.openExternal(url);
//   },

//   isMacOs() {
//     return os.type() === 'Darwin';
//   },

//   isWindows() {
//     return os.type() === 'Windows_NT';
//   },

//   isLinux() {
//     return os.type() === 'Linux';
//   },

//   shellOpenPath(path) {
//     shell.openPath(path);
//   },

//   getLocalId: () => ipcSendSync('getLocalId'),

//   removePlugin() {
//     ipcSend('removePlugin');
//   },

//   shellShowItemInFolder: (path) => {
//     ipcSend('shellShowItemInFolder', { path });
//   },

//   redirect: (label, payload) => {
//     // todo
//   },

//   shellBeep: () => {
//     ipcSend('shellBeep');
//   },

//   getFileIcon: (path) => {
//     return ipcSendSync('getFileIcon', { path });
//   },

//   getCopyedFiles: () => {
//     return ipcSendSync('getCopyFiles');
//   },

//   simulateKeyboardTap: (key, ...modifier) => {
//     ipcSend('simulateKeyboardTap', { key, modifier });
//   },

//   getCursorScreenPoint: () => {
//     return screen.getCursorScreenPoint();
//   },

//   getDisplayNearestPoint: (point) => {
//     return screen.getDisplayNearestPoint(point);
//   },

//   outPlugin: () => {
//     return ipcSend('removePlugin');
//   },

//   createBrowserWindow: (url, options, callback) => {
//     const winUrl = path.resolve(baseDir, 'node_modules', options.name);
//     const winIndex = `file://${path.join(winUrl, './', url || '')}`;
//     const preloadPath = path.join(
//       winUrl,
//       './',
//       options.webPreferences.preload || ''
//     );
//     let win = new BrowserWindow({
//       useContentSize: true,
//       resizable: true,
//       title: '拉比克',
//       show: false,
//       backgroundColor: nativeTheme.shouldUseDarkColors ? '#1c1c28' : '#fff',
//       ...options,
//       webPreferences: {
//         webSecurity: false,
//         backgroundThrottling: false,
//         contextIsolation: false,
//         webviewTag: true,
//         nodeIntegration: true,
//         spellcheck: false,
//         partition: null,
//         ...(options.webPreferences || {}),
//         preload: preloadPath,
//       },
//     });
//     win.loadURL(winIndex);

//     win.on('closed', () => {
//       win = undefined;
//     });
//     win.once('ready-to-show', () => {
//       win.show();
//     });
//     win.webContents.on('dom-ready', () => {
//       callback && callback();
//     });
//     return win;
//   },
// };
// ----------------- rubick api source code -----------------
