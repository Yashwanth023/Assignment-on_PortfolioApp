import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar'
import WishlistModal from './Wishlistmodal'
import { Menu, Bell, User, Sun, Moon, Heart } from 'lucide-react'
import { useTheme } from 'next-themes'

// Mock wishlist data (replace with actual data management in a real app)
const mockWishlistItems = [
  { id: 1, title: "Advanced React Course", description: "Learn advanced React concepts", price: "$99.99" },
  { id: 2, title: "Node.js Masterclass", description: "Become a Node.js expert", price: "$79.99" },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1">
        <header className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md p-4 flex justify-between items-center`}>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`lg:hidden text-gray-500 hover:text-gray-700 ${theme === 'dark' ? 'text-gray-300 hover:text-gray-100' : ''}`}
            >
              <Menu size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} hover:bg-gray-200`}
            >
              <Bell size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} hover:bg-gray-200`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setWishlistOpen(true)}
              className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} hover:bg-gray-200`}
            >
              <Heart size={20} />
            </motion.button>
          </div>
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} hidden md:inline`}>Yashwanth N</span>
              <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-primary-400' : 'bg-primary-500'} flex items-center justify-center text-white`}>
                <User size={20} />
              </div>
            </motion.div>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
      <WishlistModal
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistItems={mockWishlistItems}
      />
    </div>
  )
}