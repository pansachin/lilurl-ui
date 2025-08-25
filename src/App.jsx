import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { TrendingUp, Users, Globe, Zap } from 'lucide-react';
import Header from './components/Header';
import UrlShortener from './components/UrlShortener';
import UrlResult from './components/UrlResult';
import Footer from './components/Footer';

function App() {
  const [recentUrls, setRecentUrls] = useState([]);
  const [stats, setStats] = useState({
    totalUrls: 1234,
    totalClicks: 45678,
    activeUsers: 890,
    countries: 42
  });

  useEffect(() => {
    // Animate stats on mount
    const interval = setInterval(() => {
      setStats(prev => ({
        totalUrls: prev.totalUrls + Math.floor(Math.random() * 3),
        totalClicks: prev.totalClicks + Math.floor(Math.random() * 10),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 2),
        countries: prev.countries
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleUrlCreated = (urlData) => {
    setRecentUrls([urlData, ...recentUrls.slice(0, 4)]);
  };

  const statCards = [
    { icon: TrendingUp, label: 'URLs Created', value: stats.totalUrls.toLocaleString(), color: 'from-blue-500 to-blue-600' },
    { icon: Users, label: 'Active Users', value: stats.activeUsers.toLocaleString(), color: 'from-green-500 to-green-600' },
    { icon: Zap, label: 'Total Clicks', value: stats.totalClicks.toLocaleString(), color: 'from-purple-500 to-purple-600' },
    { icon: Globe, label: 'Countries', value: stats.countries, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'white',
            color: '#363636',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
            style: {
              border: '1px solid #10b981',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
            style: {
              border: '1px solid #ef4444',
            },
          },
        }}
      />
      
      <Header />
      
      <main className="flex-grow">
        {/* Hero section with stats */}
        <section className="relative py-12 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-200 rounded-full filter blur-3xl opacity-20 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse" />
          </div>
          
          <div className="container mx-auto px-4">
            {/* Stats Grid */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {statCards.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl -z-10"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})`
                    }}
                  />
                  <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.color} mb-2`}>
                      <stat.icon size={20} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* URL Shortener */}
            <div className="max-w-3xl mx-auto">
              <UrlShortener onUrlCreated={handleUrlCreated} />
            </div>
          </div>
        </section>
        
        {/* Recent URLs section */}
        <AnimatePresence>
          {recentUrls.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 bg-gray-50"
            >
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Recent URLs</h2>
                  <p className="text-gray-600">Your latest shortened links</p>
                </motion.div>
                
                <div className="max-w-4xl mx-auto space-y-4">
                  <AnimatePresence mode="popLayout">
                    {recentUrls.map((url, index) => (
                      <UrlResult 
                        key={url.id || url.short || index} 
                        urlData={url} 
                        index={index}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}

export default App
