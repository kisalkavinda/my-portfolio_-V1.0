import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = "Search projects..." }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        // Debounce search
        const timer = setTimeout(() => {
            onSearch(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, onSearch]);

    // Keyboard shortcut (Cmd/Ctrl + K)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('project-search')?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleClear = () => {
        setSearchTerm('');
    };

    return (
        <motion.div
            className="relative w-full max-w-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative">
                {/* Search Icon */}
                <motion.div
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-text-primary/50"
                    animate={isFocused ? { scale: 1.1, color: 'var(--accent)' } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <Search size={20} />
                </motion.div>

                {/* Input Field */}
                <input
                    id="project-search"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-12 py-3 bg-surface/30 backdrop-blur-sm border-2 border-accent/20 rounded-lg text-text-primary placeholder-text-primary/40 focus:outline-none focus:border-accent transition-all duration-300"
                    style={{
                        boxShadow: isFocused ? '0 0 20px var(--accent-40)' : 'none'
                    }}
                />

                {/* Clear Button */}
                <AnimatePresence>
                    {searchTerm && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            onClick={handleClear}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-primary/50 hover:text-accent transition-colors"
                            whileHover={{ scale: 1.2, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X size={20} />
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Keyboard Hint */}
                {!isFocused && !searchTerm && (
                    <motion.div
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-primary/30 bg-surface/50 px-2 py-1 rounded border border-accent/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        ⌘K
                    </motion.div>
                )}
            </div>

            {/* Focus Glow Effect */}
            <AnimatePresence>
                {isFocused && (
                    <motion.div
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            background: 'radial-gradient(circle at center, var(--accent-20), transparent 70%)',
                            filter: 'blur(10px)',
                            zIndex: -1
                        }}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SearchBar;
