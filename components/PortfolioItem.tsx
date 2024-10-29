import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart } from 'lucide-react'
import { useRouter } from 'next/router'

interface PortfolioItemProps {
  id: number
  title: string
  description: string
  image: string
  price: string
}

export default function PortfolioItem({ id, title, description, image, price }: PortfolioItemProps) {
  const router = useRouter()

  const handleAddToCart = () => {
    router.push(`/checkout/${id}`)
  }

  const handleAddToWishlist = () => {
    // Implement wishlist functionality
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Image src={image} alt={title} width={200} height={150} className="h-48 w-full object-cover md:w-48" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-primary-600 dark:text-primary-400 font-semibold">{price}</div>
          <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black dark:text-white hover:underline">{title}</a>
          <p className="mt-2 text-gray-500 dark:text-gray-400">{description}</p>
          <div className="mt-4 flex space-x-3">
            <button 
              onClick={handleAddToCart}
              className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </button>
            <button 
              onClick={handleAddToWishlist}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Heart className="mr-2 h-4 w-4" />
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}