import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Tilt } from 'react-tilt'
import { Award, Calendar, ZoomIn } from 'lucide-react'
import CertificateModal from '../ui/CertificateModal'
import { certificates } from '../../data/certificates'
import GlitchText from '../common/GlitchText'

const CertificateCard = ({ certificate, index, onViewClick }) => {


  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className="h-full"
    >
      <Tilt
        options={{
          max: 15,
          scale: 1.05,
          speed: 1000,
          glare: true,
          "max-glare": 0.5,
        }}
        className="group relative bg-surface/50 backdrop-blur-sm rounded-xl p-6 border-2 border-[#00d9ff]/40 hover:border-[#00d9ff]/50 transition-all overflow-hidden flex flex-col h-full transform-style-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-highlight/0 group-hover:from-accent/5 group-hover:to-highlight/5 transition-all duration-500" />



        <div className="relative z-10 flex-grow">
          <div className="flex items-start justify-between mb-4">
            <motion.div
              className="text-5xl"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              {certificate.icon}
            </motion.div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar size={16} />
              {certificate.date}
            </div>
          </div>

          <h3 className="text-xl font-bold mb-2 group-hover:text-[#00d9ff] transition-colors">
            {certificate.title}
          </h3>

          <p className="text-sm text-[#00d9ff] font-semibold mb-3 flex items-center gap-1">
            <Award size={16} />
            {certificate.issuingOrg}
          </p>

          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {certificate.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {certificate.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs bg-[#00d9ff]/10 border-2 border-[#00d9ff]/20 rounded-full text-gray-600 dark:text-gray-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-auto z-20">
          <motion.button
            onClick={() => onViewClick(certificate)}
            className="flex-1 inline-flex items-center justify-center gap-2 text-[#00d9ff] hover:text-[#4dfffe] font-semibold py-2 px-4 bg-[#00d9ff]/10 hover:bg-[#00d9ff]/20 rounded-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ZoomIn size={16} />
            View Certificate
          </motion.button>
        </div>
      </Tilt>
    </motion.div>
  )
}

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const displayedCertificates = showAll ? certificates : certificates.slice(0, 4)
  const hasMore = certificates.length > 4

  const handleViewClick = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleCloseModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <>
      <section id="certificates" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#00d9ff] rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-highlight rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="relative text-4xl md:text-5xl font-bold mb-4 font-display">
              My <GlitchText text="Certificates" />
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A collection of my certifications and achievements.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {displayedCertificates.map((cert, index) => (
              <CertificateCard
                key={index}
                certificate={cert}
                index={index}
                onViewClick={handleViewClick}
              />
            ))}
          </div>

          {/* Show More/Less Button */}
          {hasMore && (
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => setShowAll(!showAll)}
                className="group flex items-center gap-3 px-8 py-4 bg-accent/10 hover:bg-accent/20 border-2 border-accent/40 hover:border-accent/60 rounded-xl font-semibold text-accent transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{showAll ? 'Show Less' : 'Show More Certificates'}</span>
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </motion.svg>
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      <CertificateModal
        certificate={selectedCertificate}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default Certificates;
