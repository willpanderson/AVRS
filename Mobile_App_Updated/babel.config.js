module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    // ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-react',
  ],
  plugins: ['react-native-reanimated/plugin'],
};
