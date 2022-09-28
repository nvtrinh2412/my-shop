// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@constants': path.resolve(__dirname, 'src/constants'),
    },
  },
};
