import { motion } from 'framer-motion'

const TechBadge = ({ tech, delay = 0 }) => {
  return (
    <motion.span
      className="px-4 py-2 bg-gradient-to-r from-[#00d9ff]/10 to-[#4dfffe]/10 border border-[#00d9ff]/30 rounded-lg text-[#00d9ff] hover:from-[#00d9ff]/20 hover:to-[#4dfffe]/20 transition-all cursor-default group"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring" }}
      whileHover={{ scale: 1.1, y: -2 }}
    >
      <span className="group-hover:text-highlight transition-colors">{tech}</span>
    </motion.span>
  )
}

export default TechBadge