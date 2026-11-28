<script setup>
const { baseURL } = useRuntimeConfig().app

const skills = [
  { name: 'Java 17', icon: 'fab fa-java', color: 'text-orange-500', bar: 'bg-orange-500', level: 95 },
  { name: 'Spring Boot 3', icon: 'fas fa-leaf', color: 'text-green-500', bar: 'bg-green-500', level: 90 },
  { name: 'Spring AI / RAG', icon: 'fas fa-brain', color: 'text-purple-400', bar: 'bg-purple-400', level: 88 },
  { name: 'Vue 3', icon: 'fab fa-vuejs', color: 'text-green-500', bar: 'bg-green-500', level: 85 },
  { name: 'MySQL / PostgreSQL', icon: 'fas fa-database', color: 'text-blue-400', bar: 'bg-blue-400', level: 90, compact: true },
  { name: 'Redis / Nacos', icon: 'fas fa-server', color: 'text-red-400', bar: 'bg-red-400', level: 85 },
  { name: 'MyBatis-Plus', icon: 'fas fa-layer-group', color: 'text-cyan-400', bar: 'bg-cyan-400', level: 88 },
  { name: 'Element Plus', icon: 'fas fa-cubes', color: 'text-blue-300', bar: 'bg-blue-300', level: 85 }
]

const projects = [
  {
    id: 'project-rag',
    dialogId: 'rag-dialog',
    period: '2026.10 - 2026.11',
    category: '独立开发 · 20 个工作日',
    title: 'RAG 智能知识库问答平台',
    description: '面向企业内部知识管理与检索场景，统一采集文档、网页等多源数据，通过混合检索与大模型生成实现精准问答和答案引用溯源。',
    icon: 'fas fa-robot',
    gradient: 'from-indigo-900 to-purple-900',
    source: 'https://gitee.com/xiaohouzi0697/rag-1118-dev',
    features: [
      '文档解析、清洗分块与向量化入库',
      '语义与全文混合检索、重排及引用溯源',
      '微服务拆分、独立数据库与统一网关鉴权'
    ],
    technologies: ['Spring Boot 3.5', 'Spring AI 1.1', 'pgvector', 'Vue 3'],
    delay: 0
  },
  {
    id: 'project-mes',
    dialogId: 'mes-dialog',
    period: '2026.08 - 2026.09',
    category: '生产执行核心模块',
    title: 'MES 制造执行系统',
    description: '面向离散制造车间，对物料、设备、人员及生产加工过程进行信息化管理，为中小型加工企业提供可视化的数据支撑。',
    icon: 'fas fa-industry',
    gradient: 'from-blue-900 to-cyan-900',
    source: 'https://gitee.com/xiaohouzi0697/mes-2609-dev',
    features: [
      '工艺路线、生产工单与任务排产全流程',
      '工单 BOM 自动展开及工序任务拆解',
      'Spring AI 自然语言查询与事务一致性保障'
    ],
    technologies: ['JDK 17', 'Spring Boot 3', 'Spring AI', 'MySQL 8', 'Vue 3'],
    delay: 100
  }
]

const practices = [
  {
    href: '#project-rag',
    icon: 'fas fa-brain',
    iconColor: 'text-purple-400',
    background: 'bg-purple-500/20',
    title: 'RAG 问答链路：混合检索与引用溯源',
    description: '从多源文档采集、清洗分块到向量化入库，结合 pgvector 语义检索、全文检索与结果重排，并通过文档块 ID 还原答案引用原文。',
    period: '2026.10 - 2026.11',
    tags: 'Spring AI · RAG · pgvector',
    delay: 0
  },
  {
    href: '#project-mes',
    icon: 'fas fa-industry',
    iconColor: 'text-cyan-500',
    background: 'bg-cyan-500/20',
    title: 'MES 生产执行：工单 BOM 与事务一致性',
    description: '通过字典与编码规则驱动工单业务，下达前完成配置校验并自动展开物料需求和工序任务，同时使用事务保障报工多表数据一致性。',
    period: '2026.08 - 2026.09',
    tags: 'Spring Boot · MySQL · Function Calling',
    delay: 100
  }
]

