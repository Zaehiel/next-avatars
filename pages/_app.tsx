import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navigation from '../components/Navigation'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navigation />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
