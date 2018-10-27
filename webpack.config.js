module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/main.ts',
    output: {
      path: `${__dirname}/build`,
      filename: 'main.js'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader'
        }
      ]
    },
    resolve: {
      extensions: [
        '.ts','.js'
      ]
    }
  };
  