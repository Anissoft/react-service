module.exports = {
  resolve: {
    extensions: [
      '.ts', '.tsx', '.js', '.jsx',
    ]
  },
  plugins: [
  ],
  module: {
    rules: [{
      test: /\.stories\.tsx?$/,
      loaders: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: { parser: 'typescript' },
        },
      ],
      enforce: 'pre',
    }, {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('awesome-typescript-loader'),
          options: {
            configFileName: './tsconfig.storybook.json'
          }
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
      include: [/stories/, /src/],
    }, {
      test: /\.(png|woff|woff2|eot)$/,
      use: 'file-loader'
    }, {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'global',
              localIdentName: '[name]__[local]_[hash:base64:4]',
            },
          },
        },
      ],
      include: [/react-ui/, /react-icons/]
    }],
  },
};
