// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      title: 'xiaohouzi0697 | Java 全栈开发',
      meta: [
        {
          name: 'description',
          content: 'xiaohouzi0697 的个人技术空间，专注 Java 后端、微服务、RAG 智能问答与 Vue 全栈开发。'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto+Mono:wght@300;400;600&display=swap'
        }
      ],
      script: [
        { src: 'https://cdn.tailwindcss.com' },
        {
          innerHTML: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    tech: {
                      bg: '#0f172a',
                      card: 'rgba(30, 41, 59, 0.7)',
                      primary: '#06b6d4',
                      secondary: '#8b5cf6'
                    }
                  },
                  fontFamily: {
                    heading: ['Orbitron', 'sans-serif'],
                    mono: ['Roboto Mono', 'monospace']
                  },
                  animation: {
                    'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    float: 'float 6s ease-in-out infinite'
                  },
                  keyframes: {
                    float: {
                      '0%, 100%': { transform: 'translateY(0)' },
                      '50%': { transform: 'translateY(-20px)' }
                    }
                  }
                }
              }
            }
          `
        }
      ]
    }
  }
})
