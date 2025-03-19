/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import glob from 'glob';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { resolve } from 'path';
import v8 from 'v8';
import webpack from 'webpack';

console.log(v8.getHeapStatistics());

const webpackCommonConfig: webpack.Configuration = {
  output: {
    clean: true,
  },
  entry: [...glob.sync(resolve(__dirname, '../../src/**/*reg.tsx')), resolve(__dirname, '../../src/index.tsx')],
  plugins: [
    new HtmlWebpackPlugin({
      title: 'app-product',
      template: './src/index.html',
      // favicon: './src/favicon.ico',
    }),
    new webpack.DefinePlugin({
      process: {
        env: {
          COMMIT_ID: JSON.stringify(process.env.COMMIT_ID),
          TIME_STAMP: JSON.stringify(process.env.TIME_STAMP),
        },
      },
    }),
    new MiniCssExtractPlugin({ ignoreOrder: true }),
  ],
  optimization: {
    splitChunks: {
      maxInitialRequests: 6,
    },
  },
  resolve: {
    alias: {
      // absolute paths for import
      src: resolve(__dirname, '../../src'),
      resources: resolve(__dirname, '../../src/resources'),
      types: resolve(__dirname, '../../src/types'),
      utils: resolve(__dirname, '../../src/utils'),
      client: resolve(__dirname, '../../src/client'),
      modules: resolve(__dirname, '../../src/modules'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.sass', '.json'],
    symlinks: true,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};

export default webpackCommonConfig;
