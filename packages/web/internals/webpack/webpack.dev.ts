/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { resolve } from 'path';
import webpack from 'webpack';
import { WebpackConfiguration } from 'webpack-dev-server';
import webpackMerge from 'webpack-merge';
import { loaderConfig } from './loader-config';
import webpackCommonConfig from './webpack.common';
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackConfiguration;
}

const webpackDevConfig: Configuration = {
  mode: 'development',
  output: {
    publicPath: '/',
    path: resolve(__dirname, '../../dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [...loaderConfig],
  },
  //TODO: Added for nginx config changes need to check it causing build time
  devtool: 'source-map',
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/(.*)\/config\/app-configuration(\.*)/, function (resource: any) {
      resource.request = resource.request.replace(/app-configuration/, 'config-development');
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new ForkTsCheckerWebpackPlugin(),
    //new BundleAnalyzerPlugin(), // Uncomment this line to show bundle analysis in web
  ],
  cache: {
    type: 'filesystem',
    maxAge: 604800000,
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3002,
    compress: true,
    host: '127.0.0.1',
    allowedHosts: ['app.appcorp.local'],
    client: {
      overlay: false,
    },
  },
  watchOptions: { ignored: /node_modules/ },
};

const commonDevMerge = webpackMerge(webpackCommonConfig, webpackDevConfig);
export default commonDevMerge;
