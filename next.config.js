/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: false, 
  swcMinify: true, 
  sassOptions: { 
    includePaths: [path.join(__dirname, 'styles')] 
  },
  basePath: '/chatbot/admin'
}

module.exports = nextConfig
