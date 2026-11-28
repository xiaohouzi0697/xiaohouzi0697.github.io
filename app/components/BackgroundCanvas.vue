<script setup>
const canvasRef = ref(null)

let context
let width = 0
let height = 0
let particles = []
let animationId

class Particle {
  constructor() {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
    this.size = Math.random() * 2 + 1
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0 || this.x > width) this.vx *= -1
    if (this.y < 0 || this.y > height) this.vy *= -1
  }

  draw() {
    context.beginPath()
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    context.fillStyle = 'rgba(6, 182, 212, 0.5)'
    context.fill()
  }
}

function initParticles() {
  const count = Math.min(Math.floor(width * height / 10000), 100)
  particles = Array.from({ length: count }, () => new Particle())
}

function resize() {
  width = window.innerWidth
  height = window.innerHeight
  canvasRef.value.width = width
  canvasRef.value.height = height
  initParticles()
}

function animate() {
  context.clearRect(0, 0, width, height)

  particles.forEach((particle, index) => {
    particle.update()
    particle.draw()

    for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex++) {
      const nextParticle = particles[nextIndex]
      const dx = particle.x - nextParticle.x
      const dy = particle.y - nextParticle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 150) {
        context.beginPath()
        context.strokeStyle = `rgba(139, 92, 246, ${0.15 - distance / 1000})`
        context.lineWidth = 1
        context.moveTo(particle.x, particle.y)
        context.lineTo(nextParticle.x, nextParticle.y)
        context.stroke()
      }
    }
  })

  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  context = canvasRef.value.getContext('2d')
  resize()
  animate()
  window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <canvas id="bg-canvas" ref="canvasRef" aria-hidden="true" />
</template>
