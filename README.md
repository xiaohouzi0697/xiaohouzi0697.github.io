# nuxt-demo

一个基于 [Nuxt 4](https://nuxt.com/docs/getting-started/introduction) 的演示项目，使用 `app/` 目录结构，包含页面路由与服务端 API 示例。

## 环境要求

- Node.js 20.19+ 或 22.12+
- npm（项目使用 `package-lock.json` 锁定依赖）

## 快速开始

安装依赖：

```bash
npm install
```

启动开发服务器（默认地址 `http://localhost:3000`）：

```bash
npm run dev
```

首页会通过 `useFetch` 请求服务端接口 `/api/hello`，并显示返回的消息。

## 常用命令

```bash
npm run dev       # 启动开发服务器
npm run build     # 构建生产版本
npm run preview   # 本地预览生产构建
npm run generate  # 生成静态站点
```

## 项目结构

```text
.
├── app/
│   ├── app.vue            # 根组件，使用 NuxtPage 渲染路由页面
│   └── pages/
│       └── index.vue      # 首页，调用 /api/hello 并展示数据
├── server/
│   └── api/
│       └── hello.ts       # 服务端接口，返回问候消息和时间戳
├── public/                # 静态资源（favicon.ico、robots.txt）
└── nuxt.config.ts         # Nuxt 配置
```

## API 示例

`GET /api/hello` 返回示例：

```json
{
  "message": "你好！这是来自 Nuxt 服务端的问候",
  "timestamp": 1730000000000
}
```

## 部署

构建产物的部署方式请参考 [Nuxt 部署文档](https://nuxt.com/docs/getting-started/deployment)。
