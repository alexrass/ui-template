module.exports = {
  plugins: [
    require('postcss-import')({
      path: [
        'assets/',
        'node_modules/'
      ],
      skipDuplicates: true
    }),
    require('postcss-strip-inline-comments')({}),
    require('postcss-nested')({}),
    require('postcss-extend')({}),
    require('autoprefixer')({}),
    require('postcss-css-variables')({}),
    require('postcss-custom-properties')({}),
    require('postcss-discard-duplicates')({}),
  ],
};
