'use client';

import React, { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import Sidebar from './Sidebar';
import ChatInterface from './ChatInterface';
import Header from './Header';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainLayout() {
  const { isSidebarOpen, toggleSidebar } = useApp();

  // Close sidebar on window resize to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isSidebarOpen) {
        toggleSidebar();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen, toggleSidebar]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop Sidebar - Always visible on large screens */}
        <aside className="hidden lg:block w-80 flex-shrink-0 overflow-hidden">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar - Slide-out drawer */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={toggleSidebar}
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                aria-hidden="true"
              />

              {/* Drawer */}
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] z-50 shadow-2xl"
                role="dialog"
                aria-label="Settings sidebar"
              >
                <Sidebar />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <main className="flex-1 overflow-hidden">
          <ChatInterface />
        </main>
      </div>
    </div>
  );
}
