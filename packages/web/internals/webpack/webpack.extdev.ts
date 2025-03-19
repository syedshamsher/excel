import { resolve } from 'path';
import webpackMerge from 'webpack-merge';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { sentryWebpackPlugin } from '@sentry/webpack-plugin';
import { loaderConfig } from './loader-config';
import webpackCommonConfig from './webpack.common';

const monoRepoPackages = [
  'equity-award-grant',
  'equity-award-plan',
  'vesting-template',
  'exercise-period-template',
  'bulk-upload-component',
];
const TerserPlugin = require('terser-webpack-plugin');

const webpackDevConfig: webpack.Configuration = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/',
  },
  module: {
    rules: [...loaderConfig],
  },
  devtool: 'source-map', // Source map generation must be turned on
  plugins: [
    new MiniCssExtractPlugin({ ignoreOrder: true }),
    new webpack.NormalModuleReplacementPlugin(/(.*)\/config\/app-configuration(\.*)/, function (resource: any) {
      resource.request = resource.request.replace(/app-configuration/, 'config-development');
    }),
    sentryWebpackPlugin({
      org: 'app-fintech-pvt-ltd',
      project: 'javascript-react',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
    //new BundleAnalyzerPlugin(), // Uncomment this line to show bundle analysis in web
  ],
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 2,
      }),
    ],
    splitChunks: {
      name: false,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module: any) {
            const splitContext = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
            if (splitContext && splitContext.length > 1) {
              const packageName = splitContext[1];
              //TODO: Check not working as anticipated. Generating random files from name.
              if (packageName && (packageName.indexOf('react') == 0 || packageName.indexOf('redux') == 0)) {
                return 'react-chunk';
              }
              if (packageName && packageName.indexOf('antd') == 0) {
                return 'antd-chunk';
              }
              if (packageName && packageName.indexOf('rc') == 0) {
                return 'rc-chunk';
              }
              if (packageName && packageName.indexOf('@app') == 0) {
                return '@app-chunk';
              }
              
              if (packageName && packageName.indexOf('@app') == 0) {
                // seperating packages as chunk for dynaic loading
                for (const element of monoRepoPackages) {
                  if (module.context.includes(element)) {
                    return `app-${element}-chunk`;
                  }
                }
                return 'app-chunk';
              }
            }
            return 'misc-vendor-chunk';
          },
          chunks: 'all',
        },
      },
    },
  },
};

export default webpackMerge(webpackCommonConfig, webpackDevConfig);
