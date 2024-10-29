import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Layout from '../components/Layout'
import PortfolioItem from '../components/PortfolioItem'
import { Shimmer } from '../components/Shimmer'
import { Filter, Search } from 'lucide-react'

interface PortfolioItemType {
  id: number
  title: string
  description: string
  image: string
  price: string
}

export default function Home() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItemType[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('Project')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/portfolio')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data')
        }
        return response.json()
      })
      .then(data => {
        setPortfolioItems(data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching portfolio data:', error)
        setError('Failed to load portfolio items. Please try again later.')
        setIsLoading(false)
      })
  }, [])

  const filteredItems = portfolioItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout>
      <Toaster position="bottom-right" />
      <div className="mb-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4 text-gray-800"
        >
          Portfolio
        </motion.h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex space-x-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {['Project', 'Saved', 'Shared', 'Achievement'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-sm font-medium pb-2 ${activeTab === tab ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </motion.button>
            ))}
          </div>
          <div className="flex items-center w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search a project"
                className="w-full border rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-primary-600 transition-colors duration-200"
            >
              <Filter size={20} />
            </motion.button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, index) => (
            <Shimmer key={index} className="h-48" />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {filteredItems.map(item => (
            <PortfolioItem key={item.id} {...item} />
          ))}
        </motion.div>
      )}
    </Layout>
  )
}