import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, User, MessageSquare, Facebook } from 'lucide-react'
import { personalInfo } from '../../data/personalInfo'
import Swal from 'sweetalert2'
import GlitchText from '../common/GlitchText'


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // IMPORTANT: For FormSubmit.co to work, you MUST verify your email after your first submission.
      // Replace personalInfo.email below with your actual verified FormSubmit.co endpoint if it's a unique hash,
      // otherwise, ensure the email in personalInfo.email matches your verified FormSubmit.co email.
      const response = await fetch(`https://formspree.io/f/mldqwqqo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Your message has been sent successfully!',
          icon: 'success',
          confirmButtonColor: '#00d9ff',
          background: '#0a0a0a',
          color: '#c0c0c0'
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error('Failed to send')
      }
    } catch (_error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to send message. Please try again.',
        icon: 'error',
        confirmButtonColor: '#00d9ff',
        background: '#0a0a0a',
        color: '#c0c0c0'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: <Mail size={24} className="text-accent" />,
      label: 'Email Me',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'hover:bg-accent/10'
    },
    {
      icon: <Github size={24} className="text-accent" />,
      label: 'GitHub',
      value: personalInfo.github.split('/').pop(),
      href: personalInfo.github,
      color: 'hover:bg-accent/10'
    },
    {
      icon: <Linkedin size={24} className="text-accent" />,
      label: 'LinkedIn',
      value: 'Connect with me',
      href: personalInfo.linkedin,
      color: 'hover:bg-accent/10'
    },
    {
      icon: <Facebook size={24} className="text-accent" />,
      label: 'Facebook',
      value: personalInfo.facebook.split('/').pop(),
      href: personalInfo.facebook,
      color: 'hover:bg-accent/10'
    },
    {
      icon: <MapPin size={24} className="text-accent" />,
      label: 'Location',
      value: personalInfo.location,
      href: '#',
      color: 'hover:bg-accent/10'
    }
  ]

  return (
    <section id="contact" className="px-4 py-20 relative overflow-hidden">
      {/* Separator line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-75 blur-sm z-0" />

      {/* Full section gradient overlay - transparent top, visible bottom */}
      <div className="absolute inset-0 pointer-events-none z-0 dark:bg-gradient-to-b dark:from-transparent dark:via-black/25 dark:to-black/55" />
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.h2
          className="relative text-4xl md:text-5xl font-bold mb-12 text-center font-display"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get In <GlitchText text="Touch" />
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Contact Form */}
          <motion.div
            className="h-full flex"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-slate-100 bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-[#00d9ff]/20 flex-grow flex flex-col">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Send className="w-6 h-6 text-[#00d9ff]" />
                Send Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
                {/* Name Input */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-white">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-[#00d9ff]/20 rounded-lg text-white placeholder:text-white/70 focus:outline-none focus:border-[#00d9ff] transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-white">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-[#00d9ff]/20 rounded-lg text-white placeholder:text-white/70 focus:outline-none focus:border-[#00d9ff] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-white">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-[#00d9ff]/20 rounded-lg text-white placeholder:text-white/70 focus:outline-none focus:border-[#00d9ff] transition-colors resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#00d9ff] hover:bg-[#4dfffe] disabled:bg-[#00d9ff]/50 text-surface rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right Column - Contact Methods */}
          <motion.div
            className="h-full flex"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-slate-100 bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-[#00d9ff]/20 flex-grow">
              <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
              <p className="text-white mb-8">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : '_self'}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className={`flex items-center gap-4 p-4 bg-slate-400/20 bg-surface/30 rounded-xl border border-[#00d9ff]/20 transition-all ${method.color} group`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="flex-shrink-0">
                      {method.icon}
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold text-white group-hover:text-[#00d9ff] transition-colors">
                        {method.label}
                      </div>
                      <div className="text-sm text-white">
                        {method.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Info (Quick Response box) */}
        <motion.div
          className="bg-gradient-to-br from-[#00d9ff]/10 to-[#4dfffe]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#00d9ff]/20 max-w-md mx-auto mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h4 className="text-lg font-bold mb-4">Quick Response</h4>
          <p className="text-sm text-white">
            I typically respond within 24-48 hours. For urgent inquiries, feel free to connect with me on LinkedIn.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact