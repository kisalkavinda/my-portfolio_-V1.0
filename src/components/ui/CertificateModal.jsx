import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';

const CertificateModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-24"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: -20 }}
          className="bg-[#0a0a0a] dark:bg-[#000000] rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col relative border-2 border-[var(--border)] shadow-2xl shadow-[0_0_15px_rgba(var(--accent-rgb),0.6),_0_0_30px_rgba(var(--accent-rgb),0.4)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex justify-between items-center p-4 border-b border-[var(--border)]"
          >
            <h3 className="text-lg font-bold text-[var(--accent)]">{certificate.title}</h3>
            <div className="flex items-center gap-4">
              <a
                href={certificate.pdf}
                download={`${certificate.title}.pdf`}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] hover:bg-[var(--cyan-bright)] text-surface rounded-lg font-semibold transition-all text-sm"
              >
                <Download size={16} />
                Download PDF
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#0a0a0a] dark:hover:bg-[#0a0a0a] transition-colors"
              >
                <X size={24} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex-grow overflow-y-hidden px-4 py-10 max-w-2xl mx-auto"
          >              <img
              src={certificate.image}
              alt={`Certificate for ${certificate.title}`}
              className="w-full h-auto object-contain rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            />                                        </motion.div>

          {/* Explicit Spacer */}
          <div className="h-8"></div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CertificateModal;
