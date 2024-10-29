import React from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface WishlistItem {
  id: number
  title: string
  description: string
  price: string
}

interface WishlistModalProps {
  isOpen: boolean
  onClose: () => void
  wishlistItems: WishlistItem[]
}

export default function WishlistModal({ isOpen, onClose, wishlistItems }: WishlistModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Wishlist</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Courses you've added to your wishlist</p>
          {wishlistItems.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Your wishlist is empty</p>
          ) : (
            <ul className="space-y-4">
              {wishlistItems.map((item) => (
                <li key={item.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                  <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mt-2">{item.price}</p>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}