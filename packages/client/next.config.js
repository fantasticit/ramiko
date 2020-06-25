const withPlugins = require('next-compose-plugins');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withAntd = require('./next-antd.config');

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  assetPrefix: isProd ? 'https://blog.wipi.tech/ramiko/' : '/',
  experimental: {
    basePath: isProd ? '/ramiko' : ''
  },
  webpack: config => {
    config.resolve.plugins.push(new TsconfigPathsPlugin());
    return config;
  }
};

module.exports = withPlugins(
  [
    [withCss],
    [
      withSass,
      {
        cssModules: true
        // localIdentName: '[name]__[local]_[hash:base64:5]'
      }
    ],
    [
      withAntd,
      {
        cssModules: true,
        cssLoaderOptions: {
          sourceMap: false,
          importLoaders: 1
        },
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true
          }
          // modifyVars: antdVariables
        }
      }
    ]
  ],
  nextConfig
);
