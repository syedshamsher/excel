import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const loaderConfig = [
  {
    test: /\.(ts|tsx|js|jsx|json)$/,
    exclude: [/node_modules(?!(\/|\\)@app)/],
    loader: 'ts-loader',
    options: {
      transpileOnly: true,
      compilerOptions: {
        module: 'es2015',
      },
    },
  },
  {
    test: /\.css$/i,
    use: [MiniCssExtractPlugin.loader, 'css-loader'],
  },
  {
    test: /\.module\.s(a|c)ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[name]__[local]--[hash:base64:5]',
          },
          localsConvention: 'dashesOnly',
          sourceMap: true, //TODO: Modify this on production. Make sourcemap false
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  },
  {
    test: /\.s(a|c)ss$/,
    exclude: /\.module.(s(a|c)ss)$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  },
  {
    test: /\.(png|jp(e*)g|svg|woff(2)?|ttf|jpg|eot|pdf|gif|cur)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },
];
