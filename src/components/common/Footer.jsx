import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Github, Linkedin, Mail, ArrowUp, Facebook } from 'lucide-react'
import { personalInfo } from '../../data/personalInfo'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, url: personalInfo.github, label: 'GitHub' },
    { icon: Linkedin, url: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: Mail, url: `mailto:${personalInfo.email}`, label: 'Email' },
    { icon: Facebook, url: personalInfo.facebook, label: 'Facebook' }
  ]

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ]

  return (
    <footer className="relative border-t-2 border-[#00d9ff]/40 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#00d9ff] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-highlight rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#00d9ff] to-[#4dfffe] bg-clip-text text-transparent mb-4">
              {personalInfo.name.split(' ')[0]}
            </h3>
            <p className="text-[var(--text-secondary)] dark:text-gray-400 mb-4">
              {personalInfo.title}
            </p>
            <p className="text-sm text-[var(--text-muted)] dark:text-gray-500">
              {personalInfo.location}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[var(--text-secondary)] dark:text-gray-400 hover:text-[#00d9ff] transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[var(--bg-card)] dark:bg-[#0a0a0a]/50 rounded-lg border-2 border-[#00d9ff]/40 hover:border-[#00d9ff]/50 hover:bg-[#00d9ff]/10 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} className="text-[#00d9ff]" />
                </motion.a>
              ))}
            </div>

            {/* Newsletter/Contact CTA */}
            <motion.a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#00d9ff] hover:bg-[#4dfffe] rounded-lg text-sm font-semibold text-black transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
              <ArrowUp size={16} className="rotate-45" />
            </motion.a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#00d9ff]/20 pt-8">          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <motion.p
            className="text-gray-500 dark:text-gray-400 text-sm text-center md:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            © {currentYear} {personalInfo.name}. All rights reserved.
          </motion.p>

          {/* Made with Love - Unique Personal Touch */}
          <motion.p
            className="text-sm text-gray-400 dark:text-gray-500 flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Built with
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart size={16} className="text-red-500 fill-current" />
            </motion.span>
            and too much coffee ☕ | Deployed {currentYear}
          </motion.p>
        </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer