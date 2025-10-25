'use client'

import { ReactNode, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = open ? 'hidden' : 'unset'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [open, onOpenChange])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-premium shadow-premium max-h-[90vh] overflow-y-auto"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

interface DialogHeaderProps {
  children: ReactNode
  onClose?: () => void
}

export function DialogHeader({ children, onClose }: DialogHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b">
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}

interface DialogContentProps {
  children: ReactNode
}

export function DialogContent({ children }: DialogContentProps) {
  return <div className="p-6">{children}</div>
}

interface DialogFooterProps {
  children: ReactNode
}

export function DialogFooter({ children }: DialogFooterProps) {
  return (
    <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-premium">
      {children}
    </div>
  )
}