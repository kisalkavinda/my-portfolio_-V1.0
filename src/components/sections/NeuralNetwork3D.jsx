import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Brain, Pause, Play, Plus, Minus, Activity, Server, Code2, LineChart, Layers } from 'lucide-react'

const NeuralNetwork3D = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  // Interaction & Visual States
  const [isTraining, setIsTraining] = useState(true)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMouseOver, setIsMouseOver] = useState(false)

  // State definitions
  const [showBinary, setShowBinary] = useState(true)
  const [connectionMode, setConnectionMode] = useState('pulse')
  const [neuronSize, setNeuronSize] = useState(6)
  const [speed, setSpeed] = useState(1)
  const [particleMode, setParticleMode] = useState(true)

  // Model Hyperparameters
  const [learningRate, setLearningRate] = useState(0.01)
  const [inputFeatures, setInputFeatures] = useState(5)
  const [outputClasses, setOutputClasses] = useState(3)
  const [hiddenLayers, setHiddenLayers] = useState([8, 8])
  const [epoch, setEpoch] = useState(0)

  // Debounced states for structure changes
  const [debouncedInput, setDebouncedInput] = useState(inputFeatures);
  const [debouncedOutput, setDebouncedOutput] = useState(outputClasses);
  const [debouncedHidden, setDebouncedHidden] = useState(hiddenLayers);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedInput(inputFeatures), 300);
    return () => clearTimeout(handler);
  }, [inputFeatures]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedOutput(outputClasses), 300);
    return () => clearTimeout(handler);
  }, [outputClasses]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedHidden(hiddenLayers), 300);
    return () => clearTimeout(handler);
  }, [hiddenLayers]);

  // Epoch Timer
  useEffect(() => {
    let interval;
    if (isTraining) {
      interval = setInterval(() => {
        setEpoch(e => e + 1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isTraining]);

  // Main Canvas Logic
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    // Handle High DPI
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Virtual width/height for calculations
    const width = rect.width
    const height = rect.height

    // Setup Layers
    const createLayers = () => {
      const layers = [{ nodes: debouncedInput, x: 0.15, name: 'Input Features' }]
      const hiddenSpacing = 0.7 / (debouncedHidden.length + 1)
      debouncedHidden.forEach((nodes, i) => {
        layers.push({
          nodes: nodes,
          x: 0.15 + hiddenSpacing * (i + 1),
          name: `Hidden Layer ${i + 1}`
        })
      })
      layers.push({ nodes: debouncedOutput, x: 0.85, name: 'Softmax Output' })
      return layers
    }

    let layers = createLayers()
    let rotation = 0
    let time = 0
    const particles = []

    // Node Creation
    const createNodes = () => {
      const nodes = []
      layers.forEach((layer, layerIndex) => {
        const verticalSpacing = Math.min(80, height / (layer.nodes + 1))
        const totalHeight = (layer.nodes - 1) * verticalSpacing
        const startY = (height - totalHeight) / 2

        for (let i = 0; i < layer.nodes; i++) {
          const angle = (i / layer.nodes) * Math.PI * 2
          const zRadius = Math.min(100, height * 0.15)

          nodes.push({
            id: `${layerIndex}-${i}`,
            layerIndex,
            x: layer.x * width,
            baseY: startY + i * verticalSpacing,
            y: startY + i * verticalSpacing,
            z: Math.cos(angle) * zRadius,
            baseZ: Math.cos(angle) * zRadius,
            radius: neuronSize, // Use state variable
            activation: Math.random(),
            bias: Math.random() * 0.5,
            pulsePhase: Math.random() * Math.PI * 2,
            hoverIntensity: 0,
            layerName: layer.name,
            isOutput: layerIndex === layers.length - 1
          })
        }
      })
      return nodes
    }

    let nodes = createNodes()

    // Synapse Creation
    const createConnections = () => {
      const connections = []
      layers.forEach((layer, layerIndex) => {
        if (layerIndex < layers.length - 1) {
          const currentNodes = nodes.filter(n => n.layerIndex === layerIndex)
          const nextNodes = nodes.filter(n => n.layerIndex === layerIndex + 1)
          currentNodes.forEach(node1 => {
            nextNodes.forEach(node2 => {
              connections.push({
                from: node1,
                to: node2,
                weight: Math.random() * 2 - 1,
                dataPacket: Math.random(),
                speed: Math.random() * 0.02 + 0.005
              })
            })
          })
        }
      })
      return connections
    }

    let connections = createConnections()

    // Theme-aware colors
    const accentColor = '0, 217, 255';
    const highlightColor = '77, 255, 254';
    const nodeFillWhite = accentColor;
    const binaryParticleColor = '0, 217, 255';
    const layerLineColor = '0, 217, 255';
    const layerRectBg = '10, 10, 10';
    const layerTextFill = '192, 192, 192';
    const outputNodeTextColor = '255, 255, 255';

    // Binary Particles (Matrix Effect)
    const createParticle = (x, y) => ({
      x, y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      value: Math.random() > 0.5 ? "1" : "0",
      life: 1,
      maxLife: 40 + Math.random() * 20,
      size: 10 + Math.random() * 4
    })

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      time += 0.05 * speed

      if (isTraining) rotation += 0.002 * speed

      // 1. Update Nodes & Physics
      nodes.forEach((node) => {
        const rotatedZ = node.baseZ * Math.cos(rotation + node.layerIndex * 0.3)
        node.z = rotatedZ
        node.y = node.baseY + node.z * 0.4

        const dx = mousePos.x - node.x
        const dy = mousePos.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 100) {
          node.hoverIntensity = Math.min(1, (100 - dist) / 100)
          if (showBinary && particleMode && Math.random() < 0.2) {
            particles.push(createParticle(node.x, node.y))
          }
        } else {
          node.hoverIntensity = Math.max(0, node.hoverIntensity - 0.05)
        }

        node.pulsePhase += 0.05 * speed
        const signal = Math.sin(time + node.layerIndex) * 0.5 + 0.5
        node.activation = (signal * 0.3) + (node.hoverIntensity * 0.7) + (Math.sin(node.pulsePhase) * 0.1)
      })

      nodes.sort((a, b) => a.z - b.z)
      connections.sort((a, b) => (a.from.z + a.to.z) - (b.from.z + b.to.z))

      // 2. Draw Connections
      connections.forEach(conn => {
        const avgZ = (conn.from.z + conn.to.z) / 2
        const depthScale = 1 + (avgZ / 300)
        const alpha = 0.15 + (avgZ + 100) / 300 * 0.2

        if (isTraining) {
          conn.dataPacket += conn.speed * (learningRate * 100) * speed
          if (conn.dataPacket > 1) conn.dataPacket = 0
        }

        if (connectionMode === 'pulse') {
          // --- GRADIENT PULSE MODE ---
          const gradient = ctx.createLinearGradient(conn.from.x, conn.from.y, conn.to.x, conn.to.y)

          // Base Line Color (Purple)
          gradient.addColorStop(0, `rgba(${accentColor}, ${alpha})`)

          // The Pulse (Bright Pink Beam)
          if (conn.dataPacket > 0 && conn.dataPacket < 1) {
            gradient.addColorStop(Math.max(0, conn.dataPacket - 0.1), `rgba(${accentColor}, ${alpha})`)
            gradient.addColorStop(conn.dataPacket, `rgba(${highlightColor}, ${alpha + 0.8})`)
            gradient.addColorStop(Math.min(1, conn.dataPacket + 0.1), `rgba(${accentColor}, ${alpha})`)
          }

          // End Line Color
          gradient.addColorStop(1, `rgba(${accentColor}, ${alpha})`)

          ctx.beginPath()
          ctx.strokeStyle = gradient
          ctx.lineWidth = (0.5 + (conn.dataPacket > 0.1 && conn.dataPacket < 0.9 ? 0.5 : 0)) * depthScale
          ctx.moveTo(conn.from.x, conn.from.y)
          ctx.lineTo(conn.to.x, conn.to.y)
          ctx.stroke()

          // Glowing dot
          const px = conn.from.x + (conn.to.x - conn.from.x) * conn.dataPacket
          const py = conn.from.y + (conn.to.y - conn.from.y) * conn.dataPacket
          ctx.shadowBlur = 10 * depthScale
          ctx.shadowColor = `rgba(${highlightColor}, 0.9)`
          ctx.fillStyle = `rgba(${nodeFillWhite}, ${alpha + 0.8})`
          ctx.beginPath()
          ctx.arc(px, py, 2.5 * depthScale, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0

        } else if (connectionMode === 'stream') {
          // --- SIMPLE STREAM MODE ---
          ctx.strokeStyle = `rgba(${accentColor}, ${alpha * 0.5})`
          ctx.lineWidth = 0.5 * depthScale
          ctx.beginPath()
          ctx.moveTo(conn.from.x, conn.from.y)
          ctx.lineTo(conn.to.x, conn.to.y)
          ctx.stroke()

          const px = conn.from.x + (conn.to.x - conn.from.x) * conn.dataPacket
          const py = conn.from.y + (conn.to.y - conn.from.y) * conn.dataPacket
          ctx.fillStyle = `rgba(${highlightColor}, ${alpha + 0.8})`
          ctx.beginPath()
          ctx.arc(px, py, 2 * depthScale, 0, Math.PI * 2)
          ctx.fill()

        } else {
          // --- NEURAL SPARK MODE ---
          ctx.strokeStyle = `rgba(${accentColor}, ${alpha * 0.4})`
          ctx.lineWidth = 0.5 * depthScale
          ctx.beginPath()
          ctx.moveTo(conn.from.x, conn.from.y)
          ctx.lineTo(conn.to.x, conn.to.y)
          ctx.stroke()

          if (Math.random() < 0.05) {
            const px = conn.from.x + (conn.to.x - conn.from.x) * Math.random()
            const py = conn.from.y + (conn.to.y - conn.from.y) * Math.random()
            ctx.shadowBlur = 10
            ctx.shadowColor = `rgba(${accentColor}, 0.9)`
            ctx.fillStyle = `rgba(${nodeFillWhite}, ${alpha})`
            ctx.beginPath()
            ctx.arc(px, py, 1.5 * depthScale, 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0
          }
        }
      })

      // 3. Draw Nodes (Neurons)
      nodes.forEach(node => {
        const scale = 1 + node.z / 200
        const r = node.radius * scale

        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4)
        const hue = node.isOutput ? 175 : 185;
        const saturation = '100%';
        const lightnessInner = '80%';
        const lightnessOuter = '60%';
        const lightnessTransparent = '50%';

        gradient.addColorStop(0, `hsla(${hue}, ${saturation}, ${lightnessOuter}, ${node.activation})`)
        gradient.addColorStop(1, `hsla(${hue}, ${saturation}, ${lightnessTransparent}, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `hsla(${hue}, ${saturation}, ${lightnessInner}, 1)`
        ctx.beginPath()
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
        ctx.fill()

        if (node.isOutput) {
          ctx.font = `bold ${12 * scale}px "JetBrains Mono", monospace`
          ctx.fillStyle = `rgba(${outputNodeTextColor}, 0.9)`
          ctx.textAlign = 'left'
          const probability = Math.min(99.9, Math.max(0.1, (node.activation * 100) + (Math.sin(time * 5 + node.y) * 5))).toFixed(1)
          ctx.fillText(`${probability}%`, node.x + 25 * scale, node.y + 4)

          ctx.font = `${10 * scale}px sans-serif`
          ctx.fillStyle = `rgba(${highlightColor}, 0.8)`
          ctx.fillText(`Class ${node.id.split('-')[1]}`, node.x + 25 * scale, node.y - 12)
        }
      })

      // 4. Draw Binary Particles
      if (showBinary && particleMode) {
        ctx.font = '12px "JetBrains Mono", monospace'
        ctx.textAlign = 'center'
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i]
          p.x += p.vx
          p.y += p.vy
          p.life--
          const alpha = p.life / p.maxLife

          ctx.fillStyle = `rgba(${binaryParticleColor}, ${alpha})`
          ctx.fillText(p.value, p.x, p.y)

          if (p.life <= 0) particles.splice(i, 1)
        }
      }

      // 5. Layer Labels
      const uniqueLayers = [...new Set(nodes.map(n => n.layerIndex))].sort((a, b) => a - b)
      uniqueLayers.forEach(idx => {
        const layerNodes = nodes.filter(n => n.layerIndex === idx)
        if (layerNodes.length > 0) {
          const x = layerNodes[0].x
          const name = layerNodes[0].layerName

          ctx.strokeStyle = `rgba(${layerLineColor}, 0.1)`
          ctx.beginPath()
          ctx.moveTo(x, 10)
          ctx.lineTo(x, height - 10)
          ctx.stroke()

          ctx.fillStyle = `rgba(${layerRectBg}, 0.8)`
          ctx.fillRect(x - 50, 10, 100, 24)
          ctx.fillStyle = `rgba(${layerTextFill}, 1)`
          ctx.font = '10px "JetBrains Mono", monospace'
          ctx.textAlign = 'center'
          ctx.fillText(name.toUpperCase(), x, 25)
        }
      })

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      const r = canvas.getBoundingClientRect()
      canvas.width = r.width * window.devicePixelRatio
      canvas.height = r.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      layers = createLayers()
      nodes = createNodes()
      connections = createConnections()
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isTraining, mousePos, showBinary, learningRate, debouncedInput, debouncedOutput, debouncedHidden, connectionMode, neuronSize, speed, particleMode])

  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const addHiddenLayer = () => { if (hiddenLayers.length < 5) setHiddenLayers([...hiddenLayers, 8]) }
  const removeHiddenLayer = () => { if (hiddenLayers.length > 1) setHiddenLayers(hiddenLayers.slice(0, -1)) }
  const updateHiddenLayerNodes = (index, value) => {
    const newLayers = [...hiddenLayers]
    newLayers[index] = Math.max(2, Math.min(16, value))
    setHiddenLayers(newLayers)
  }

  const getTotalParams = () => {
    const allLayers = [inputFeatures, ...hiddenLayers, outputClasses]
    let weights = 0
    let biases = 0
    for (let i = 0; i < allLayers.length - 1; i++) {
      weights += allLayers[i] * allLayers[i + 1]
      biases += allLayers[i + 1]
    }
    return weights + biases
  }

  const resetNetwork = () => {
    setInputFeatures(5)
    setOutputClasses(3)
    setHiddenLayers([8, 8])
    setLearningRate(0.01)
    setSpeed(1)
  }

  return (
    <section id="neural-network" className="min-h-screen hidden lg:flex flex-col items-center px-4 py-12 lg:py-20 relative overflow-hidden">
      {/* --- BACKGROUND EFFECTS (MATCHING ABOUT.JSX) --- */}
      {/* Separator line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00d9ff] via-highlight to-transparent opacity-75 blur-sm z-0" />

      {/* Full section gradient overlay - transparent top, visible bottom */}
      <div className="absolute inset-0 pointer-events-none z-0 dark:bg-gradient-to-b dark:from-transparent dark:via-black/25 dark:to-black/55" />

      {/* Background decoration (Glowing Orbs) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent bg-accent rounded-full blur-3xl" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-highlight bg-highlight rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1800px] w-full mx-auto relative z-10">

        {/* --- HEADER (Centered with Aligned Left Subtitle) --- */}
        <motion.div
          className="flex flex-col items-center justify-center mb-8 relative"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 font-display text-center">
              <span className="text-text-primary text-text-primary">Neural Network </span>
              <span className="bg-gradient-to-r from-[#00d9ff] to-[#4dfffe] bg-clip-text text-transparent">Inspector</span>
            </h2>
            <div className="flex items-center gap-1 text-text-primary text-text-primary justify-center">
              <Brain size={16} className="text-accent" />
              <span className="font-mono text-xs font-bold tracking-widest uppercase">Deep Learning Model Visualization</span>
            </div>
          </div>

          {/* Stats (Responsive Layout) */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 md:mt-0 md:absolute md:right-0 md:bottom-2 w-full md:w-auto justify-center md:justify-end">
            <div className="text-center md:text-right">
              <div className="text-xs text-text-primary uppercase tracking-wider font-mono">Epochs</div>
              <div className="text-xl font-mono text-accent">{epoch.toLocaleString()}</div>
            </div>
            <div className="text-center md:text-right sm:pl-6 sm:border-l border-accent/20">
              <div className="text-xs text-text-primary uppercase tracking-wider font-mono">Status</div>
              <div className="flex items-center justify-center md:justify-end gap-2 text-xl font-mono text-[#4dfffe]">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-highlight opacity-75 ${!isTraining && 'hidden'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isTraining ? 'bg-highlight' : 'bg-[#0a0a0a]'}`}></span>
                </span>
                {isTraining ? 'TRAINING' : 'IDLE'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- MAIN GRID LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">

          {/* Left Sidebar: Hyperparameters */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-[320px] bg-white/50 dark:bg-slate-900/20 backdrop-blur-sm rounded-2xl border border-accent border-accent/40 p-4 space-y-4 lg:sticky top-6 order-3 lg:order-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <Layers className="text-accent" size={20} />
              <h3 className="text-lg font-bold text-gray-800 text-text-primary">Architecture</h3>
            </div>

            <div className="p-2 bg-accent/10 rounded-lg border border-accent/30">
              <label className="block text-accent text-highlight font-semibold mb-1">Input Layer</label>
              <div className="flex items-center gap-2">
                <button onClick={() => setInputFeatures(Math.max(2, inputFeatures - 1))} className="p-1 bg-accent/80 hover:bg-accent active:scale-95 transition-all rounded text-accent text-highlight"><Minus size={16} /></button>
                <input type="number" min="2" max="12" value={inputFeatures} onChange={(e) => setInputFeatures(Math.max(2, Math.min(12, parseInt(e.target.value) || 2)))} className="flex-1 bg-gray-100/50 bg-surface/50 border-accent/30 border-accent/30 rounded px-2 py-1 text-gray-800 text-text-primary text-center" />
                <button onClick={() => setInputFeatures(Math.min(10, inputFeatures + 1))} className="p-1 bg-accent/80 hover:bg-accent active:scale-95 transition-all rounded text-accent text-highlight"><Plus size={16} /></button>
              </div>
              <p className="text-text-primary">{inputFeatures} neurons</p>
            </div>

            {/* Hidden Layers */}
            <div className="p-2 bg-highlight/10 rounded-lg border border-[#4dfffe]/30">
              <div className="flex items-center justify-between mb-1">
                <label className="text-highlight text-highlight font-semibold">Hidden Layers</label>
                <div className="flex gap-1">
                  <button onClick={removeHiddenLayer} disabled={hiddenLayers.length <= 1} className="p-1 bg-accent/80 hover:bg-accent active:scale-95 transition-all rounded text-accent text-highlight"><Minus size={14} /></button>
                  <button onClick={addHiddenLayer} disabled={hiddenLayers.length >= 5} className="p-1 bg-accent/80 hover:bg-accent active:scale-95 transition-all rounded text-accent text-highlight"><Plus size={14} /></button>
                </div>
              </div>
              <div className="space-y-2">
                {hiddenLayers.map((count, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-accent/50 w-4">L{i + 1}</span>
                    <button onClick={() => updateHiddenLayerNodes(i, count - 1)} className="p-1 bg-accent/50 hover:bg-accent rounded"><Minus size={10} /></button>
                    <div className="flex-1 h-1 bg-slate-800 rounded-full">
                      <div className="h-full bg-highlight" style={{ width: `${(count / 16) * 100}%` }}></div>
                    </div>
                    <button onClick={() => updateHiddenLayerNodes(i, count + 1)} className="p-1 bg-accent/50 hover:bg-accent rounded"><Plus size={10} /></button>
                    <span className="w-5 text-right text-gray-800 text-text-primary">{count}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-700 text-text-primary mt-1">{hiddenLayers.length} layers</p>
            </div>

            {/* Output Layer */}
            <div className="p-2 bg-accent/10 rounded-lg border border-accent/30">
              <label className="block text-accent text-highlight font-semibold mb-1">Output Layer</label>
              <div className="flex items-center gap-2">
                <button onClick={() => setOutputClasses(Math.max(2, outputClasses - 1))} className="p-1 bg-accent/80 hover:bg-accent active:scale-95 transition-all rounded text-accent text-highlight"><Minus size={16} /></button>
                <input type="number" min="2" max="12" value={outputClasses} onChange={(e) => setOutputClasses(Math.max(2, Math.min(12, parseInt(e.target.value) || 2)))} className="flex-1 bg-gray-100/50 bg-surface/50 border-accent/30 border-accent/30 rounded px-2 py-1 text-gray-800 text-text-primary text-center" />
                <button onClick={() => setOutputClasses(Math.min(10, outputClasses + 1))} className="p-1 bg-accent/80 hover:bg-accent active:scale-95 transition-all rounded text-accent text-highlight"><Plus size={16} /></button>
              </div>
              <p className="text-text-primary">{outputClasses} neurons</p>
            </div>

            <div className="border-t border-accent/20 pt-2 mt-2" />

            {/* Learning Rate Control */}
            <div>
              <label className="block text-text-primary mb-1">Learning Rate: {learningRate.toFixed(4)}</label>
              <input type="range" min="0.0001" max="0.1" step="0.0001" value={learningRate} onChange={(e) => setLearningRate(parseFloat(e.target.value))} className="w-full accent-accent h-2 bg-accent/20 rounded-lg appearance-none cursor-pointer" />
            </div>

            {/* Controls */}
            <div>
              <label className="block text-text-primary font-semibold mb-1">Connection Style</label>
              <select value={connectionMode} onChange={(e) => setConnectionMode(e.target.value)} className="w-full bg-surface border border-accent/50 rounded px-2 py-1 text-text-primary cursor-pointer">
                <option value="pulse">Pulse</option>
                <option value="stream">Data Stream</option>
                <option value="neural">Neural Sparks</option>
              </select>
            </div>

            <div>
              <label className="block text-text-primary mb-1">Neuron Size: {neuronSize}px</label>
              <input type="range" min="4" max="15" value={neuronSize} onChange={(e) => setNeuronSize(parseInt(e.target.value))} className="w-full accent-accent h-2 bg-accent/20 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div>
              <label className="block text-text-primary mb-1">Speed: {speed}x</label>
              <input type="range" min="0.1" max="3" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-full accent-highlight h-2 bg-accent/20 rounded-lg appearance-none cursor-pointer" />
            </div>
          </motion.aside>

          {/* Center: Visualization Canvas */}
          <main className="flex-1 flex flex-col gap-4 min-w-0 relative order-1 lg:order-2 h-[400px] sm:h-[500px] lg:h-auto lg:min-h-[600px]">
            <motion.div
              className={`relative bg-white/50 dark:bg-slate-900/20 backdrop-blur-sm rounded-2xl border border-accent border-accent/40 overflow-hidden shadow-2xl flex-1 ${isMouseOver ? 'ring-2 ring-accent/50' : ''}`}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <canvas
                ref={canvasRef}
                className="w-full h-full absolute inset-0 cursor-crosshair bg-transparent z-10"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsMouseOver(true)}
                onMouseLeave={() => setIsMouseOver(false)}
              />

              {/* Floating Canvas Controls */}
              <div className="absolute top-4 right-4 flex gap-2 z-20">
                <motion.button onClick={() => setIsTraining(!isTraining)} className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl border text-xs md:text-sm font-mono transition-all backdrop-blur-md ${isTraining ? 'bg-highlight/20 border-highlight/50 text-highlight text-highlight/70' : 'bg-gray-100/50 border-accent/50 text-gray-700 bg-surface/50 border-surface text-text-primary'}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {isTraining ? <><Pause size={12} className="md:w-3.5 md:h-3.5" /> STOP</> : <><Play size={12} className="md:w-3.5 md:h-3.5" /> TRAIN</>}
                </motion.button>
                <motion.button onClick={() => setShowBinary(!showBinary)} className={`p-1.5 md:p-2 rounded-xl border transition-all backdrop-blur-md ${showBinary ? 'bg-accent/10 border-accent text-accent bg-accent/20 border-accent/50 text-highlight' : 'bg-gray-100/50 border-accent/50 text-gray-700 dark:bg-[#0a0a0a]/50 border-surface text-text-primary'}`} whileHover={{ scale: 1.05 }}>
                  <Code2 size={14} className="md:w-4 md:h-4" />
                </motion.button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 text-[9px] md:text-[10px] font-mono uppercase tracking-wider text-accent/60 text-highlight/60 pointer-events-none z-20">
                <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent"></div> Input/Hidden</div>
                <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-highlight"></div> Output Class</div>
                <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-surface"></div> Inactive</div>
              </div>
            </motion.div>
          </main>

          {/* Right Sidebar: Analytics */}
          <aside className="w-full lg:w-[280px] flex flex-col gap-3 order-2 lg:order-3">
            {/* Model Stats */}
            <div className="bg-white/50 dark:bg-slate-900/20 backdrop-blur-sm rounded-2xl border border-accent border-accent/40 p-4 shadow-xl">
              <div className="flex items-center gap-2 text-accent text-highlight border-b border-accent/20 pb-3 mb-3">
                <Server size={16} />
                <span className="font-bold text-xs tracking-wide">MODEL STATS</span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-gray-100/50 bg-surface/50 p-2 rounded-xl border border-accent/50 border-accent/20">
                  <div className="text-lg font-mono text-accent text-highlight">{getTotalParams()}</div>
                  <div className="text-[10px] text-accent/60 text-highlight/60 uppercase">Params</div>
                </div>
                <div className="bg-gray-100/50 bg-surface/50 p-2 rounded-xl border border-accent/50 border-accent/20">
                  <div className="text-lg font-mono text-highlight text-highlight">{hiddenLayers.length + 2}</div>
                  <div className="text-[10px] text-highlight/60 text-highlight/60 uppercase">Layers</div>
                </div>
              </div>

              {/* Fake Loss Graph */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-accent/70 text-highlight/70 font-mono">
                  <span className="flex items-center gap-1"><Activity size={10} /> Loss Function</span>
                  <span className="text-highlight">0.0241</span>
                </div>
                <div className="h-16 flex items-end gap-1 opacity-80">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="flex-1 bg-highlight/40 hover:bg-highlight transition-colors rounded-t-sm" style={{ height: `${Math.max(10, Math.random() * 100 * (1 - i / 20))}%` }}></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Accuracy Metrics */}
            <div className="bg-white/50 dark:bg-slate-900/20 backdrop-blur-sm rounded-2xl border border-accent border-accent/40 p-4 flex-1 shadow-xl">
              <div className="flex items-center gap-2 text-accent text-highlight border-b border-accent/20 pb-3 mb-3">
                <LineChart size={16} />
                <span className="font-bold text-xs tracking-wide">METRICS</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-accent/70 text-highlight/70">Training Accuracy</span>
                    <span className="text-accent text-highlight">98.2%</span>
                  </div>
                  <div className="bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[98%] shadow-[0_0_10px_rgba(0,217,255,0.5)]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-highlight/70 text-highlight/70">Validation Accuracy</span>
                    <span className="text-highlight text-highlight">94.5%</span>
                  </div>
                  <div className="bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-highlight w-[94%] shadow-[0_0_10px_rgba(77,255,254,0.5)]"></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-100/50 bg-surface/50 rounded-xl border border-accent/50 border-accent/20">
                <code className="text-[10px] text-accent text-highlight font-mono block leading-relaxed opacity-80">
                  &gt; forward_prop()<br />
                  &gt; calc_loss()<br />
                  &gt; backprop()<br />
                  &gt; update_weights()<br />
                  <span className="animate-pulse text-highlight text-highlight/60">_</span>
                </code>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white/50 dark:bg-slate-900/20 backdrop-blur-sm rounded-2xl border border-accent border-accent/40 p-4 space-y-2">
              <h4 className="text-base font-bold text-gray-800 text-text-primary mb-2">Quick Actions</h4>
              <button onClick={() => setIsTraining(!isTraining)} className="w-full py-1.5 px-3 bg-accent/20 hover:bg-accent/40 border border-accent/50 rounded-lg transition-all text-xs text-accent text-highlight">
                Toggle Rotation
              </button>
              <button onClick={() => setParticleMode(!particleMode)} className="w-full py-1.5 px-3 bg-highlight/20 bg-highlight/40 border border-highlight/50 rounded-lg transition-all text-xs text-highlight text-highlight">
                Toggle Particles
              </button>
              <button onClick={() => resetNetwork()} className="w-full py-1.5 px-3 bg-accent/20 hover:bg-accent/40 border border-accent/50 rounded-lg transition-all text-xs text-accent text-highlight">
                Reset Network
              </button>
            </div>
          </aside>

        </div>

        {/* --- PRESETS SECTION --- */}
        <motion.div
          className="mt-16 text-center w-full bg-surface/20 rounded-2xl border border-accent/40 py-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold text-accent text-highlight mb-3">Try These Presets</h3>
          <div className="flex flex-nowrap lg:flex-wrap overflow-x-auto gap-4 justify-center">
            {[
              { name: 'Simple', input: 3, hidden: [4], output: 2 },
              { name: 'Standard', input: 4, hidden: [6, 6], output: 3 },
              { name: 'Deep', input: 5, hidden: [8, 6, 4], output: 3 },
              { name: 'Wide', input: 6, hidden: [12, 12], output: 4 },
              { name: 'Complex', input: 8, hidden: [10, 8, 6, 4], output: 5 }
            ].map((preset, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setTimeout(() => {
                    setInputFeatures(preset.input)
                    setHiddenLayers(preset.hidden)
                    setOutputClasses(preset.output)
                  }, 0)
                }}
                className="px-4 py-3 bg-surface/50 hover:bg-surface/50 dark:hover:bg-accent/30 border border-accent border-accent/50 hover:border-accent/50 border-accent/60 rounded-xl transition-all flex-shrink-0"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="font-medium text-sm text-accent text-highlight">{preset.name}</div>
                <div className="text-xs text-text-primary dark:text-text-primary">{preset.input}-{preset.hidden.join('-')}-{preset.output}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default NeuralNetwork3D