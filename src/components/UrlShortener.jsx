import { useState, useEffect } from 'react';
import { Link, Loader2, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { urlService } from '../services/api';

const UrlShortener = ({ onUrlCreated }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [urlValid, setUrlValid] = useState(null);

  useEffect(() => {
    if (url) {
      setUrlValid(isValidUrl(url));
    } else {
      setUrlValid(null);
    }
  }, [url]);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    if (!isValidUrl(url)) {
      toast.error('Please enter a valid URL');
      return;
    }

    setLoading(true);
    try {
      const result = await urlService.createShortUrl(url);
      const shortUrl = `http://localhost:3000/${result.short}`;
      
      // Confetti effect
      const confetti = document.createElement('div');
      confetti.innerHTML = '🎉';
      confetti.style.position = 'fixed';
      confetti.style.top = '50%';
      confetti.style.left = '50%';
      confetti.style.fontSize = '3rem';
      confetti.style.transform = 'translate(-50%, -50%)';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.style.transition = 'all 1s ease-out';
        confetti.style.transform = 'translate(-50%, -50%) scale(3) rotate(360deg)';
        confetti.style.opacity = '0';
      }, 100);
      
      setTimeout(() => confetti.remove(), 1100);
      
      toast.success('URL shortened successfully!');
      onUrlCreated({
        ...result,
        shortUrl,
        longUrl: result.long_url,
      });
      setUrl('');
    } catch (error) {
      toast.error(error.message || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Zap, text: 'Lightning fast', color: 'text-yellow-500' },
    { icon: Shield, text: 'Secure & private', color: 'text-green-500' },
    { icon: Globe, text: 'Works globally', color: 'text-blue-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      className="relative"
    >
      {/* Main card */}
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 opacity-10" />
        
        {/* Content */}
        <div className="relative p-8 md:p-10">
          {/* Title section */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
              <Sparkles className="text-primary-600" size={32} />
              Paste your long URL
              <Sparkles className="text-primary-600" size={32} />
            </h2>
            <p className="text-gray-600">Transform your lengthy links into short, memorable ones</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-200 ${
                  inputFocused ? 'text-primary-600' : 'text-gray-400'
                }`}>
                  <Link size={20} />
                </div>
                <input
                  type="text"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder="https://example.com/very/long/url/that/needs/shortening"
                  className={`block w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 bg-gray-50 border-2 rounded-xl transition-all duration-200 ${
                    inputFocused
                      ? 'border-primary-500 bg-white shadow-lg shadow-primary-100'
                      : urlValid === false
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } focus:outline-none`}
                  disabled={loading}
                />
                
                {/* Validation indicator */}
                <AnimatePresence>
                  {url && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center ${
                        urlValid ? 'bg-green-100' : 'bg-red-100'
                      }`}
                    >
                      <span className={`text-sm ${urlValid ? 'text-green-600' : 'text-red-600'}`}>
                        {urlValid ? '✓' : '✗'}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Error message */}
              <AnimatePresence>
                {url && !urlValid && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 text-sm text-red-600"
                  >
                    Please enter a valid URL starting with http:// or https://
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || !urlValid}
              className={`relative w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 overflow-hidden ${
                loading || !urlValid
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg hover:shadow-xl hover:from-primary-700 hover:to-primary-800'
              }`}
            >
              {/* Button background animation */}
              {!loading && urlValid && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    <span>Creating your short URL...</span>
                  </>
                ) : (
                  <>
                    <Zap size={24} />
                    <span>Shorten URL</span>
                  </>
                )}
              </span>
            </motion.button>
          </form>

          {/* Features */}
          <motion.div 
            className="mt-8 flex items-center justify-center gap-6 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 text-gray-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <feature.icon size={16} className={feature.color} />
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default UrlShortener;
