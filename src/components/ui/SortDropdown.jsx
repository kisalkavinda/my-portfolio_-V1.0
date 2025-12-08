import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpDown, Check } from 'lucide-react';

const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'a-z', label: 'A to Z' },
    { value: 'z-a', label: 'Z to A' }
];

const SortDropdown = ({ onSort, currentSort = 'newest' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value) => {
        onSort(value);
        setIsOpen(false);
    };

    const currentLabel = sortOptions.find(opt => opt.value === currentSort)?.label || 'Sort';

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-3 bg-surface/30 backdrop-blur-sm border-2 border-accent/20 rounded-lg text-text-primary hover:border-accent transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                    boxShadow: isOpen ? '0 0 20px var(--accent-40)' : 'none'
                }}
            >
                <motion.div
                    animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ArrowUpDown size={18} />
                </motion.div>
                <span className="text-sm font-medium">{currentLabel}</span>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 right-0 w-48 bg-surface/95 backdrop-blur-md border-2 border-accent/30 rounded-lg overflow-hidden shadow-lg z-50"
                        style={{
                            boxShadow: '0 10px 40px var(--accent-40)'
                        }}
                    >
                        {sortOptions.map((option, index) => (
                            <motion.button
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className={`w-full px-4 py-3 text-left text-sm flex items-center justify-between transition-colors ${currentSort === option.value
                                        ? 'bg-accent/20 text-accent'
                                        : 'text-text-primary hover:bg-accent/10'
                                    }`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ x: 5 }}
                            >
                                <span>{option.label}</span>
                                {currentSort === option.value && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500 }}
                                    >
                                        <Check size={16} />
                                    </motion.div>
                                )}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SortDropdown;
