import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, BotMessageSquare } from 'lucide-react';

// Remove TF-IDF implementation as it will be replaced by Gemini API
// const documents = [];
// const docMap = new Map();
// ... (rest of TF-IDF related code)



import { knowledgeBase } from '../../data/knowledgeBase';
import { projects } from '../../data/projects';
import { skills } from '../../data/skills';
import { timelineEvents } from '../../data/timeline';

// Function to generate answer from local knowledge base
const getAnswerFromKnowledgeBase = (question, kb) => {
  const lowerQuestion = question.toLowerCase();

  // --- 1. Specific Personal Questions (Name, University, Goal, etc.) ---

  if (lowerQuestion.includes('name') || lowerQuestion.includes('who are you')) {
    return `My name is ${kb.personalInfo.name}. I am a ${kb.personalInfo.title}.`;
  }

  if (lowerQuestion.includes('university') || lowerQuestion.includes('campus') || lowerQuestion.includes('uni')) {
    return `I am currently studying at ${kb.personalInfo.university}.`;
  }

  if (lowerQuestion.includes('degree') || lowerQuestion.includes('major') || lowerQuestion.includes('studying')) {
    return `I am pursuing a ${kb.personalInfo.degree} with a focus on ${kb.personalInfo.focus}.`;
  }

  if (lowerQuestion.includes('college') || lowerQuestion.includes('school')) {
    // Look for previous education in timeline
    const college = timelineEvents.find(e => e.organization.toLowerCase().includes('college') || e.title.toLowerCase().includes('college'));
    if (college) {
      return `I attended ${college.organization}. ${college.description}`;
    }
    return `I attended Siridhamma College before joining university.`;
  }

  if (lowerQuestion.includes('goal') || lowerQuestion.includes('ambition') || lowerQuestion.includes('aim')) {
    return kb.about.goals || `My goal is to leverage AI and machine learning to build innovative solutions that impact society positively.`;
  }

  if (lowerQuestion.includes('doing') || lowerQuestion.includes('current') || lowerQuestion.includes('now') || lowerQuestion.includes('status')) {
    // Find the most recent timeline event based on year (assuming sorted or we find max year)
    // For simplicity, let's use the layout of timelineEvents which usually has recent at bottom or top. 
    // Let's explicitly check the latest entry or knowledgeBase focus.
    return `Currently, I am a ${kb.personalInfo.title}, focusing on ${kb.personalInfo.focus}. I am also working on various projects like ${projects[0].title}.`;
  }

  // --- 2. Dynamic Project Questions ---
  // Check if the user is asking about a specific project by name
  for (const project of projects) {
    if (lowerQuestion.includes(project.title.toLowerCase())) {
      return `**${project.title}** is a ${project.category} project. ${project.description} Technologies used: ${project.technologies.join(', ')}.`;
    }
  }

  if (lowerQuestion.includes('projects') || lowerQuestion.includes('work') || lowerQuestion.includes('built') || lowerQuestion.includes('portfolio')) {
    const projectNames = projects.map(p => p.title).join(', ');
    return `I have worked on several exciting projects, including: ${projectNames}. Ask me about any of them!`;
  }

  // --- 3. Dynamic Skill Questions ---
  // Check if the user is asking about a specific skill
  for (const skill of skills) {
    if (lowerQuestion.includes(skill.name.toLowerCase())) {
      return `Yes, I have experience with **${skill.name}**. I would rate my skill level as ${skill.level}/100. ${skill.description ? skill.description : ''}`;
    }
  }

  if (lowerQuestion.includes('skills') || lowerQuestion.includes('stack') || lowerQuestion.includes('technologies') || lowerQuestion.includes('tech')) {
    const topSkills = skills.filter(s => s.level >= 70).map(s => s.name).slice(0, 5).join(', ');
    return `I am proficient in various technologies. My top skills include ${topSkills}, and many more in AI/ML, Web Development, and IoT.`;
  }

  // --- 4. Experience & Timeline ---
  if (lowerQuestion.includes('experience') || lowerQuestion.includes('background') || lowerQuestion.includes('journey') || lowerQuestion.includes('timeline')) {
    return `I have about ${kb.personalInfo.experienceYears} years of experience. My journey started with ${timelineEvents[0].title} in ${timelineEvents[0].year} and has evolved into ${kb.personalInfo.focus}.`;
  }

  // --- 5. Contact Info ---
  if (lowerQuestion.includes('contact') || lowerQuestion.includes('email') || lowerQuestion.includes('reach') || lowerQuestion.includes('hire')) {
    return `You can reach me via email at ${kb.personalInfo.email}. You can also find me on LinkedIn and GitHub!`;
  }

  // --- 6. Resume / CV ---
  if (lowerQuestion.includes('resume') || lowerQuestion.includes('cv') || lowerQuestion.includes('download')) {
    return `You can download my CV from the 'Download CV' button in the Hero section, or ask for my email to get in touch!`;
  }

  // --- 7. General Greetings ---
  if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
    return `Hello! I'm ${kb.personalInfo.name}'s AI assistant. How can I help you today?`;
  }

  if (lowerQuestion.includes('thank') || lowerQuestion.includes('thanks')) {
    return "You're welcome! Let me know if you have any other questions.";
  }

  if (lowerQuestion.includes('bye') || lowerQuestion.includes('goodbye')) {
    return "Goodbye! Have a great day!";
  }

  // --- 8. Fallback ---
  return "I'm not sure about that. Try asking about my **projects**, **skills**, **education**, or **contact** info!";
};

