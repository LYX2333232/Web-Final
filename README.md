# 项目名称： 商城系统的前端

## 开发人员
姓名：李永雄
学号：20213044065

## 项目运行

- 准备：`npm install`
- 前端运行：`npm run dev`
- 打包：`npm run build`
- 格式化：`npm run format`

## 项目介绍

- 项目采用前后端分离的模式，前端采用vue3+vite+pinia+vue-router+axios+element-plus

## 项目结构

```
├── public
├── src
|   ├── api        # 接口请求
|   |   ├── buyer       # 买家接口
|   |   |   ├── cartPage        # 购物车页面接口
|   |   |   ├── infoPage        # 个人信息页面接口
|   |   |   ├── mainPage        # 主页接口
|   |   |   ├── orderPage       # 订单页面接口
|   |   |   ├── pasword         # 密码修改接口
|   |   ├── seller      # 卖家接口
|   |   |   ├── browsePage      # 用户浏览信息接口
|   |   |   ├── detailPage      # 商品详情页接口
|   |   |   ├── infoPage        # 商家信息接口
|   |   |   ├── listPage        # 商品列表接口
|   |   |   ├── tablePage       # 商品表格接口
|   |   ├── login       # 登录接口
│   ├── routers    # 路由
│   ├── stores     # pinia
│   ├── utils      # 工具
│   ├── views      # 页面
│   │   ├── buyer
│   │   │   ├── cart 
│   │   │   │   ├── cartPage
│   │   │   ├── info
│   │   │   │   ├── namePage
│   │   │   ├── main
│   │   │   │   ├── mainPage
│   │   │   ├── order
│   │   │   │   ├── orderPag
│   │   │   ├── buyerPage
│   │   │   ├── detailPage
│   │   ├── seller
│   │   │   ├── browse
│   │   │   │   ├── browsePage
│   │   │   ├── info
│   │   │   │   ├── infoPage
│   │   │   ├── list
│   │   │   │   ├── listPage
│   │   │   │   ├── addPage
│   │   │   ├── table
│   │   │   │   ├── tablePage
│   │   │   ├── detailPage
│   │   │   ├── sellerPage
│   ├── App.vue
│   ├── main.js
├── vite.config.ts
├── package.json
```

## 项目依赖

```
  "dependencies": {
    "axios": "^1.6.2",
    "element-plus": "^2.4.2",
    "pinia": "^2.1.7",
    "pinia-persistedstate-plugin": "^0.1.0",
    "vite-plugin-windicss": "^1.9.1",
    "vue": "^3.3.4",
    "vue-localstorage": "^0.6.2",
    "vue-router": "^4.2.5"
  },
  "devDependencies": {
    "@rushstack/eslint-patch": "^1.3.3",
    "@vitejs/plugin-vue": "^4.4.0",
    "@vue/eslint-config-prettier": "^8.0.0",
    "apifox": "^1.0.0",
    "eslint": "^8.49.0",
    "eslint-plugin-vue": "^9.17.0",
    "prettier": "^3.0.3",
    "unplugin-auto-import": "^0.16.7",
    "unplugin-vue-components": "^0.25.2",
    "vite": "^4.4.11"
  }
  ```
