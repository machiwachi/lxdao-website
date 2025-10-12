module.exports = {
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['react-tweet'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};
