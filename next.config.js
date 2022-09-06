/** @type {import('next').NextConfig} */
const path = require('path');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // distDir: 'build',
  webpack: (config) => {
    const clientEnv = process.env.CLIENT_ENV || 'production';

    config.resolve.alias = {
      ...config.resolve.alias,
      environment: path.join(__dirname, 'src', 'environments', clientEnv),
    };

    return config;
  },
};

// const mixConfig = withPlugins([...plugins], {...nextConfig});

module.exports = nextConfig
