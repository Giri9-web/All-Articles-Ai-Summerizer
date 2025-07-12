const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for additional file extensions
config.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  'db'
);

// Add support for TypeScript path mapping
config.resolver.alias = {
  '@': './src',
  '@components': './src/components',
  '@screens': './src/screens',
  '@navigation': './src/navigation',
  '@store': './src/store',
  '@services': './src/services',
  '@utils': './src/utils',
  '@types': './src/types',
  '@constants': './src/constants',
  '@assets': './assets',
};

module.exports = config;