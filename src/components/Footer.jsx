import { Heart, Github, Twitter, Mail, Star, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hello@lilurl.com', label: 'Email' },
  ];

  return (
    <footer className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-auto overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          {/* Main footer content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <h3 className="text-2xl font-bold mb-2">LilURL</h3>
              <p className="text-gray-400 mb-4">Making the web shorter, one URL at a time</p>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Star className="text-yellow-400 fill-yellow-400" size={20} />
                <span className="text-sm">Trusted by thousands</span>
              </div>
            </motion.div>
            
            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <h4 className="font-semibold mb-4">Platform Stats</h4>
              <div className="space-y-2 text-gray-400">
                <p>1M+ URLs shortened</p>
                <p>50M+ clicks tracked</p>
                <p>99.9% uptime</p>
              </div>
            </motion.div>
            
            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center md:text-right"
            >
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex items-center justify-center md:justify-end space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.label}
                  >
                    <link.icon size={20} className="group-hover:text-primary-400 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Made with love */}
              <motion.div
                className="flex items-center space-x-2 text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Heart size={16} className="text-red-500 fill-red-500" />
                </motion.div>
                <span>and</span>
                <Coffee size={16} className="text-amber-600" />
                <span>using React & Go</span>
              </motion.div>
              
              {/* Copyright */}
              <motion.div
                className="text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                © {currentYear} LilURL. All rights reserved.
              </motion.div>
              
              {/* Legal links */}
              <motion.div
                className="flex items-center space-x-4 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy
                </a>
                <span className="text-gray-600">•</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms
                </a>
                <span className="text-gray-600">•</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  API
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
