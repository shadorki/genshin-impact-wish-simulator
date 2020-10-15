const path = require('path');

const srcPath = path.resolve(__dirname, 'src');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  "entry": "./src",
  "output": {
    "path": __dirname + '/dist',
    "filename": "main.js"
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    host: '0.0.0.0',
    port: 3000,
    watchOptions: {
      poll: true
    }
  },
  "module": {
    rules: [
      {
        test: /\.jsx?$/,
        include: srcPath,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.mp4$/,
        use: 'file-loader?name=videos/[name].[ext]',
      }
    ]
  }
};
