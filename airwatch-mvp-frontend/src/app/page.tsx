"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Wind, Leaf, TrendingDown, Activity } from "lucide-react";
import HeaderBar from "../components/HeaderBar";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <HeaderBar />
      <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-emerald-800/60 to-teal-700/70" />
        
        {/* Animated particles/elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: '0.5rem',
                height: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
              }}
              initial={{
                x: Math.random() * 1920,
                y: Math.random() * 1080,
              }}
              animate={{
                y: [null, Math.random() * 1080],
                x: [null, Math.random() * 1920],
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      {/* Header - needs padding for fixed navbar */}
      <div className="pt-16" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'left' }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ display: 'inline-block', marginBottom: '1rem' }}
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Leaf className="w-4 h-4 text-green-300" />
                <span className="text-sm text-white font-medium">Real-time Air Quality Monitoring</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ 
                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                fontWeight: 800,
                color: 'white',
                marginBottom: '1.5rem',
                lineHeight: 1.2
              }}
            >
              Explore Clean Air
              <span className="block mt-2 bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                Quality Data
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                color: 'rgb(236 253 245)',
                marginBottom: '2rem',
                lineHeight: 1.8,
                maxWidth: '36rem'
              }}
            >
              Monitor real-time air quality across your region. Get instant insights on pollutants, 
              health recommendations, and predictive forecasts. Make informed decisions for a 
              healthier tomorrow, powered by NASA satellite data and advanced AI analytics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <button
                onClick={() => router.push("/dashboard")}
                className="group px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Start Exploring
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </button>
              
              <button
                onClick={() => router.push("/map")}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                View Map
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                marginTop: '3rem'
              }}
            >
              <div className="text-left">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-green-200">Monitoring Stations</div>
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-green-200">Real-time Updates</div>
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-white">99%</div>
                <div className="text-sm text-green-200">Accuracy Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Animated Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ position: 'relative' }}
          >
            {/* Animated Earth/Air Quality Visual */}
            <div className="relative w-full h-[500px] flex items-center justify-center">
              
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{
                  position: 'absolute',
                  width: '24rem',
                  height: '24rem',
                  border: '2px solid rgba(134, 239, 172, 0.3)',
                  borderRadius: '50%'
                }}
              />
              
              {/* Middle rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{
                  position: 'absolute',
                  width: '20rem',
                  height: '20rem',
                  border: '2px solid rgba(110, 231, 183, 0.2)',
                  borderRadius: '50%'
                }}
              />

              {/* Center Earth/Globe */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: 'relative',
                  width: '16rem',
                  height: '16rem',
                  background: 'linear-gradient(to bottom right, #4ade80, #10b981)',
                  borderRadius: '50%',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  overflow: 'hidden'
                }}
              >
                {/* Earth texture overlay */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-green-700 rounded-full animate-pulse" />
                </div>
                
                {/* Floating icons around */}
                {[
                  { Icon: Wind, delay: 0, angle: 0 },
                  { Icon: Leaf, delay: 0.5, angle: 90 },
                  { Icon: TrendingDown, delay: 1, angle: 180 },
                  { Icon: Activity, delay: 1.5, angle: 270 },
                ].map(({ Icon, delay, angle }, i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    initial={{
                      x: 0,
                      y: 0,
                    }}
                    animate={{
                      x: Math.cos((angle * Math.PI) / 180) * 150,
                      y: Math.sin((angle * Math.PI) / 180) * 150,
                      rotate: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                      delay: delay,
                    }}
                  >
                    <Icon className="w-6 h-6 text-green-600" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Pulsing glow effect */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  width: '20rem',
                  height: '20rem',
                  backgroundColor: '#4ade80',
                  borderRadius: '50%',
                  filter: 'blur(48px)'
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginTop: '5rem'
          }}
        >
          {[
            {
              icon: <Wind className="w-8 h-8" />,
              title: "Real-time Monitoring",
              desc: "Track air quality levels across multiple locations in real-time"
            },
            {
              icon: <Activity className="w-8 h-8" />,
              title: "Predictive Analytics",
              desc: "AI-powered forecasts for better planning and decision making"
            },
            {
              icon: <Leaf className="w-8 h-8" />,
              title: "Health Insights",
              desc: "Personalized recommendations based on current air quality"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                borderRadius: '1rem',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.15)'
              }}
            >
              <div className="text-green-300 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-green-100">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
    </>
  );
}
