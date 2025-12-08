import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'

const CodeSnippet = ({ code, language = 'javascript' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <div className="absolute right-4 top-4 z-10">
        <motion.button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-2 bg-[#0a0a0a] hover:bg-[#0a0a0a] rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
        </motion.button>
      </div>
      
              <pre className="bg-[#000000] text-gray-100 p-6 rounded-lg overflow-x-auto text-sm">        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  )
}

export default CodeSnippet