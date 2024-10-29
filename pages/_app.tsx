import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <AnimatePresence initial={false}>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default MyApp