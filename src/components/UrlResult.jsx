import { useState } from 'react';
import { Copy, Check, ExternalLink, Calendar, Eye, QrCode, Share2, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const UrlResult = ({ urlData, index = 0 }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(urlData.shortUrl);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this short URL',
          text: 'Short URL created with LilURL',
          url: urlData.shortUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          toast.error('Failed to share');
        }
      }
    } else {
      handleCopy();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMins = Math.floor(diffInMs / 60000);
    
    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins} minute${diffInMins > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMins / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getQRCodeUrl = (url) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500" />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                className="p-2 bg-primary-100 rounded-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <ExternalLink size={20} className="text-primary-600" />
              </motion.div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Short URL</p>
                <a
                  href={urlData.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1 group/link"
                >
                  <span>{urlData.shortUrl}</span>
                  <motion.span
                    className="inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    ↗
                  </motion.span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="relative p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors group/copy"
              title="Copy to clipboard"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Check size={18} className="text-green-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Copy size={18} className="text-gray-600 group-hover/copy:text-gray-800" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              title="Share"
            >
              <Share2 size={18} className="text-gray-600" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowQR(!showQR)}
              className={`p-2.5 rounded-lg transition-colors ${
                showQR ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
              title="QR Code"
            >
              <QrCode size={18} />
            </motion.button>
          </div>
        </div>

        {/* Original URL */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Original URL</p>
          <p className="text-sm text-gray-700 break-all line-clamp-2 hover:line-clamp-none transition-all cursor-pointer">
            {urlData.longUrl}
          </p>
        </div>

        {/* QR Code */}
        <AnimatePresence>
          {showQR && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 flex justify-center"
            >
              <img
                src={getQRCodeUrl(urlData.shortUrl)}
                alt="QR Code"
                className="rounded-lg shadow-md"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formatDate(urlData.created_at || new Date().toISOString())}</span>
            </div>
            
            {urlData.views !== undefined && (
              <motion.div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setShowStats(!showStats)}
                whileHover={{ scale: 1.05 }}
              >
                <Eye size={14} />
                <span>{urlData.views || 0} views</span>
              </motion.div>
            )}
          </div>
          
          <motion.button
            className="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium"
            onClick={() => setShowStats(!showStats)}
            whileHover={{ scale: 1.05 }}
          >
            <BarChart3 size={14} />
            <span>Stats</span>
          </motion.button>
        </div>

        {/* Stats panel */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{urlData.views || 0}</p>
                  <p className="text-xs text-blue-600">Total Views</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">98%</p>
                  <p className="text-xs text-green-600">Success Rate</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">5</p>
                  <p className="text-xs text-purple-600">Countries</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default UrlResult;
