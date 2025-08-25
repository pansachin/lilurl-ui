import { Link2, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white shadow-2xl"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div 
          className="flex items-center justify-center space-x-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link2 size={40} className="drop-shadow-lg" />
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Sparkles size={16} className="text-yellow-300" />
            </motion.div>
          </motion.div>
          
          <div>
            <h1 className="text-4xl font-bold tracking-tight flex items-center gap-2">
              LilURL
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Zap size={24} className="text-yellow-300 fill-yellow-300" />
              </motion.div>
            </h1>
            <p className="text-primary-100 text-sm font-medium mt-1">Lightning-fast URL shortening</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center justify-center mt-4 space-x-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center space-x-2 text-primary-100">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">100% Uptime</span>
          </div>
          <div className="text-primary-100 text-sm">•</div>
          <div className="text-primary-100 text-sm">Trusted by 10K+ users</div>
          <div className="text-primary-100 text-sm">•</div>
          <div className="text-primary-100 text-sm">Forever free</div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
