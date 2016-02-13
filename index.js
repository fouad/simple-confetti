var colors = [[85,71,106], [174,61,99], [219,56,83], [244,92,68], [248,182,70]]
var numParticles = 40
var numSteps = 30

function attachConfetti (element) {
  var canvas = document.createElement('canvas')
  var context = canvas.getContext('2d')
  var width = element.offsetWidth
  var height = element.offsetHeight

  context.canvas = canvas

  canvas.width = context.width = width * 1.5
  canvas.height = context.height = height * 1.5

  canvas.style.position = 'absolute'
  canvas.style.top = 0
  canvas.style.left = 0

  element.appendChild(canvas)

  var particles = []

  for (var i = 0; i < numParticles; i++) {
    var radius = Math.floor(Math.random() * 2) + .05

    particles.push({
      x: (width / 2),
      y: (height / 2),
      r: radius,
      dir: Math.PI * 2 * Math.random(),
      opacity: .9,
      color: getColor()
    })
  }

  requestAnimationFrame(step.bind(void 0, context, particles))
}

function getColor () {
  var color = colors[Math.floor(Math.random() * colors.length)]

  return `rgba(${color[0]}, ${color[1]}, ${color[2]}`
}

function step (context, particles) {
  context.clearRect(0, 0, context.width, context.height)

  if (!particles || particles.length === 0) {
    context.canvas.parentNode.removeChild(context.canvas)
    return
  }

  particles.forEach((p) => {
    drawCircle(context, p.x, p.y, p.r, `${p.color},${p.opacity})`)

    computeStep(context, p)
  })

  var parts = particles.filter(p => p.opacity > 0)

  requestAnimationFrame(step.bind(void 0, context, parts))
}

function computeStep (context, particle) {
  var xOrigin = context.width / 2
  var yOrigin = context.height / 2

  particle.opacity -= .03
  particle.x = particle.x + (Math.cos(particle.dir) * xOrigin) / numSteps
  particle.y = particle.y + (Math.sin(particle.dir) * yOrigin) / numSteps
}

function drawCircle (context, x, y, r, style) {
  context.beginPath()
  context.arc(x, y, r, 0, Math.PI * 2, true)
  context.fillStyle = style
  return context.fill()
}

module.exports = attachConfetti
