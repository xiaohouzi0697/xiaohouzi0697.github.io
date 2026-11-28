<script setup>
const isScrolled = ref(false)

function updateNavbar() {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  updateNavbar()
  window.addEventListener('scroll', updateNavbar, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateNavbar)
})
</script>

<template>
  <nav
    class="fixed w-full z-50 transition-all duration-300 px-6"
    :class="isScrolled ? 'py-2' : 'py-4'"
    aria-label="主导航"
  >
    <div class="max-w-7xl mx-auto flex justify-between items-center glass-card rounded-full px-6 py-3">
      <a href="#home" class="text-xl font-heading font-bold text-tech-primary tracking-wider">
        &lt;XHZ/&gt;
      </a>
      <div class="hidden md:flex space-x-8 font-mono text-sm">
        <a href="#home" class="hover:text-tech-primary transition-colors">首页</a>
        <a href="#about" class="hover:text-tech-primary transition-colors">技术栈</a>
        <a href="#projects" class="hover:text-tech-primary transition-colors">项目展示</a>
        <a href="#blog" class="hover:text-tech-primary transition-colors">技术实践</a>
      </div>
      <a
        href="#contact"
        class="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-2 px-6 rounded-full text-sm transition-all shadow-lg hover:shadow-cyan-500/50"
      >
        联系我
      </a>
    </div>
  </nav>
</template>
