import { Home, Briefcase, FileText, User, X, LogOut } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <motion.div 
      initial={{ x: 0 }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary-600 text-white transform lg:relative lg:translate-x-0`}
    >
      <div className="flex justify-between items-center p-4">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold"
        >
          LOGO
        </motion.h2>
        <button onClick={onClose} className="lg:hidden text-white">
          <X size={24} />
        </button>
      </div>
      <nav className="mt-8">
        <SidebarItem href="/" icon={<Home />} text="Dashboard" />
        <SidebarItem href="/portfolio" icon={<Briefcase />} text="Portfolio" />
        <SidebarItem href="/inputs" icon={<FileText />} text="Inputs" />
        <SidebarItem href="/profile" icon={<User />} text="Profile" />
      </nav>
      <div className="mt-auto p-4">
        <button
          onClick={() => {/* Add logout functionality here */}}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </button>
      </div>
    </motion.div>
  )
}

function SidebarItem({ href, icon, text }: { href: string, icon: React.ReactNode, text: string }) {
  return (
    <Link href={href} className="flex items-center p-4 hover:bg-primary-700 transition-colors duration-200">
      
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center"
      >
        {icon}
        <span className="ml-4">{text}</span>
      </motion.div>
    </Link>
  )
}