const ChatbotAssistant = ({ isChatbotOpen, setIsChatbotOpen, setIsSocialLinksOpen }) => {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      parts: [{ text: `Hi! I'm Kisal's AI assistant. Ask me anything about his skills, projects, or experience!` }],
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  const quickReplies = [
    'What are your skills?',
    'Tell me about projects',
    'How can I contact you?',
    'What is your experience?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      role: 'user',
      parts: [{ text: inputValue }],
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setErrorMessage('');

    try {
      const botResponseText = getAnswerFromKnowledgeBase(userMessage.parts[0].text, knowledgeBase);
      const botResponse = {
        role: 'bot',
        parts: [{ text: botResponseText }],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error generating response:", error);
      setErrorMessage("Failed to generate a response. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (reply) => {
    setInputValue(reply);
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => {
          setIsChatbotOpen(!isChatbotOpen);
          if (!isChatbotOpen) {
            setIsSocialLinksOpen(false);
          }
        }}
        className="fixed right-8 bottom-8 z-50 p-4 bg-accent text-surface rounded-full shadow-lg hover:shadow-accent/50 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
      >
        {isChatbotOpen ? <X size={24} /> : <BotMessageSquare size={24} />}

        {/* Notification Badge */}
        {!isChatbotOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-highlight rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div
            className="fixed right-8 bottom-[6.5rem] z-50 w-[90vw] max-w-md bg-surface shadow-2xl border border-[#00d9ff]/20 overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#00d9ff] to-[#4dfffe] p-4 flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Bot size={24} className="text-surface" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-text-primary">Portfolio Assistant</h3>
                <p className="text-xs text-surface/80">Always here to help</p>
              </div>
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>



            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-4 bg-surface bg-surface">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`} // Changed type to role
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.role === 'user'
                        ? 'bg-[#00d9ff]'
                        : 'bg-gradient-to-r from-[#00d9ff] to-[#4dfffe]'
                      }`}>
                      {message.role === 'user' ? (
                        <User size={16} className="text-surface" />
                      ) : (
                        <Bot size={16} className="text-surface" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className={`px-4 py-2 rounded-2xl ${message.role === 'user'
                        ? 'bg-[#00d9ff] text-surface'
                        : 'bg-surface dark:bg-slate-700 text-gray-900 text-text-primary'
                      }`}>
                      <p className="text-sm whitespace-pre-line">{message.parts[0].text}</p> {/* Changed message.text to message.parts[0].text */}
                      <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-surface/70' : 'text-gray-500'
                        }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00d9ff] to-[#4dfffe] flex items-center justify-center">
                    <Bot size={16} className="text-surface" />
                  </div>
                  <div className="bg-surface">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={'dot-' + i}
                          className="w-2 h-2 bg-gray-500 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="p-3 bg-surface bg-surface border-t border-[#00d9ff]/20">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-1 text-xs bg-[#00d9ff]/10 hover:bg-[#00d9ff]/20 text-[#00d9ff] dark:text-[#00d9ff] rounded-full border border-[#00d9ff]/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-surface dark:bg-slate-900 border-t border-[#00d9ff]/20">
              {errorMessage && (
                <p className="text-sm text-red-500 mb-2">{errorMessage}</p>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 bg-surface bg-surface border border-[#00d9ff]/20 rounded-full text-sm focus:outline-none focus:border-[#00d9ff] transition-colors"
                  disabled={isTyping} // Disable input when bot is typing
                />
                <motion.button
                  onClick={handleSend}
                  className="p-2 bg-gradient-to-r from-[#00d9ff] to-[#4dfffe] text-surface rounded-full hover:shadow-lg transition-all disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputValue.trim() || isTyping} // Disable send if input is empty or bot is typing
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotAssistant;