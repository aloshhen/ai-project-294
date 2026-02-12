import { SafeIcon } from './components/SafeIcon';
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Menu,
  X,
  Hexagon,
  Triangle,
  Pentagon,
} from 'lucide-react'

// Sparkline Chart Component
const SparklineChart = ({ data, color = '#6366f1', isPositive = true }) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 100
    return `${x},${y}`
  }).join(' ')

  const chartColor = isPositive ? '#10b981' : '#ef4444'

  return (
    <svg viewBox="0 0 100 100" className="w-full h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={chartColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={chartColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,100 ${points} 100,100`}
        fill={`url(#gradient-${color})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={chartColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Top 10 Coins Data
const topCoins = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: '$67,432.00',
    marketCap: '$1.32T',
    change: '+5.23%',
    isPositive: true,
    description: 'The pioneering cryptocurrency that started the digital revolution.',
    chartData: [45, 52, 48, 55, 58, 62, 59, 65, 63, 67],
    useProvidedSvg: true,
    svgUrl: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/edit-svg-1770904197-3570.svg?'
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    price: '$3,542.00',
    marketCap: '$425.8B',
    change: '+3.87%',
    isPositive: true,
    description: 'Smart contract platform powering decentralized applications.',
    chartData: [40, 42, 45, 43, 48, 52, 50, 54, 53, 55],
    useProvidedSvg: true,
    svgUrl: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/edit-svg-1770904191-3463.svg?'
  },
  {
    id: 3,
    name: 'Solana',
    symbol: 'SOL',
    price: '$178.50',
    marketCap: '$81.2B',
    change: '+12.45%',
    isPositive: true,
    description: 'High-performance blockchain for fast, secure transactions.',
    chartData: [30, 35, 32, 40, 45, 42, 48, 52, 55, 58],
    useProvidedSvg: true,
    svgUrl: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/edit-svg-1770904168-2210.svg?'
  },
  {
    id: 4,
    name: 'Cardano',
    symbol: 'ADA',
    price: '$0.58',
    marketCap: '$20.4B',
    change: '-2.15%',
    isPositive: false,
    description: 'Research-driven blockchain with peer-reviewed technology.',
    chartData: [50, 48, 52, 45, 47, 43, 46, 42, 44, 40],
    useProvidedSvg: true,
    svgUrl: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/edit-svg-1770904161-3098.svg?'
  },
  {
    id: 5,
    name: 'Polkadot',
    symbol: 'DOT',
    price: '$7.82',
    marketCap: '$11.2B',
    change: '+1.34%',
    isPositive: true,
    description: 'Multi-chain network enabling cross-blockchain transfers.',
    chartData: [35, 38, 36, 40, 42, 41, 45, 44, 47, 48],
    icon: 'hexagon'
  },
  {
    id: 6,
    name: 'Chainlink',
    symbol: 'LINK',
    price: '$18.95',
    marketCap: '$11.8B',
    change: '+8.67%',
    isPositive: true,
    description: 'Decentralized oracle network connecting smart contracts.',
    chartData: [25, 28, 32, 30, 35, 38, 36, 42, 45, 48],
    icon: 'link'
  },
  {
    id: 7,
    name: 'Avalanche',
    symbol: 'AVAX',
    price: '$35.40',
    marketCap: '$13.6B',
    change: '-1.23%',
    isPositive: false,
    description: 'Blazingly fast smart contracts platform with low fees.',
    chartData: [45, 48, 44, 46, 42, 45, 41, 43, 40, 38],
    icon: 'triangle'
  },
  {
    id: 8,
    name: 'Polygon',
    symbol: 'MATIC',
    price: '$0.72',
    marketCap: '$7.1B',
    change: '+4.56%',
    isPositive: true,
    description: 'Ethereum scaling solution for faster, cheaper transactions.',
    chartData: [30, 32, 35, 33, 38, 40, 42, 45, 47, 50],
    icon: 'pentagon'
  },
  {
    id: 9,
    name: 'Uniswap',
    symbol: 'UNI',
    price: '$9.85',
    marketCap: '$5.9B',
    change: '-0.87%',
    isPositive: false,
    description: 'Leading decentralized exchange protocol for token swapping.',
    chartData: [40, 42, 38, 41, 39, 37, 40, 38, 36, 35],
    icon: 'arrow-left-right'
  },
  {
    id: 10,
    name: 'Aave',
    symbol: 'AAVE',
    price: '$128.00',
    marketCap: '$1.9B',
    change: '+6.78%',
    isPositive: true,
    description: 'Decentralized lending protocol for earning interest.',
    chartData: [30, 32, 35, 38, 36, 42, 45, 48, 52, 55],
    useProvidedSvg: true,
    svgUrl: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/edit-svg-1770904174-9516.svg?'
  }
]

// Advantages Data
const advantages = [
  {
    icon: 'shield',
    title: 'Decentralized Security',
    description: 'No single point of failure. Your assets are secured by thousands of nodes worldwide.'
  },
  {
    icon: 'zap',
    title: 'Lightning Fast',
    description: 'Transactions settle in minutes, not days. 24/7 availability with no banking hours.'
  },
  {
    icon: 'globe',
    title: 'Global Access',
    description: 'Send money anywhere in the world instantly with minimal fees.'
  },
  {
    icon: 'lock',
    title: 'Full Ownership',
    description: 'Be your own bank. True ownership of your assets with private keys.'
  },
  {
    icon: 'bar-chart-3',
    title: 'Transparency',
    description: 'Every transaction is recorded on the public blockchain for complete auditability.'
  },
  {
    icon: 'wallet',
    title: 'Financial Freedom',
    description: 'No intermediaries, no censorship, no frozen accounts. Pure financial sovereignty.'
  }
]

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCoin, setActiveCoin] = useState(null)

  const heroRef = useRef(null)
  const coinsRef = useRef(null)
  const advantagesRef = useRef(null)
  const aboutRef = useRef(null)

  const isHeroInView = useInView(heroRef, { once: true })
  const isCoinsInView = useInView(coinsRef, { once: true })
  const isAdvantagesInView = useInView(advantagesRef, { once: true })
  const isAboutInView = useInView(aboutRef, { once: true })

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-xl z-50 border-b border-indigo-500/20">
        <nav className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <SafeIcon name="bitcoin" className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold font-mono">
              Crypto<span className="gradient-text">Vision</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-indigo-400 transition-colors font-medium">
              About
            </button>
            <button onClick={() => scrollToSection('coins')} className="text-gray-300 hover:text-indigo-400 transition-colors font-medium">
              Top 10 Coins
            </button>
            <button onClick={() => scrollToSection('advantages')} className="text-gray-300 hover:text-indigo-400 transition-colors font-medium">
              Advantages
            </button>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-lg font-semibold transition-all transform hover:scale-105 neon-border">
              Start Trading
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <SafeIcon name={mobileMenuOpen ? 'x' : 'menu'} size={24} />
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-b border-indigo-500/20"
            >
              <div className="flex flex-col p-4 gap-4">
                <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-indigo-400 transition-colors py-2 text-left">
                  About
                </button>
                <button onClick={() => scrollToSection('coins')} className="text-gray-300 hover:text-indigo-400 transition-colors py-2 text-left">
                  Top 10 Coins
                </button>
                <button onClick={() => scrollToSection('advantages')} className="text-gray-300 hover:text-indigo-400 transition-colors py-2 text-left">
                  Advantages
                </button>
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold">
                  Start Trading
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section
        id="about"
        ref={heroRef}
        className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-6"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isHeroInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-2 mb-8"
            >
              <SafeIcon name="sparkles" size={16} className="text-indigo-400" />
              <span className="text-indigo-300 font-mono text-sm">The Future of Finance is Here</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
              <span className="block text-white">Decentralized</span>
              <span className="block gradient-text neon-text mt-2">Digital Future</span>
            </h1>

            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover the top-performing cryptocurrencies reshaping global finance.
              Real-time data, expert insights, and powerful tools for traders and investors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all flex items-center gap-2 neon-border min-w-[200px] justify-center"
              >
                Explore Top Coins
                <ChevronRight size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/5 hover:bg-white/10 border border-indigo-500/30 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all backdrop-blur-sm min-w-[200px]"
              >
                Learn More
              </motion.button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-20 max-w-4xl mx-auto"
            >
              {[
                { value: '$2.8T', label: 'Market Cap' },
                { value: '24/7', label: 'Trading' },
                { value: '10K+', label: 'Cryptocurrencies' },
                { value: '300M+', label: 'Users Worldwide' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-black gradient-text mb-1">{stat.value}</div>
                  <div className="text-gray-500 text-sm md:text-base font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Top 10 Coins Section */}
      <section
        id="coins"
        ref={coinsRef}
        className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCoinsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              Top 10 <span className="gradient-text">Cryptocurrencies</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              The most valuable digital assets by market capitalization.
              Real-time prices, charts, and comprehensive analysis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topCoins.map((coin, index) => (
              <motion.div
                key={coin.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isCoinsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                onHoverStart={() => setActiveCoin(coin.id)}
                onHoverEnd={() => setActiveCoin(null)}
                className="glass-card rounded-2xl p-6 hover:border-indigo-500/50 transition-all cursor-pointer group relative overflow-hidden"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/10 group-hover:to-purple-600/10 transition-all duration-500" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/30">
                        {coin.useProvidedSvg ? (
                          <img
                            src={coin.svgUrl}
                            alt={coin.name}
                            className="w-8 h-8 object-contain filter brightness-0 invert-[0.9] drop-shadow-[0_0_8px_rgba(99,102,241,0.8)] hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.9)] transition-all duration-300"
                          />
                        ) : (
                          <div className="w-8 h-8 flex items-center justify-center">
                            {coin.icon === 'zap' && <SafeIcon name="zap" size={24} className="text-yellow-400" />}
                            {coin.icon === 'circle' && <div className="w-6 h-6 rounded-full bg-blue-500" />}
                            {coin.icon === 'hexagon' && <Hexagon size={24} className="text-pink-400" />}
                            {coin.icon === 'link' && <SafeIcon name="trending-up" size={24} className="text-blue-400" />}
                            {coin.icon === 'triangle' && <Triangle size={24} className="text-red-400" />}
                            {coin.icon === 'pentagon' && <Pentagon size={24} className="text-purple-400" />}
                            {coin.icon === 'arrow-left-right' && <ArrowUpRight size={24} className="text-pink-400" />}
                            {coin.icon === 'ghost' && <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{coin.name}</h3>
                        <span className="text-gray-500 font-mono text-sm">{coin.symbol}</span>
                      </div>
                    </div>
                    <span className={`font-mono text-sm font-semibold px-2 py-1 rounded-lg ${coin.isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {coin.change}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="text-2xl font-black font-mono">{coin.price}</div>
                    <div className="text-gray-500 text-sm">MCap: {coin.marketCap}</div>
                  </div>

                  {/* Chart */}
                  <div className="mb-4 -mx-2">
                    <SparklineChart data={coin.chartData} isPositive={coin.isPositive} />
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {coin.description}
                  </p>

                  {/* Action */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: activeCoin === coin.id ? 1 : 0, y: activeCoin === coin.id ? 0 : 10 }}
                    className="mt-4 pt-4 border-t border-indigo-500/20"
                  >
                    <button className="w-full bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-400 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                      View Details
                      <ArrowUpRight size={16} />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section
        id="advantages"
        ref={advantagesRef}
        className="relative z-10 py-20 md:py-32 px-4 md:px-6"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isAdvantagesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              Why Choose <span className="gradient-text">Crypto?</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Discover the revolutionary advantages of decentralized digital assets
              over traditional finance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isAdvantagesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="glass-card rounded-2xl p-8 hover:border-indigo-500/40 transition-all group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-shadow">
                  <SafeIcon name={advantage.icon} size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">
                  {advantage.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 md:py-32 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 md:p-16 text-center relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Ready to Start Your <br />
                <span className="gradient-text">Crypto Journey?</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                Join millions of traders and investors worldwide.
                Get real-time data, advanced charts, and expert insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all neon-border flex items-center justify-center gap-2"
                >
                  Get Started Free
                  <ArrowUpRight size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/5 hover:bg-white/10 border border-white/20 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all backdrop-blur-sm"
                >
                  View Demo
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-950 border-t border-indigo-500/20 py-12 px-4 md:px-6 telegram-safe-bottom">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <SafeIcon name="bitcoin" className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold font-mono">
                Crypto<span className="gradient-text">Vision</span>
              </span>
            </div>

            <div className="flex gap-8 text-gray-400">
              <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Contact</a>
            </div>

            <div className="text-gray-500 text-sm">
              © 2024 CryptoVision. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App