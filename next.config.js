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
  webpack: (config, { isServer }) => {
    // 忽略 React Native 相关的可选依赖
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': false,
    };
    
    // 忽略 MetaMask SDK 的警告
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
};
