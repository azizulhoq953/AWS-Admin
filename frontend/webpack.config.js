// module.exports = {
//   devtool: 'source-map', // Enable source maps
//   module: {
//     rules: [
//       {
//         test: /\.scss$/,
//         use: [
//           'style-loader',
//           'css-loader',
//           {
//             loader: 'resolve-url-loader',
//             options: {
//               sourceMap: true, // Ensure source maps are passed to the loader
//             },
//           },
//           'sass-loader',
//         ],
//       },
//     ],
//   },
// };


const path = require('path');

module.exports = {
  devtool: 'source-map', // Enable source maps
  module: {
    rules: [
      {
        test: /\.scss$/, // Handling SCSS files
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true, // Ensure source maps are passed to the loader
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'styles'), // Alias for the styles directory
    },
  },
};
