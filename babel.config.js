module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'import-glob',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          '@interfaces': './src/interfaces',
          '@config': './src/config',
          '@screens': './src/screens',
          '@constants': './src/constants',
          '@redux': './src/redux',
          '@hooks': './src/hooks',
        },
      },
    ],
  ],
};