const phrases = ['Java Developer.', 'Full Stack Developer.', 'RAG Developer.', 'Lifelong Learner.']
const typingText = ref('')

let phraseIndex = 0
let charIndex = 0
let isDeleting = false
let typingTimer
let revealObserver

function type() {
  const currentPhrase = phrases[phraseIndex]
  let delay = 100

  if (isDeleting) {
    charIndex--
    delay = 50
  } else {
    charIndex++
  }

  typingText.value = currentPhrase.substring(0, charIndex)

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true
    delay = 2000
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    phraseIndex = (phraseIndex + 1) % phrases.length
    delay = 500
  }

  typingTimer = window.setTimeout(type, delay)
}

function openDialog(id) {
  const dialog = document.getElementById(id)
  if (!(dialog instanceof HTMLDialogElement)) return

  dialog.showModal()
  document.body.classList.add('overflow-hidden')
}

function closeDialog(id) {
  const dialog = document.getElementById(id)
  if (dialog instanceof HTMLDialogElement) dialog.close()
}

function handleBackdropClick(event, id) {
  if (event.target === event.currentTarget) closeDialog(id)
}

function unlockScroll() {
  document.body.classList.remove('overflow-hidden')
}

onMounted(() => {
  type()

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('active')
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  document.querySelectorAll('.reveal').forEach((element) => {
    revealObserver.observe(element)
  })
})

onBeforeUnmount(() => {
  window.clearTimeout(typingTimer)
  revealObserver?.disconnect()
  unlockScroll()
})
</script>

