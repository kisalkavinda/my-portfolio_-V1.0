import { motion } from 'framer-motion'

const ProjectProgress = ({ value, color = 'bg-[#00d9ff]' }) => {
  return (
    <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
      <motion.div 
        className={`h-full ${color} rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  )
}

export default ProjectProgress