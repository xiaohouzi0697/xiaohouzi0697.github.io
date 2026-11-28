// server/api/hello.ts
export default defineEventHandler((event) => {
  return {
    message: '你好！这是来自 Nuxt 服务端的问候',
    timestamp: Date.now()
  }
})