<template>
  <div class="font-sans antialiased">
    <BackgroundCanvas />
    <SiteNavbar />

    <section id="home" class="min-h-screen flex items-center justify-center relative pt-20">
      <div class="text-center z-10 px-4">
        <div class="mb-8 relative inline-block animate-float">
          <div class="avatar-glow w-40 h-40 md:w-52 md:h-52 mx-auto rounded-full p-1">
            <img
              :src="`${baseURL}xiaohouzi0697-logo.jpg`"
              alt="xiaohouzi0697"
              class="w-full h-full object-cover rounded-full border-4 border-slate-900 shadow-2xl"
            >
          </div>
        </div>

        <h1 class="text-4xl md:text-6xl font-heading font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 pb-2">
          xiaohouzi0697
        </h1>

        <div class="text-base sm:text-xl md:text-2xl font-mono text-gray-300 mb-8 h-8 whitespace-nowrap">
          I am a <span class="text-tech-primary font-bold">{{ typingText }}</span><span class="cursor">&nbsp;</span>
        </div>

        <p class="max-w-2xl mx-auto text-gray-400 mb-10 leading-relaxed">
          专注于 Java 后端与全栈开发，持续探索微服务、RAG 智能问答与制造业数字化。
          <br>用可靠的架构与代码，让技术真正服务于业务。
        </p>

        <div class="flex justify-center gap-6">
          <a
            href="https://gitee.com/xiaohouzi0697"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="访问我的 Gitee"
            title="Gitee"
            class="text-3xl text-gray-400 hover:text-white transition-transform hover:scale-110"
          >
            <i class="fab fa-git-alt" />
          </a>
          <a
            href="#projects"
            aria-label="查看项目"
            title="项目展示"
            class="text-3xl text-gray-400 hover:text-blue-400 transition-transform hover:scale-110"
          >
            <i class="fas fa-folder-open" />
          </a>
          <a
            href="#contact"
            aria-label="联系我"
            title="联系我"
            class="text-3xl text-gray-400 hover:text-pink-500 transition-transform hover:scale-110"
          >
            <i class="fas fa-envelope" />
          </a>
        </div>

        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i class="fas fa-chevron-down text-tech-primary text-xl" />
        </div>
      </div>
    </section>

    <section id="about" class="py-20 bg-slate-900/50">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-3xl font-heading font-bold text-center mb-16 neon-text reveal">
          <i class="fas fa-code mr-2" /> 技术栈
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 reveal">
          <div v-for="skill in skills" :key="skill.name" class="glass-card p-6 rounded-xl text-center group">
            <i
              class="text-5xl mb-4 group-hover:scale-110 transition-transform"
              :class="[skill.icon, skill.color]"
            />
            <h3 class="font-mono font-bold" :class="{ 'text-sm md:text-base': skill.compact }">
              {{ skill.name }}
            </h3>
            <div class="w-full bg-gray-700 h-1.5 mt-3 rounded-full overflow-hidden">
              <div class="h-full" :class="skill.bar" :style="{ width: `${skill.level}%` }" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="projects" class="py-20 relative">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-3xl font-heading font-bold text-center mb-16 neon-text reveal">
          <i class="fas fa-project-diagram mr-2" /> 精选项目
        </h2>

        <div class="grid md:grid-cols-2 gap-8">
          <article
            v-for="project in projects"
            :id="project.id"
            :key="project.id"
            class="glass-card rounded-2xl overflow-hidden reveal group flex flex-col scroll-mt-24"
            :style="{ transitionDelay: `${project.delay}ms` }"
          >
            <div
              class="h-48 bg-gradient-to-br flex items-center justify-center relative overflow-hidden flex-shrink-0"
              :class="project.gradient"
            >
              <i
                class="text-6xl text-white opacity-20 group-hover:opacity-40 transition-opacity group-hover:scale-110 transform duration-500"
                :class="project.icon"
              />
              <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  type="button"
                  class="bg-tech-primary text-black font-bold py-2 px-4 rounded-full text-sm"
                  @click="openDialog(project.dialogId)"
                >
                  查看详情
                </button>
              </div>
            </div>
            <div class="p-6 flex flex-col flex-1">
              <div class="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs font-mono text-gray-400">
                <span><i class="far fa-calendar mr-1" /> {{ project.period }}</span>
                <span class="text-cyan-300">{{ project.category }}</span>
              </div>
              <h3 class="text-xl font-bold mb-3 text-tech-primary">{{ project.title }}</h3>
              <p class="text-gray-400 text-sm mb-4 leading-relaxed">{{ project.description }}</p>
              <ul class="space-y-2 text-sm text-gray-400 mb-5">
                <li v-for="feature in project.features" :key="feature">
                  <i class="fas fa-check text-tech-primary mr-2" />{{ feature }}
                </li>
              </ul>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="technology in project.technologies"
                  :key="technology"
                  class="px-3 py-1 bg-slate-800 rounded-full text-xs text-blue-300"
                >
                  {{ technology }}
                </span>
              </div>
              <div class="mt-auto pt-6 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  class="text-sm font-bold text-tech-primary hover:text-white transition-colors"
                  @click="openDialog(project.dialogId)"
                >
                  项目详情 <i class="fas fa-arrow-right ml-1" />
                </button>
                <a
                  :href="project.source"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm border border-gray-600 hover:border-tech-primary hover:text-tech-primary px-4 py-2 rounded-full transition-colors"
                >
                  <i class="fab fa-git-alt mr-1" /> Gitee 源码
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <dialog
      id="rag-dialog"
      class="project-dialog"
      aria-labelledby="rag-dialog-title"
      @close="unlockScroll"
      @click="handleBackdropClick($event, 'rag-dialog')"
    >
      <div class="p-6 md:p-8">
        <div class="flex items-start justify-between gap-6 mb-6">
          <div>
            <p class="text-xs font-mono text-tech-primary mb-2">2026.10 - 2026.11 ｜ 独立开发 ｜ 20 个工作日</p>
            <h3 id="rag-dialog-title" class="text-2xl font-bold text-white">RAG 智能知识库问答平台</h3>
          </div>
          <button
            type="button"
            aria-label="关闭项目详情"
            class="w-9 h-9 rounded-full bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700 transition-colors flex-shrink-0"
            @click="closeDialog('rag-dialog')"
          >
            <i class="fas fa-times" />
          </button>
        </div>
        <div class="space-y-6 text-sm leading-relaxed text-gray-300">
          <section>
            <h4 class="text-base font-bold text-tech-primary mb-2"><i class="fas fa-circle-info mr-2" />项目描述</h4>
            <p class="text-gray-400">基于 RAG 的企业智能问答平台，支持文档、网页等多源数据的统一采集与管理，通过文档解析、文本分块、向量化、混合检索及大模型生成等流程，实现企业私有知识的精准检索与智能问答，并支持答案引用溯源。</p>
          </section>
          <section>
            <h4 class="text-base font-bold text-tech-primary mb-2"><i class="fas fa-layer-group mr-2" />技术选型</h4>
            <div class="space-y-2 text-gray-400">
              <p><span class="inline-block w-16 text-gray-200">后端</span>JDK 17、Spring Boot 3.5、Spring Cloud 2025、Spring AI 1.1、MyBatis-Plus 3.5</p>
              <p><span class="inline-block w-16 text-gray-200">中间件</span>MySQL 8.0、PostgreSQL 16（pgvector）、Redis 7、Nacos 3.0、MinIO</p>
              <p><span class="inline-block w-16 text-gray-200">前端</span>Vue 3.5、Element Plus 2.9</p>
            </div>
          </section>
          <section>
            <h4 class="text-base font-bold text-tech-primary mb-2"><i class="fas fa-cubes mr-2" />核心模块</h4>
            <p class="text-gray-400">网关服务、认证授权、智能问答、知识库管理、文档与数据采集、大模型管理、系统管理。</p>
          </section>
          <section>
            <h4 class="text-base font-bold text-tech-primary mb-2"><i class="fas fa-user-gear mr-2" />个人职责</h4>
            <p class="text-gray-400">独立负责项目整体架构设计与前后端开发，包括微服务拆分、Nacos 配置管理及数据库设计；完成文档解析、清洗、分块、向量化入库流程及混合检索、结果重排、引用溯源等问答链路；开发管理后台及用户问答页面。</p>
          </section>
          <section>
            <h4 class="text-base font-bold text-tech-primary mb-3"><i class="fas fa-star mr-2" />项目亮点</h4>
            <ol class="space-y-3">
              <li class="bg-slate-800/60 p-4 rounded-lg"><strong class="text-cyan-300">01 · 微服务架构与数据隔离</strong><p class="mt-1 text-gray-400">拆分认证、AI 问答、文档入库服务，独立部署、独立数据库，经网关统一路由与鉴权，服务间仅通过接口交互，实现业务解耦。</p></li>
              <li class="bg-slate-800/60 p-4 rounded-lg"><strong class="text-cyan-300">02 · 混合检索与引用溯源</strong><p class="mt-1 text-gray-400">结合 pgvector（HNSW）语义检索与全文/模糊检索，通过重排模型优化结果；会话仅保存文档块 ID，前端动态获取原文实现溯源。</p></li>
              <li class="bg-slate-800/60 p-4 rounded-lg"><strong class="text-cyan-300">03 · 文档入库状态管理</strong><p class="mt-1 text-gray-400">覆盖待处理、处理中、成功/失败的全流程状态管理，分阶段记录状态与失败原因，支持异常定位与失败重试。</p></li>
            </ol>
          </section>
        </div>
        <div class="mt-8 pt-6 border-t border-gray-800 text-right">
          <a
            href="https://gitee.com/xiaohouzi0697/rag-1118-dev"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-2 px-5 rounded-full text-sm transition-all"
          >
            <i class="fab fa-git-alt mr-2" />查看 Gitee 源码
          </a>
        </div>
      </div>
    </dialog>

    <dialog
      id="mes-dialog"
      class="project-dialog"
      aria-labelledby="mes-dialog-title"
      @close="unlockScroll"
      @click="handleBackdropClick($event, 'mes-dialog')"
    >
      <div class="p-6 md:p-8">
        <div class="flex items-start justify-between gap-6 mb-6">
          <div>
            <p class="text-xs font-mono text-tech-primary mb-2">2026.08 - 2026.09 ｜ 约 20 个工作日/人</p>
            <h3 id="mes-dialog-title" class="text-2xl font-bold text-white">MES 制造执行系统</h3>
          </div>
          <button
            type="button"
            aria-label="关闭项目详情"
            class="w-9 h-9 rounded-full bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700 transition-colors flex-shrink-0"
            @click="closeDialog('mes-dialog')"
          >
            <i class="fas fa-times" />
          </button>
        </div>
        <div class="space-y-6 text-sm leading-relaxed text-gray-300">
          <section>
            <h4 class="text-base font-bold text-tech-primary mb-2"><i class="fas fa-circle-info mr-2" />项目描述</h4>
            <p class="text-gray-400">面向离散制造车间的制造执行系统，针对中小型生产加工企业，对生产过程中的物料、设备、人员及加工过程等信息进行智能化管理，为企业管理提供可视化的数据支撑。</p>
          </section>
          <section>
            <h4 class="text-base font-bold text-tech-primary mb-2"><i class="fas fa-layer-group mr-2" />技术选型</h4>
            <p class="text-gray-400">JDK 17、Spring Boot 3、Spring AI、MyBatis、MySQL 8、Vue 3、Element Plus、Axios</p>
          </section>
          <section>
            <h4 class="text-base font-bold text-tech-primary mb-2"><i class="fas fa-cubes mr-2" />核心模块</h4>
            <p class="text-gray-400">基础数据、生产执行、仓库管理、设备管理、质检管理、工具管理、系统管理。</p>
          </section>
          <section>
            <h4 class="text-base font-bold text-tech-primary mb-2"><i class="fas fa-user-gear mr-2" />个人职责</h4>
            <p class="text-gray-400">独立负责工序管理、工艺路线、产品制程、生产工单、任务排产、生产报工等生产执行核心业务模块的接口设计、数据库表设计、业务编码与业务校验开发，保障生产业务流程的完整性与数据一致性。</p>
          </section>
          <section>
            <h4 class="text-base font-bold text-tech-primary mb-3"><i class="fas fa-star mr-2" />项目亮点</h4>
            <ol class="space-y-3">
              <li class="bg-slate-800/60 p-4 rounded-lg"><strong class="text-cyan-300">01 · 字典与规则驱动</strong><p class="mt-1 text-gray-400">工单状态由数据字典动态管理，编号按编码规则自动生成，减少硬编码，提升可配置性。</p></li>
              <li class="bg-slate-800/60 p-4 rounded-lg"><strong class="text-cyan-300">02 · 业务校验前置</strong><p class="mt-1 text-gray-400">工单下达前统一校验工艺路线、工序工作站与用料配置，拦截配置缺失，防止错误工单进入生产。</p></li>
              <li class="bg-slate-800/60 p-4 rounded-lg"><strong class="text-cyan-300">03 · 工单 BOM 自动展开</strong><p class="mt-1 text-gray-400">工单下达时根据产品制程及工序用料配置，自动生成工单物料需求清单，并拆解生成对应工序任务，减少人工操作，提高任务下达效率。</p></li>
              <li class="bg-slate-800/60 p-4 rounded-lg"><strong class="text-cyan-300">04 · 事务与数据一致性</strong><p class="mt-1 text-gray-400">核心报工使用 @Transactional 保证多表原子性；删除报工同步回退数据，使用 BigDecimal 保证计算精度。</p></li>
              <li class="bg-slate-800/60 p-4 rounded-lg"><strong class="text-cyan-300">05 · AI 业务助手</strong><p class="mt-1 text-gray-400">通过 Spring AI + Function Calling 集成大模型与 MES 接口，支持使用自然语言查询工单、工序信息。</p></li>
            </ol>
          </section>
        </div>
        <div class="mt-8 pt-6 border-t border-gray-800 text-right">
          <a
            href="https://gitee.com/xiaohouzi0697/mes-2609-dev"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-2 px-5 rounded-full text-sm transition-all"
          >
            <i class="fab fa-git-alt mr-2" />查看 Gitee 源码
          </a>
        </div>
      </div>
    </dialog>

    <section id="blog" class="py-20 bg-slate-900/50">
      <div class="max-w-4xl mx-auto px-6">
        <h2 class="text-3xl font-heading font-bold text-center mb-16 neon-text reveal">
          <i class="fas fa-pen-nib mr-2" /> 技术实践
        </h2>

        <div class="space-y-6">
          <a
            v-for="practice in practices"
            :key="practice.href"
            :href="practice.href"
            class="glass-card p-6 rounded-xl flex flex-col md:flex-row gap-6 items-center reveal hover:bg-slate-800/50 transition-colors cursor-pointer"
            :style="{ transitionDelay: `${practice.delay}ms` }"
          >
            <div
              class="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
              :class="[practice.background, practice.iconColor]"
            >
              <i class="text-3xl" :class="practice.icon" />
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-2 text-gray-100 hover:text-tech-primary transition-colors">{{ practice.title }}</h3>
              <p class="text-gray-400 text-sm line-clamp-2">{{ practice.description }}</p>
              <div class="mt-3 text-xs text-gray-500 flex flex-wrap gap-4">
                <span><i class="far fa-calendar mr-1" /> {{ practice.period }}</span>
                <span><i class="fas fa-tag mr-1" /> {{ practice.tags }}</span>
              </div>
            </div>
            <div class="flex-shrink-0">
              <i class="fas fa-arrow-right text-gray-500" />
            </div>
          </a>
        </div>

        <div class="text-center mt-10">
          <a
            href="https://gitee.com/xiaohouzi0697"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block text-tech-primary hover:text-white border-b border-tech-primary hover:border-white pb-1 transition-all"
          >
            在 Gitee 查看更多 <i class="fas fa-external-link-alt ml-1 text-xs" />
          </a>
        </div>
      </div>
    </section>

    <footer id="contact" class="bg-black/80 py-10 border-t border-gray-800 mt-20">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="text-2xl font-heading text-white mb-6">Let's Connect</h2>
        <p class="text-gray-400 mb-8 max-w-xl mx-auto">
          如果你也对 Java 后端、RAG 或企业数字化感兴趣，欢迎与我交流。
        </p>

        <div class="flex justify-center gap-8 mb-8">
          <a
            href="https://gitee.com/xiaohouzi0697"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="访问我的 Gitee"
            title="Gitee"
            class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-tech-primary hover:text-black transition-all"
          >
            <i class="fab fa-git-alt" />
          </a>
          <a
            href="#projects"
            aria-label="查看项目"
            title="项目展示"
            class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-tech-secondary hover:text-white transition-all"
          >
            <i class="fas fa-project-diagram" />
          </a>
          <a
            href="#home"
            aria-label="返回首页"
            title="返回首页"
            class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
          >
            <i class="fas fa-arrow-up" />
          </a>
        </div>

        <div class="text-gray-600 text-sm font-mono">
          &copy; 2026 xiaohouzi0697. All rights reserved. <br>
          Made with <i class="fas fa-heart text-red-500" /> &amp; Code.
        </div>
      </div>
    </footer>
  </div>
</template>
